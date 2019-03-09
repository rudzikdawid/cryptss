import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from '../shared/shared.module';
import { workspaceReducer } from './state/workspace.reducer';
import { WorkspaceComponent } from "./workspace.component";
import { OfflineComponent } from './offline/offline.component';


const workspaceRoutes: Routes = [
  {
    path: 'offline',
    component: OfflineComponent
  },
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        loadChildren: './conversation/conversation.module#ConversationModule'
      }
    ]
  }
];

@NgModule({
  declarations: [
    WorkspaceComponent,
    OfflineComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(workspaceRoutes),
    StoreModule.forFeature('workspace', workspaceReducer)
  ]

})
export class WorkspaceModule { }
