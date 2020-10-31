import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EITNewsPaper';
  loggedinUser: string;

  loggedin() {
    this.loggedinUser =  localStorage.getItem('token');
    console.log('Before' + this.loggedinUser);
    return this.loggedinUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    console.log('After' + this.loggedinUser);
  }
}
