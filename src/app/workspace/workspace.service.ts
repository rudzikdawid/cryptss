import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import { User } from './index';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

    constructor(
        private websocketService: WebsocketService
    ) {}

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
