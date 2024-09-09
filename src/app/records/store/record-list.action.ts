import { Action, createAction, props } from '@ngrx/store';

import { Record } from '../record-model';

export const ADD_RECORD = '[Record List] Add new Record';
export const UPDATE_RECORD = '[Record List] Update Record';
export const DELETE_RECORD = '[Record List] Delete Record';
export const START_EDIT = '[Record List] Start Edit';
export const STOP_EDIT = '[Record List] Stop Edit';
export const LOAD_RECORD = '[Record List] Load the records';

export class AddRecord implements Action {
  readonly type = ADD_RECORD;
  private recordToAdd!: Record;
  constructor(public payload: number, public record: Record) {
     this.recordToAdd = record;
  }
}

export class UpdateRecord implements Action {
  readonly type = UPDATE_RECORD;
  private recordToUpdate!: Record;
  constructor(public payload: number, public record: Record) {
     this.recordToUpdate = record;
  }
}

export class DeleteRecord implements Action {
  readonly type = DELETE_RECORD;
  constructor(public payload: number) {
  }
}

export class StartEdit implements Action {
  type = START_EDIT;
  constructor(public payload: number) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export const LoadRecord = createAction(
  '[Load store] inital',
  props<{value: number}>()
);

export const decrement = createAction(
  '[Counter] Decrement',
  props<{value: number}>()
);

export type RecordListActions =
  | AddRecord
  | UpdateRecord
  | DeleteRecord
  | StartEdit
  | StopEdit

