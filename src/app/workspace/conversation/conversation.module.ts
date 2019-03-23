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
import { ToolbarListConversationComponent } from "./list/toolbar/toolbar-list-conversation.component";
import { ToolbarDetailConversationComponent } from "./detail/toolbar/toolbar-detail-conversation.component";
import { ToolbarAddConversationComponent } from "./add/toolbar/toolbar-add-conversation.component";

const conversationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-conversation',
        children: [
          {path: '', component: ToolbarListConversationComponent, outlet: 'toolbar', data: {animation: 'list'}},
          {path: '', component: ListConversationComponent, data: {animation: 'list'}}
        ]
      },
      {
        path: 'detail-conversation/:uuid',
        children: [
          {path: '', component: ToolbarDetailConversationComponent, outlet: 'toolbar', data: {animation: 'detail'}},
          {path: '', component: DetailConversationComponent, data: {animation: 'detail'}}
        ]
      },
      {
        path: 'add-conversation',
        children: [
          {path: '', component: ToolbarAddConversationComponent, outlet: 'toolbar', data: {animation: 'add'}},
          {path: '', component: AddConversationComponent, data: {animation: 'add'}}
        ]
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
    EditMessageDialogComponent,
    ToolbarListConversationComponent,
    ToolbarDetailConversationComponent,
    ToolbarAddConversationComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(conversationRoutes),
    StoreModule.forFeature('conversation', conversationReducer),
    EffectsModule.forFeature([ConversationEffects])
  ],
  entryComponents: [EditMessageDialogComponent],
})
export class ConversationModule { }
