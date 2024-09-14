import { Injectable } from "@angular/core"
import { Actions, act, createEffect, ofType } from "@ngrx/effects"
import { LOAD_RECORD, addrecord, addrecordsuccess, deleterecord, deleterecordsuccess, loadrecordfail, loadrecordsuccess, updaterecord, updaterecordsuccess, saverecord, actionFailed, loadrecord } from "../store/record-list.action"
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, switchMap , withLatestFrom, tap} from "rxjs"
import { Record, Records } from "../record-model"
import { DataStorageService } from "src/app/shared/data-storage.service"
import {Store} from '@ngrx/store'
import { LogError } from "src/app/shared/store/app/app.actions"
import { DataStorageFireStoreService } from "src/app/shared/data-storage.firestore.service"
import { environment } from "src/environments/environment"
@Injectable()
export class RecordListEffects {
    constructor(private action$: Actions, private store: Store, private service: DataStorageService, private fireStoreService: DataStorageFireStoreService) {

    }
    _loadrecord = createEffect(() =>
        this.action$
            .pipe(
                ofType(LOAD_RECORD),
                exhaustMap(action => {
                  if (environment.firebase) {
                    return this.fireStoreService.fetchRecords().then(resp => {
                      const recordList = resp.docs.map((doc: { data: () => any; id: any }) => (
                         { ...doc.data(), id: doc.id}
                        ));
                      localStorage.setItem('recordList', JSON.stringify({'recordList': recordList}));
                      return loadrecordsuccess({ recordList : recordList });
                    });
                  }
                  // the fast api return obserable instead fireStore is the promise with type document
                return this.service.fetchRecords().pipe(
                        map((recordList) => {
                           localStorage.setItem('recordList', JSON.stringify({'recordList': recordList}));
                            return loadrecordsuccess({ recordList : recordList });
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
                this.fireStoreService.addRecord(action.recordInput).pipe(
                  switchMap(() =>
                    of(
                      // unlike update, need reload completely because the id is need to be delivered for coming update
                       loadrecord()
                    )
                  ))

         // if not use the firebase
         /*  this.service.addRecord(action.recordInput).pipe(
                  switchMap(record => of(
                    // unlike update, need reload completely because the id is need to be delivered for coming update
                     loadrecord()
                  )),
              ) */
            )
        )
    );

    _updaterecord = createEffect(() =>
        this.action$.pipe(
            ofType(updaterecord),
            switchMap(action =>
              this.fireStoreService.updateRecord(action.recordInput).pipe(
                switchMap(resp => of(
                    updaterecordsuccess({recordInput:action.recordInput}),
                )),
                catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
               )

             // if not use the firebase
             /*    this.service.updateRecord(action.recordInput).pipe(
                    switchMap(resp => of(
                        updaterecordsuccess({recordInput:action.recordInput}),
                    )),
                    catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
                   ) */
            )
        )
    );

    _deleterecord = createEffect(() =>
    this.action$.pipe(
        ofType(deleterecord),
        switchMap(action =>
          this.fireStoreService.deleteRecord(action.recordInput).pipe(
            switchMap(resp => of(
              loadrecord()
            )),
            catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
           )
        )
       /*      this.service.deleteRecord(action.recordInput).pipe(
                switchMap(resp => of(
                  loadrecord()
                )),
                catchError((_error) => of(loadrecordfail({ errorDetail: _error })))
               )
            ) */
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
