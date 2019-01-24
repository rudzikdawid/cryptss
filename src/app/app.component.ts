import { Component } from '@angular/core';
import { WebsocketService } from './websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private websocketService: WebsocketService
  ) {
    this.websocketService.connect();
  }
}
