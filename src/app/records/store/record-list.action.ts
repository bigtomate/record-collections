import { createAction, props } from "@ngrx/store";
import { RecordEditComponent } from "../record-list/record-edit/record-edit.component";
import { Record } from "../record-model";

export const LOAD_RECORD ='[record collections] load record';
export const LOAD_RECORD_SUC ='[record collections] load record success';
export const START_EDIT ='[record collections] start edit record';
export const STOP_EDIT ='[record collections] stop edit record on clean';
export const SAVE_RECORD ='[record collections] save blo';
export const LOAD_RECORD_FAIL ='[record collections] load record fail';
export const ADD_RECORD_SUC ='[record collections] add record success';
export const ADD_RECORD ='[record collections] add record';
export const UPDATE_RECORD ='[record collections] update record';
export const UPDATE_RECORD_SUC ='[record collections] update record success';
export const DELETE_RECORD ='[record collections] delete record';
export const DELETE_RECORD_SUC ='[record collections] delete record success';
export const ACTION_FAILED ='[record collections] action on collections failed';

export const loadrecord=createAction(LOAD_RECORD);

export const loadrecordsuccess=createAction(LOAD_RECORD_SUC,props<{recordList:Record[]}>())

export const startEdit=createAction(START_EDIT,props<{index: number, id: number}>());

export const saverecord=createAction(SAVE_RECORD,props<{recordList:Record[]}>())

export const loadrecordfail=createAction(LOAD_RECORD_FAIL,props<{errorDetail: any}>())

export const addrecord=createAction(ADD_RECORD,props<{recordInput:Record}>());

export const addrecordsuccess=createAction(ADD_RECORD_SUC,props<{recordInput:Record}>());

export const updaterecord=createAction(UPDATE_RECORD,props<{recordInput:Record}>());

export const updaterecordsuccess=createAction(UPDATE_RECORD_SUC,props<{recordInput:Record}>());

export const deleterecord=createAction(DELETE_RECORD,props<{recordInput:Record}>());

export const deleterecordsuccess=createAction(DELETE_RECORD_SUC,props<{recordInput:Record}>());

export const actionFailed =createAction(ACTION_FAILED ,props<{errorDetail: any}>())

export const stopEdit =createAction(STOP_EDIT, props<{index: number}>())
