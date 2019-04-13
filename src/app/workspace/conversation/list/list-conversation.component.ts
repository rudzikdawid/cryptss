import { Component, OnInit, OnDestroy } from '@angular/core';
import {select, Store} from '@ngrx/store';

import { ConversationService } from '../conversation.service';
import * as fromConversation from '../state/conversation.reducer';
import * as conversationActions from '../state/conversation.actions';

@Component({
  selector: 'app-list-conversation',
  templateUrl: './list-conversation.component.html',
  styleUrls: ['./list-conversation.component.scss']
})
export class ListConversationComponent implements OnInit, OnDestroy {
  list$;

  constructor(
    private conversationService: ConversationService,
    private conversationStore: Store<fromConversation.ConversationState>,
  ) {}


  ngOnInit() {
    this.list$ = this.conversationStore.pipe(select(fromConversation.listConversations));
    this.conversationStore.dispatch(new conversationActions.Load());
  }

  ngOnDestroy() {
    this.conversationService.clearListener('list_conversation');
  }

  open(event) {
    console.warn(event.x, event.y);
  }

}
