import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-add-conversation',
  templateUrl: './toolbar-add-conversation.component.html',
  styleUrls: ['./toolbar-add-conversation.component.scss']
})
export class ToolbarAddConversationComponent implements OnInit, OnDestroy {
  constructor(
      private router: Router,
  ) {}

  back() {
    this.router.navigate(['/workspace/list-conversation']);
  }

  ngOnInit() {
    console.warn('ToolbarAddConversationComponent')
  }

  ngOnDestroy() {
  }

}
