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

  apikey: string;            
  log: boolean = false;
  ngOnInit(): void {
    /*this.loginService.login('us_2_2', '2422').subscribe(data => {
     console.log('Login API response', data);
    }); */
  }

  onLogin(loginForm: NgForm) {
    console.log('processing');
    this.loginService.login(loginForm.value.username, loginForm.value.passwd).subscribe(

      data => {
        this.apikey = data.apikey;
        this.log = true;
        console.log('Data is', data);
        console.log('API key is:', data.apikey);
        console.log('Apikey is ' + this.apikey);
        const token = loginForm.value.username;
        if (this.log) {
          Swal.fire(
            'Welcome!',
            'You are successfully logged in!',
            'success'
          );
          const ap = this.apikey;
          localStorage.setItem('token', token);
          localStorage.setItem('apikey', ap);
          this.router.navigate(['/']);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have entered incorrect details',
          });

        }
      }

    );

  }

}
