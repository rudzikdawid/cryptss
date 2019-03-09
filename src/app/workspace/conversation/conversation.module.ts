import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from '../../shared/shared.module';
import { conversationReducer } from './state/conversation.reducer';
import { ConversationEffects } from './state/conversation.effects';
import { ListConversationComponent } from './list/list-conversation.component';
import { AddConversationComponent } from './add/add-conversation.component';
import { DetailConversationComponent } from './detail/detail-conversation.component';
import { MessageComponent } from './detail/message/message.component';
import { EditMessageDialogComponent } from './detail/message/edit-message-dialog/edit-message-dialog.component';

const conversationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-conversation',
        component: ListConversationComponent
      },
      {
        path: 'add-conversation',
        component: AddConversationComponent
      },
      {
        path: 'detail-conversation/:uuid',
        component: DetailConversationComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ListConversationComponent,
    AddConversationComponent,
    DetailConversationComponent,
    MessageComponent,
    EditMessageDialogComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(conversationRoutes),
    StoreModule.forFeature('conversation', conversationReducer),
    EffectsModule.forFeature([ConversationEffects]),
  ],
  entryComponents: [EditMessageDialogComponent],
})
export class ConversationModule { }
