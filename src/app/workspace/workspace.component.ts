import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';
import { WebsocketService } from '../websocket/websocket.service';
import * as fromWorkspace from './state/workspace.reducer';
import { User } from './index';
import * as workspaceActions from './state/workspace.actions';
import { WorkspaceService } from './workspace.service';
import { myAnimation, fadeAnimation, slideInAnimation } from './animations';

const nestedViews = ['add-conversation', 'detail-conversation'];
const forwardRotation = {
    leaveDeg: 180,
    enterDeg: -180
};

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
  params;
  routeChange$;

  ngOnInit() {
      this.routeChange$ = this.router.events
          .pipe(
              startWith(new NavigationEnd(null, this.router.url, this.router.url)),
              filter(e => e instanceof NavigationEnd),
              pairwise(),
              map(([prevRoute, nextRoute] : [NavigationEnd, NavigationEnd]) => {
                  return nestedViews.find(elm => nextRoute.url.includes(elm)) ?
                      forwardRotation : {
                          leaveDeg: -180,
                          enterDeg: 180
                      };
              })
          )
          .subscribe((next) => {
              this.params = next;
          });

      this.store.dispatch(new workspaceActions.Load());
      this.user$ = this.store.pipe(select(fromWorkspace.userWorkspace));
      this.workspaceService.setLeftSidenavRef(this.leftSidenavRef);
  }

  prepareRoute(outlet: RouterOutlet) {
    const uuu = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];

    return {
        value: uuu,
        params: this.params || forwardRotation
    };
  }

}
