import { Component, OnInit, OnDestroy } from '@angular/core';
import {select, Store} from "@ngrx/store";

import { ConversationService } from '../conversation.service';
import * as fromConversation from '../state/conversation.reducer';
import * as fromWorkspace from '../../state/workspace.reducer';
import * as conversationActions from '../state/conversation.actions';
import * as workspaceActions from "../../state/workspace.actions";

@Component({
  selector: 'app-list-conversation',
  templateUrl: './list-conversation.component.html',
  styleUrls: ['./list-conversation.component.scss']
})
export class ListConversationComponent implements OnInit, OnDestroy {
  list$;

  constructor(
    private conversationService: ConversationService,
    private workspaceStore: Store<fromWorkspace.WorkspaceState>,
    private conversationStore: Store<fromConversation.ConversationState>,
  ) {}


  ngOnInit() {
    this.list$ = this.conversationStore.pipe(select(fromConversation.listConversations));
    this.conversationStore.dispatch(new conversationActions.Load());

    setTimeout(() => {
      this.workspaceStore.dispatch(new workspaceActions.ChangeToolbarTitle('Cryptss'));
      this.workspaceStore.dispatch(new workspaceActions.ChangeRouteButton(null));
    });
  }

  ngOnDestroy() {
    this.conversationService.clearListener('list_conversation');
  }

}
