import { Injectable } from "@angular/core"
import { Actions, act, createEffect, ofType } from "@ngrx/effects"
import { LOAD_RECORD, addrecord, addrecordsuccess, deleterecord, deleterecordsuccess, loadrecordfail, loadrecordsuccess, updaterecord, updaterecordsuccess, saverecord, actionFailed, loadrecord } from "../store/record-list.action"
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, switchMap , withLatestFrom, tap} from "rxjs"
import { Record, Records } from "../record-model"
import { DataStorageService } from "src/app/shared/data-storage.service"
import {Store} from '@ngrx/store'
import { getRecords } from "./record-list.selector"
import { LogError } from "src/app/shared/store/app/app.actions"
@Injectable()
export class RecordListEffects {
    constructor(private action$: Actions, private store: Store, private service: DataStorageService) {

    }
    _loadrecord = createEffect(() =>
        this.action$
            .pipe(
                ofType(LOAD_RECORD),
                exhaustMap((action) => {
                    return this.service.fetchRecords().pipe(
                        map((data) => {
                           localStorage.setItem('recordList', JSON.stringify({'recordList': data}));
                            return loadrecordsuccess({ recordList : data });

                        }),
                        catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
                    )
                })
            )
    );

    _addrecord = createEffect(() =>
        this.action$.pipe(
            ofType(addrecord),
            switchMap(action =>
                this.service.addRecord(action.recordInput).pipe(
                    switchMap(record => of(
                      // unlike update, need reload completely because the id need to be delivered for coming update
                       loadrecord()
                    )),
                )
            )
        )
    );

    _updaterecord = createEffect(() =>
        this.action$.pipe(
            ofType(updaterecord),
            switchMap(action =>
                this.service.updateRecord(action.recordInput).pipe(
                    switchMap(resp => of(
                        updaterecordsuccess({recordInput:action.recordInput}),
                    )),
                    catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
                   )
            )
        )
    );

    _deleterecord = createEffect(() =>
    this.action$.pipe(
        ofType(deleterecord),
        switchMap(action =>
            this.service.deleteRecord(action.recordInput).pipe(
                switchMap(resp => of(
                  loadrecord()
                )),
                catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
               )
            )
    )
);

   /*  saveCount = createEffect(
      () =>
        this.action$.pipe(
          ofType(loadrecordsuccess),
          withLatestFrom(this.store.select(getrecordinfo)),
          tap(([action, counter]) => {
            console.log(action);
            const recordList = JSON.stringify(action);
            localStorage.setItem('recordList', recordList);
          })
        ),
      { dispatch: false }
    ); */
}
