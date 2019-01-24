import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { WebsocketService } from '../websocket/websocket.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class WorkspaceComponent implements OnInit, OnDestroy {

  constructor(
    private workspaceService: WorkspaceService,
    private websocketService: WebsocketService,
  ) {}

  toolbarTitleSubscription$;
  toolbarTitle: string;

  routeButtonSubscription$;
  routeButton: object;
  wsStatus$ = this.websocketService.connectionStatus$;


  ngOnInit() {
    this.toolbarTitleSubscription$ = this.workspaceService.toolbarTitle.subscribe({
      next: (next) => {
        setTimeout(() => {
          this.toolbarTitle = next;
        });
      },
      error: (error) => {console.error(error)}
    });

    this.routeButtonSubscription$ = this.workspaceService.routeButton.subscribe({
      next: (next) => {
        setTimeout(() => {
          this.routeButton = next;
        });
      },
      error: (error) => {console.error(error)}
    });
  }

  ngOnDestroy() {
    this.toolbarTitleSubscription$.unsubscribe();
    this.routeButtonSubscription$.unsubscribe();
  }

}
