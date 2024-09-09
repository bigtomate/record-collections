import { Injectable } from "@angular/core";
import { Actions, createEffect , ofType} from "@ngrx/effects";
import { tap } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";
import * as RecordListActions from '../store/record-list.action'



export class RecordListEffects {
  saveRecordList = createEffect(() => this.actions$.pipe(
    ofType(RecordListActions.LoadRecord),
    tap((action) => {
console.log(action);
this.dataStorageService.fetchRecords().subscribe(records => {
  localStorage.setItem('recordList', JSON.stringify({records: records, editedRecord: null,
    editedRecordAction: -1}));
  } );
    })
  ),{dispatch:false});

  constructor (private actions$: Actions, private dataStorageService: DataStorageService) {

  }
}
