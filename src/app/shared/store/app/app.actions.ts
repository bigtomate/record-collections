import { createAction, props } from "@ngrx/store"

export const LOG_ERROR ='[app action event] error logging';

export const LogError = createAction(LOG_ERROR,props<{message:string, action:string}>());
