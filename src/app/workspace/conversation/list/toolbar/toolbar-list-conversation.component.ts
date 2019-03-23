import { Component } from '@angular/core';
import { WorkspaceService } from '../../../workspace.service';

@Component({
  selector: 'app-toolbar-list-conversation',
  templateUrl: './toolbar-list-conversation.component.html',
  styleUrls: ['./toolbar-list-conversation.component.scss']
})
export class ToolbarListConversationComponent {
  constructor(
      private workspaceService: WorkspaceService
  ) {}

  toggle() {
    this.workspaceService
      .getLeftSidenavRef()
      .toggle()
  }

}
