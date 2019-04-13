import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { WebsocketService } from '../websocket/websocket.service';
import { User } from './index';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

    constructor(
        private websocketService: WebsocketService,
        private router: Router
    ) {
        this.router.events
            .pipe(pairwise())
            .subscribe(([prev, next]) => {
                if (next instanceof NavigationStart && prev instanceof NavigationEnd) {
                    console.log('from: ', prev.url);
                    console.log('to: ', next.url);
                    console.warn('==============');
                }
            });
    }

    leftSidenavRef = null;

    getUser(): Observable<User> {
        return this.websocketService.send('get_user');
    }

    setLeftSidenavRef(elementRef: MatSidenav) {
        this.leftSidenavRef = elementRef
    }

    getLeftSidenavRef(): MatSidenav {
        return this.leftSidenavRef;
    }
}
