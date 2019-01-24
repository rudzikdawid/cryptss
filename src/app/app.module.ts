import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ListConversationComponent } from './workspace/conversation/list/list-conversation.component';
import { AddConversationComponent } from './workspace/conversation/add/add-conversation.component';
import { DetailConversationComponent } from './workspace/conversation/detail/detail-conversation.component';
import { WorkspaceService } from './workspace/workspace.service';
import { WebsocketService } from './websocket/websocket.service';
import { WebsocketResolverService } from './websocket/websocket-resolver.service';
import { OfflineComponent } from './offline/offline.component';
import { MessageComponent } from './workspace/conversation/detail/message/message.component';
import { EditMessageDialogComponent } from './workspace/conversation/detail/message/edit-message-dialog/edit-message-dialog.component';
import { NewAccountComponent } from './new-account/new-account.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'new-account',
    component: NewAccountComponent
  },
  {
    path: 'offline',
    component: OfflineComponent
  },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    children: [
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
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceComponent,
    ListConversationComponent,
    AddConversationComponent,
    DetailConversationComponent,
    OfflineComponent,
    MessageComponent,
    EditMessageDialogComponent,
    NewAccountComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  entryComponents: [EditMessageDialogComponent],
  providers: [WebsocketService, WebsocketResolverService, WorkspaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
