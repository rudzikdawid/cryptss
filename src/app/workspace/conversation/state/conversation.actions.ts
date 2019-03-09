import { Action } from '@ngrx/store';
import { Conversation } from "../index";

export enum ConversationActionTypes {
    SetCurrentConversation = '[Conversation] Set Current Conversation',
    ClearCurrentConversation = '[Conversation] Clear Current Conversation',
    InitializeCurrentConversation = '[Conversation] Initialize Current Conversation',
    Load = '[Conversation] Load',
    LoadSuccess = '[Conversation] Load Success',
    LoadFail = '[Conversation] Load Fail',
    AddConversation = '[Conversation] Add Conversation',
    AddConversationSuccess = '[Conversation] Add Conversation Success',
    AddConversationFail = '[Conversation] Add Conversation Fail',
    UpdateConversation = '[Conversation] Update Conversation',
    UpdateConversationSuccess = '[Conversation] Update Conversation Success',
    UpdateConversationFail = '[Conversation] Update Conversation Fail',
    DeleteConversation = '[Conversation] Delete Conversation',
    DeleteConversationSuccess = '[Conversation] Delete Conversation Success',
    DeleteConversationFail = '[Conversation] Delete Conversation Fail'
}

// Action Creators


export class SetCurrentConversation implements Action {
    readonly type = ConversationActionTypes.SetCurrentConversation;

    constructor(public payload: Conversation) { }
}

export class ClearCurrentConversation implements Action {
    readonly type = ConversationActionTypes.ClearCurrentConversation;
}

export class InitializeCurrentConversation implements Action {
    readonly type = ConversationActionTypes.InitializeCurrentConversation;
}

export class Load implements Action {
    readonly type = ConversationActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ConversationActionTypes.LoadSuccess;

    constructor(public payload: Conversation[]) { }
}

export class LoadFail implements Action {
    readonly type = ConversationActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export class AddConversation implements Action {
    readonly type = ConversationActionTypes.AddConversation;

    constructor(public payload: Conversation) { }
}

export class AddConversationSuccess implements Action {
    readonly type = ConversationActionTypes.AddConversationSuccess;

    constructor(public payload: Conversation) { }
}

export class AddConversationFail implements Action {
    readonly type = ConversationActionTypes.AddConversationFail;

    constructor(public payload: string) { }
}

export class UpdateConversation implements Action {
    readonly type = ConversationActionTypes.UpdateConversation;

    constructor(public payload: Conversation) { }
}

export class UpdateConversationSuccess implements Action {
    readonly type = ConversationActionTypes.UpdateConversationSuccess;

    constructor(public payload: Conversation) { }
}

export class UpdateConversationFail implements Action {
    readonly type = ConversationActionTypes.UpdateConversationFail;

    constructor(public payload: string) { }
}

export class DeleteConversation implements Action {
    readonly type = ConversationActionTypes.DeleteConversation;

    constructor(public payload: number) { }
}

export class DeleteConversationSuccess implements Action {
    readonly type = ConversationActionTypes.DeleteConversationSuccess;

    constructor(public payload: number) { }
}

export class DeleteConversationFail implements Action {
    readonly type = ConversationActionTypes.DeleteConversationFail;

    constructor(public payload: string) { }
}

// Union the valid types
export type ConversationActions = SetCurrentConversation
    | ClearCurrentConversation
    | InitializeCurrentConversation
    | Load
    | LoadSuccess
    | LoadFail
    | AddConversation
    | AddConversationSuccess
    | AddConversationFail
    | UpdateConversation
    | UpdateConversationSuccess
    | UpdateConversationFail
    | DeleteConversation
    | DeleteConversationSuccess
    | DeleteConversationFail;
