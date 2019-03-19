import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import * as fromWorkspace from './state/workspace.reducer';
import { Toolbar } from './index';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({opacity: 0}),
            animate('500ms', style({'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({'opacity': 1}),
            animate('500ms', style({'opacity': 0}))
          ]
        )]
    )
  ],
})
export class WorkspaceComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    private store: Store<fromWorkspace.WorkspaceState>
  ) {}

  toolbar$: Observable<Toolbar>;
  wsStatus$ = this.websocketService.connectionStatus$;


  ngOnInit() {
      this.toolbar$ = this.store.pipe(select(fromWorkspace.toolbarWorkspaces));
  }

}
