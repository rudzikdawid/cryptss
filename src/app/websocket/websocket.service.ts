import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';
import { BehaviorSubject } from 'rxjs/index';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {}

  connectionStatus$ = new BehaviorSubject(false);
  connectionStatusSubscription;
  ws$ = null;
  wsSubscriber = {
    next: (next) => {
      if (this.processedListeners.hasOwnProperty(next.method)) {
        this.processedListeners[next.method].next(next);
      }
    },
    error: this.errorHandler.bind(this),
    complete: () => {
      console.warn('complete');
    }
  };

  processedListeners = {};

  errorHandler(error) {
    setTimeout(() => {
      this.ws$.subscribe(this.wsSubscriber);
    }, 5000);
  }

  connect() {
    this.ws$ = webSocket({
      url: 'ws://192.168.0.51:8080',
      closeObserver: {
        next: (e: CloseEvent) => {
          //this.ws$ = null;
          this.connectionStatus$.next(false);
        }
      },
      openObserver: {
        next: (e: Event) => {
          this.connectionStatus$.next(true);
        }
      }
    });
    this.ws$.subscribe(this.wsSubscriber);
  }

  send(method, data?) {
    this.connectionStatusSubscription = this.connectionStatus$.subscribe({
      next: (next) => {
        if (next) {
          this.ws$.next({
            method: method,
            data: data,
            timestamp: +new Date()
          });
          if (this.connectionStatusSubscription) {
            this.connectionStatusSubscription.unsubscribe();
          }
        } else {
          console.error('offline');
        }
      }
    });

    return this.addListener(method);
  }

  addListener(method) {
    if (!this.processedListeners.hasOwnProperty(method)) {
      this.processedListeners[method] = new Subject();
    }

    return this.processedListeners[method];
  }

  clearListener(method) {
    if (this.processedListeners.hasOwnProperty(method)) {
      this.processedListeners[method].complete();
      delete this.processedListeners[method];
    }
  }
}
