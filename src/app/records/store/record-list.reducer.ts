import { createReducer,on } from "@ngrx/store";

import { addrecord, addrecordsuccess, deleterecord, loadrecord, loadrecordfail, loadrecordsuccess, saverecord, startEdit, updaterecord, updaterecordsuccess } from "../store/record-list.action";
import { Record, Records } from "../record-model";

export const RecordState: Records = {
  recordList: [],
  errorMessage: '',
  editItemIndex: -1,
  editItemId: 0
}

 const _RecordReducer = createReducer(RecordState,
    on(loadrecord, (state) => {
        return {
            ...state
        };
    }),
    on(loadrecordsuccess,(state, action)=>{
        return {
          ...state,
          recordList:[... action.recordList],
          errorMessage:''
       }
    }),
    on(loadrecordfail,(state,action)=>{
        console.log(action.errorDetail)
        return{
            ...state,
            recordList:[],
            errorMessage:action.errorDetail
        }
    }),
    on(startEdit, (state, action) => {
      return {
          ...state,
          editItemIndex: action.index,
          editItemId: action.id
      };
   }),
    // on(addrecord,(state,action)=>{
    //     const _record={...action.recordinput};
    //     _record.id=state.recordList.length+1;
    //     return{
    //         ...state,
    //         recordList:[...state.recordList,_record]
    //     }
    // }),
    on(addrecordsuccess,(state,action)=>{
        const _record={...action.recordInput};
        return{
            ...state,
            recordList:[...state.recordList,_record]
        }
    }),
    on(updaterecordsuccess,(state, action)=>{
        const _record={...action.recordInput};
        const updatedrecord=state.recordList.map(record=>{
          return _record.id === record.id? _record : record;
        });
        return{
            ...state,
            recordList: updatedrecord
        }
    }),
/*      on(deleterecord,(state, action)=>{
        const updatedrecord = state.recordList.filter((data: Record)=>{
           return data.id ! == action.recordInput?.id
        });
        return{
            ...state,
            recordList: updatedrecord,
            editItemId: action.recordInput?.id
        }
    }) */
)

export function recordReducer(state: any, action: any) {
    return _RecordReducer(state, action);
}

