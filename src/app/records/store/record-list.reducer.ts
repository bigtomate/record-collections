import { state } from '@angular/animations';
import { createReducer,on, Action } from '@ngrx/store';
import { Record } from '../../records/record-model';
import { DataStorageService } from '../../shared/data-storage.service';
import * as RecordListActions from './record-list.action';

export interface State {
  records: Record [];
  editedRecord: Record;
  editedRecordAction: RecordListActions.RecordListActions | any;
}

 const initialState: State = {
  records: [],
  editedRecord : new Record(1,'test','ddd','dddd',1999,'great artist','','','',''),
  editedRecordAction: null
};
 //export const recordListReducer1 =  createReducer(initialState);

export function recordListReducer1(
  state = initialState, action: any
) {

    const localStoreRecordList = localStorage.getItem('recordList');
    if (localStoreRecordList) {
     const storeState = JSON.parse(localStoreRecordList);
     state = storeState;
    }

  switch (action.type) {
    case RecordListActions.START_EDIT:
      return {
        ...state,
        editedRecordAction: action,
        editedRecord: { ...state.records[action.payload]}
      };
    case RecordListActions.UPDATE_RECORD:
     const updatedRecord = action.recordToUpdate;
     state.records[action.payload] = updatedRecord;
     localStorage.setItem('recordList', JSON.stringify(state));
       return {
       ...state,
       records: state.records,
       editedRecordAction: action,
       editedRecord: { ...state.records[action.payload]}
     };
     case RecordListActions.ADD_RECORD:
      const addedRecord = action.recordToAdd;
      state.records.push(addedRecord);
      localStorage.setItem('recordList', JSON.stringify(state));
        return {
        ...state,
        records: state.records,
        editedRecordAction: action,
        editedRecord: { ...state.records[action.payload]}};
     /*
   case RecordListActions.DELETE_RECORD:
     return {
       ...state,
       records: state.records.filter((r, rIndex) => {
         return rIndex !== action.payload;
       }),
       editedRecordAction: -1,
       editedRecord: null
     };
     */
  /*  case RecordListActions.STOP_EDIT:
     return {
       ...state,
       editedRecord: null,
       editedRecordIndex: -1
     }; */
   default:
     return state;

}
}
