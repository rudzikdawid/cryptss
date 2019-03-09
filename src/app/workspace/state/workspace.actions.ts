import { Action } from '@ngrx/store';

export enum WorkspaceActionTypes {
    ChangeToolbarTitle = '[Workspace] Change Toolbar Title',
    ChangeRouteButton = '[Workspace] Change Route Button',
}

// Action Creators

export class ChangeToolbarTitle implements Action {
    readonly type = WorkspaceActionTypes.ChangeToolbarTitle;

    constructor(public payload) { }
}


export class ChangeRouteButton implements Action {
    readonly type = WorkspaceActionTypes.ChangeRouteButton;

    constructor(public payload) { }
}


// Union the valid types
export type WorkspaceActions = ChangeToolbarTitle
    | ChangeRouteButton;
