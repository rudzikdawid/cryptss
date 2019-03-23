import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

import { EditMessageDialogComponent } from './message/edit-message-dialog/edit-message-dialog.component';
import { ConversationService } from '../conversation.service';
import * as conversationActions from '../state/conversation.actions';
import * as fromConversation from '../state/conversation.reducer';

@Component({
  selector: 'app-detail-conversation',
  templateUrl: './detail-conversation.component.html',
  styleUrls: ['./detail-conversation.component.scss']
})
export class DetailConversationComponent implements OnInit, OnDestroy {
  @ViewChild('messageTextArea') messageTextArea;

  conversationDetailSubscription$;
  conversationDetail;
  routeParamsSubscription$;
  newMessageSubscription;
  message;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private conversationService: ConversationService,
    private conversationStore: Store<fromConversation.ConversationState>,
  ) {}

  ngOnInit() {

    this.routeParamsSubscription$ = this.route.params.subscribe( params => {
      this.conversationDetailSubscription$ = this.conversationService
        .getConversation(params.uuid)
        .subscribe({
          next: (next) => {
            this.conversationDetail = next.messages;
            this.conversationStore.dispatch(new conversationActions.SetCurrentConversation(next));
          }
        });
    });

    this.newMessageSubscription = this.conversationService
      .addListener('new_message')
      .subscribe({
        next: (next) => {
          this.conversationDetail.push(next);
        }
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription$.unsubscribe();
    this.conversationDetailSubscription$.unsubscribe();
    this.newMessageSubscription.unsubscribe();
  }

  send() {
    if (!this.message) {
      return;
    }

    const targetMsg = {
      msg_uuid: 6,
      usr_uuid: "dawid",
      avatar: "dawid.png",
      message: this.message
    };
    this.conversationService.sendMessage(targetMsg);
    this.message = '';
    this.messageTextArea.nativeElement.focus();
  }

  itsMe(usrUuid) {
    return usrUuid === 'dawid' ? 'my-message' : '';
  }

  enterDetect(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }

  showMenu(msg) {
    //todo
  }

  copyMsg(msg) {
    window.navigator['clipboard'].writeText(msg.message);
    document.execCommand('copy');
  }

  editMsg(msg) {
    const dialogRef = this.dialog.open(EditMessageDialogComponent, {
      width: '90vw',
      data: {message: msg.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        msg.message = result;
      }
    });

  }

  deleteMsg(message) {
    let subscription = this.conversationService
      .deleteMessage(message.msg_uuid)
      .subscribe({
        next: (next) => {
          this.conversationDetail.splice(this.conversationDetail.indexOf(message), 1);

          if (subscription) {
            subscription.unsubscribe();
          }
        },
        error: (error) => {
          if (subscription) {
            subscription.unsubscribe();
          }
        }
      });
  }

}
