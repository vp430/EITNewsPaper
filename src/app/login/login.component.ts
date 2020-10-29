import { Component, OnInit } from '@angular/core';
import { LoginService } from '../src/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.login('us_2_2', '2422').subscribe(data => {
      console.log('Login API response', data);
    });
  }

}
