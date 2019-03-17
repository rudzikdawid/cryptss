import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Conversation } from "../index";
import * as conversationActions from './conversation.actions';
import { ConversationService } from '../conversation.service';


@Injectable()
export class ConversationEffects {

    constructor(private conversationService: ConversationService,
                private actions$: Actions) { }

    @Effect()
    loadConversations$: Observable<Action> = this.actions$.pipe(
        ofType(conversationActions.ConversationActionTypes.Load),
        mergeMap(action =>
            this.conversationService.listConversation().pipe(
                map(response => (new conversationActions.LoadSuccess(response))),
                catchError(err => of(new conversationActions.LoadFail(err)))
            )
        )
    );

    @Effect()
    addConversation$: Observable<Action> = this.actions$.pipe(
        ofType(conversationActions.ConversationActionTypes.AddConversation),
        map((action: conversationActions.AddConversation) => action.payload),
        mergeMap((conversation: Conversation) =>
            this.conversationService.addConversation(conversation).pipe(
                map((response) => (new conversationActions.AddConversationSuccess(response))),
                catchError(err => of(new conversationActions.AddConversationFail(err)))
            )
        )
    );

    /*@Effect()
    updateConversation$: Observable<Action> = this.actions$.pipe(
        ofType(conversationActions.ConversationActionTypes.UpdateConversation),
        map((action: conversationActions.UpdateConversation) => action.payload),
        mergeMap((product: Conversation) =>
            this.conversationService.updateConversation(product).pipe(
                map(updatedConversation => (new conversationActions.UpdateConversationSuccess(updatedConversation))),
                catchError(err => of(new conversationActions.UpdateConversationFail(err)))
            )
        )
    );

    @Effect()
    deleteConversation$: Observable<Action> = this.actions$.pipe(
        ofType(conversationActions.ConversationActionTypes.DeleteConversation),
        map((action: conversationActions.DeleteConversation) => action.payload),
        mergeMap((productId: number) =>
            this.conversationService.deleteConversation(productId).pipe(
                map(() => (new conversationActions.DeleteConversationSuccess(productId))),
                catchError(err => of(new conversationActions.DeleteConversationFail(err)))
            )
        )
    );*/
}
