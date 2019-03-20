import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import { User } from './index';

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

    constructor(
        private websocketService: WebsocketService
    ) { }

    getUser(): Observable<User> {
        return this.websocketService.send('get_user');
    }
}
