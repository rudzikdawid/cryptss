import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';
import { WebsocketService } from '../websocket/websocket.service';
import * as fromWorkspace from './state/workspace.reducer';
import { User } from './index';
import * as workspaceActions from './state/workspace.actions';
import { WorkspaceService } from './workspace.service';
import { myAnimation, fadeAnimation, slideInAnimation } from './animations';

const nestedViews = ['add-conversation', 'detail-conversation'];

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
    private router: Router,
    private websocketService: WebsocketService,
    private workspaceService: WorkspaceService,
    private store: Store<fromWorkspace.WorkspaceState>
  ) {}

  user$: Observable<User>;
  wsStatus$ = this.websocketService.connectionStatus$;
  routeChange$;

  ngOnInit() {
      const initNavigationEndEvent = new NavigationEnd(null, this.router.url, this.router.url);

      this.routeChange$ = this.router.events
          .pipe(
              filter(e => e instanceof NavigationEnd),
              startWith(initNavigationEndEvent, initNavigationEndEvent),
              pairwise(),
              map(([prevRoute, nextRoute] : [NavigationEnd, NavigationEnd]) => {
                  const animationState = nextRoute.url.split('/')[2].split('-').map(e => `${e.charAt(0).toUpperCase()}${e.slice(1)}`).join(''); //todo get from routing data
                  return {
                      value: animationState,
                      params: nestedViews.find(elm => nextRoute.url.includes(elm)) ?
                          {
                              leaveDeg: -180,
                              enterDeg: 180
                          } : {
                              leaveDeg: 180,
                              enterDeg: -180
                          }
                  }
              })
          );

      this.store.dispatch(new workspaceActions.Load());
      this.user$ = this.store.pipe(select(fromWorkspace.userWorkspace));
      this.workspaceService.setLeftSidenavRef(this.leftSidenavRef);
  }

}
