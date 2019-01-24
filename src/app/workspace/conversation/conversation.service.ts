import { Injectable } from '@angular/core';
import { WebsocketService } from '../../websocket/websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private websocketService: WebsocketService
  ) { }

  listConversation(): Observable<any> {
    return this.websocketService.send('list_conversation');
  }

  getConversation(uuid: string) {
    return this.websocketService.send('get_conversation', uuid);
  }

  sendMessage(msg) {
    return this.websocketService.send('new_message', msg);
  }

  deleteMessage(msg_uuid) {
    return this.websocketService.send('delete_message', msg_uuid);
  }

  addListener(method) {
    return this.websocketService.addListener(method);
  }

  clearListener(method) {
    return this.websocketService.clearListener(method);
  }
}
