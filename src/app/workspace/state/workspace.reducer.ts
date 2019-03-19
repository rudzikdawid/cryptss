import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceActions, WorkspaceActionTypes} from './workspace.actions';
import * as fromRoot from '../../app.state';
import { Toolbar } from '../index';

export interface State extends fromRoot.State {
    workspace: WorkspaceState;
}

export interface WorkspaceState {
    toolbar: Toolbar;
}

export const initialState: WorkspaceState = {
    toolbar: {
        title: 'Cryptss',
        button: null
    }
};

export const getWorkspaceFeatureState = createFeatureSelector<WorkspaceState>('workspace');

export const toolbarWorkspaces = createSelector(
    getWorkspaceFeatureState,
    state => state.toolbar
);

export function workspaceReducer(state = initialState, action: WorkspaceActions): WorkspaceState {
    switch(action.type) {
        case WorkspaceActionTypes.ChangeToolbar:
            return {
                ...state,
                toolbar: action.payload
            };

        default:
            return state;
    }
}
