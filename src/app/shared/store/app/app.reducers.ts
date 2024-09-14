import { createReducer, on } from "@ngrx/store";
import { AppState } from "../app/App.state";

const _AppReducer = createReducer(AppState,

)

export function AppReducer(state: any, action: any) {
    return _AppReducer(state, action);

}
