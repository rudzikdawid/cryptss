import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromConversation from '../../state/conversation.reducer';

@Component({
  selector: 'app-toolbar-detail-conversation',
  templateUrl: './toolbar-detail-conversation.component.html',
  styleUrls: ['./toolbar-detail-conversation.component.scss']
})
export class ToolbarDetailConversationComponent implements OnInit, OnDestroy {
  currentConversation$;

  constructor(
      private conversationStore: Store<fromConversation.ConversationState>,
      private router: Router
  ) {}

  back() {
    this.router.navigate(['/workspace/list-conversation']);
  }

  ngOnInit() {
    console.warn('ToolbarDetailConversationComponent');
    this.currentConversation$ = this.conversationStore.pipe(select(fromConversation.currentConversation));
  }

  ngOnDestroy() {
  }

}
