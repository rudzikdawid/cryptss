import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceActions, WorkspaceActionTypes} from './workspace.actions';
import * as fromRoot from '../../app.state';
import { User } from '../index';

export interface State extends fromRoot.State {
    workspace: WorkspaceState;
}

export interface WorkspaceState {
    user: User;
}

export const initialState: WorkspaceState = {
    user: {
        display_name: null,
        email: null
    }
};

export const getWorkspaceFeatureState = createFeatureSelector<WorkspaceState>('workspace');

export const userWorkspace = createSelector(
    getWorkspaceFeatureState,
    state => state.user
);

export function workspaceReducer(state = initialState, action: WorkspaceActions): WorkspaceState {
    switch(action.type) {
        case WorkspaceActionTypes.LoadSuccess:
            return {
                ...state,
                user: action.payload,
            };

        case WorkspaceActionTypes.LoadFail:
            return {
                ...state,
            };

        default:
            return state;
    }
}
