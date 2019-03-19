import { Action } from '@ngrx/store';
import { Toolbar } from '../index';

export enum WorkspaceActionTypes {
    ChangeToolbar = '[Workspace] Change Toolbar'
}

// Action Creators
export class ChangeToolbar implements Action {
    readonly type = WorkspaceActionTypes.ChangeToolbar;

    constructor(public payload: Toolbar) { }
}


// Union the valid types
export type WorkspaceActions = ChangeToolbar
