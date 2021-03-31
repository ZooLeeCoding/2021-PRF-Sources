import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // 123456Zoolee

  email: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  login() {
    if (this.email != '' && this.password != '') {
      this.loginService.login(this.email, this.password).then(msg => {
        console.log(msg);
        localStorage.setItem('user', msg.user!.uid);
        this.router.navigate(['/first']);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().then(msg => {
        console.log('logout successful');
      }).catch(error => {
        console.log(error);
      })
    }
  }

}
