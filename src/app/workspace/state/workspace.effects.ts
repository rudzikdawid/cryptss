import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as workspaceActions from './workspace.actions';
import { WorkspaceService } from '../workspace.service';


@Injectable()
export class WorkspaceEffects {

    constructor(private workspaceService: WorkspaceService,
                private actions$: Actions) { }

    @Effect()
    loadUser$: Observable<Action> = this.actions$.pipe(
        ofType(workspaceActions.WorkspaceActionTypes.Load),
        mergeMap(action =>
            this.workspaceService.getUser().pipe(
                map(response => (new workspaceActions.LoadSuccess(response))),
                catchError(err => of(new workspaceActions.LoadFail(err)))
            )
        )
    );
}
