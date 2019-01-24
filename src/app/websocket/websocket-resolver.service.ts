import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketResolverService implements Resolve<any> {
  isConnected = true;

  constructor(
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.websocketService.connectionStatus$.subscribe({
      next: (next) => {
        this.isConnected = next;
        this.redirect(state);
      }
    });

    return true;
  }

  redirect(state) {
    if (!this.isConnected) {
      this.router.navigate(['/offline']);
    }
  }
}
