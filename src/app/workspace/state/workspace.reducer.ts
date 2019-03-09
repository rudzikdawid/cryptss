import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceActions, WorkspaceActionTypes} from './workspace.actions';
import * as fromRoot from '../../app.state';

export interface State extends fromRoot.State {
    workspace: WorkspaceState;
}

export interface WorkspaceState {
    toolbarTitle: string,
    routeButton: object | null
}

export const initialState: WorkspaceState = {
    toolbarTitle: 'Cryptss',
    routeButton: null
};

export const getWorkspaceFeatureState = createFeatureSelector<WorkspaceState>('workspace');

export const toolbarTitleWorkspaces = createSelector(
    getWorkspaceFeatureState,
    state => state.toolbarTitle
);

export const routeButtonWorkspaces = createSelector(
    getWorkspaceFeatureState,
    state => state.routeButton
);

export function workspaceReducer(state = initialState, action: WorkspaceActions): WorkspaceState {
    switch(action.type) {
        case WorkspaceActionTypes.ChangeToolbarTitle:
            return {
                ...state,
                toolbarTitle: action.payload,
            };

        case WorkspaceActionTypes.ChangeRouteButton:
            return {
                ...state,
                routeButton: action.payload,
            };

        default:
            return state;
    }
}