import { Action } from '@ngrx/store';
import { Toolbar, User } from '../index';

export enum WorkspaceActionTypes {
    ChangeToolbar = '[Workspace] Change Toolbar',
    Load = '[Workspace] Load',
    LoadSuccess = '[Workspace] Load Success',
    LoadFail = '[Workspace] Load Fail'
}

// Action Creators
export class Load implements Action {
    readonly type = WorkspaceActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = WorkspaceActionTypes.LoadSuccess;

    constructor(public payload: User) { }
}

export class LoadFail implements Action {
    readonly type = WorkspaceActionTypes.LoadFail;

    constructor(public payload: any) { }
}

export class ChangeToolbar implements Action {
    readonly type = WorkspaceActionTypes.ChangeToolbar;

    constructor(public payload: Toolbar) { }
}


// Union the valid types
export type WorkspaceActions = ChangeToolbar
    | Load
    | LoadSuccess
    | LoadFail;
