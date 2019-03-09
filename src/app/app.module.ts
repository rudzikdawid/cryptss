import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from './shared/shared.module';
import { WebsocketService } from './websocket/websocket.service';
import { WebsocketResolverService } from './websocket/websocket-resolver.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
    path: 'workspace',
    loadChildren: './workspace/workspace.module#WorkspaceModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAccountComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 10}),
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,

  ],
  exports: [RouterModule],
  providers: [WebsocketService, WebsocketResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
