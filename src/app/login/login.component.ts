import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../src/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  log: boolean = false;
  ngOnInit(): void {
    /*this.loginService.login('us_2_2', '2422').subscribe(data => {
     console.log('Login API response', data);
    }); */
  }

  onLogin(loginForm: NgForm){
    this.loginService.login(loginForm.value.username, loginForm.value.passwd).subscribe(
      res => {this.log = true; }
    );
    const token = loginForm.value.username;
    if(this.log){
      Swal.fire(
        'Welcome!',
        'You are successfully logged in!',
        'success'
      );
      localStorage.setItem('token', token);
      this.router.navigate(['/']);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have entered incorrect details',
      });

    }
  }

}
