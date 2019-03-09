import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationActions, ConversationActionTypes } from './conversation.actions';
import { Conversation } from "../index";
import * as fromRoot from '../../../app.state';

export interface State extends fromRoot.State {
    conversation: ConversationState;
}

export interface ConversationState {
    list: Conversation[]
}

export const initialState: ConversationState = {
    list: []
};

export const getConversationFeatureState = createFeatureSelector<ConversationState>('conversation');

export const listConversations = createSelector(
    getConversationFeatureState,
    state => state.list
);

export function conversationReducer(state = initialState, action: ConversationActions): ConversationState {
    switch(action.type) {
        case ConversationActionTypes.LoadSuccess:
            return {
                ...state,
                list: action.payload,
            };

        case ConversationActionTypes.LoadFail:
            return {
                ...state,
                list: [],
            };

        case ConversationActionTypes.AddConversationSuccess:
            return {
                ...state,
                list: [...state.list, action.payload]
            };

        case ConversationActionTypes.AddConversationFail:
            return state;

        default:
            return state;
    }
}