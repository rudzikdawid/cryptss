import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket/websocket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('userName') userName;

  loginUser$;
  loginUserSubscription;
  wrongCredentials: boolean = false;

  constructor(
    private router: Router,
    private websocketService: WebsocketService
  ) { }

  user = {
    name: '',
    password: ''
  };

  wsStatus$ = this.websocketService.connectionStatus$;

  ngOnInit() {
    this.userName.nativeElement.focus();

    this.loginUser$ = this.websocketService.addListener('login_user');
    this.loginUserSubscription = this.loginUser$.subscribe({
        next: (response) => {
          if (response.data) {
              this.router.navigate(['/workspace/list-conversation']);
          } else {
            this.wrongCredentials = true;
          }
        }
    })
  }

  ngOnDestroy() {
    this.loginUserSubscription.unsubscribe();
  }

  onSubmit() {
    this.websocketService.send('login_user', {login: this.user.name, password: this.user.password});
  }
}
