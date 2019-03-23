import { Action } from '@ngrx/store';
import { User } from '../index';

export enum WorkspaceActionTypes {
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


// Union the valid types
export type WorkspaceActions = Load
    | LoadSuccess
    | LoadFail;
