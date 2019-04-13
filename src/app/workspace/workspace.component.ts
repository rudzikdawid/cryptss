import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import * as fromWorkspace from './state/workspace.reducer';
import { User } from './index';
import * as workspaceActions from './state/workspace.actions';
import { WorkspaceService } from './workspace.service';
import { myAnimation, fadeAnimation, slideInAnimation } from './animations';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  animations: [
      myAnimation,
      fadeAnimation,
      slideInAnimation
  ],
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('leftSidenav') leftSidenavRef;

  constructor(
    private websocketService: WebsocketService,
    private workspaceService: WorkspaceService,
    private store: Store<fromWorkspace.WorkspaceState>
  ) {}

  user$: Observable<User>;
  wsStatus$ = this.websocketService.connectionStatus$;


  ngOnInit() {
      this.store.dispatch(new workspaceActions.Load());
      this.user$ = this.store.pipe(select(fromWorkspace.userWorkspace));
      this.workspaceService.setLeftSidenavRef(this.leftSidenavRef);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
