import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { pipe, exhaustMap, map } from "rxjs"

@Injectable()
export class AppEffects {

    constructor(private action$: Actions) {
    }
}
