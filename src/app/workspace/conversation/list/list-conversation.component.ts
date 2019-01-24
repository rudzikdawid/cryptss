import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { WorkspaceService } from '../../workspace.service';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-list-conversation',
  templateUrl: './list-conversation.component.html',
  styleUrls: ['./list-conversation.component.scss']
})
export class ListConversationComponent implements OnInit, OnDestroy {
  listConversation$;

  constructor(
    private workspaceService: WorkspaceService,
    private conversationService: ConversationService
  ) { }


  ngOnInit() {
    this.workspaceService.toolbarTitle.next('Cryptss');
    this.workspaceService.routeButton.next(null);

    this.listConversation$ = this.conversationService
      .listConversation().pipe(
        map(res => res.data)
      );
  }

  ngOnDestroy() {
    this.conversationService.clearListener('list_conversation');
  }

}
