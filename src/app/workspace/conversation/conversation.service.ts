import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Conversation } from "./index";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private websocketService: WebsocketService
  ) { }

  listConversation(): Observable<Conversation[]> {
    return this.websocketService.send('list_conversation');
  }

  listContacts(): Observable<any> {
    return this.websocketService.send('list_contacts');
  }

  getConversation(uuid: string) {
    return this.websocketService.send('get_conversation', uuid);
  }

  addConversation(newChanel: Conversation): Observable<Conversation> {
    return this.websocketService.send('add_conversation', newChanel);
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
