import { Component } from '@angular/core';
import { NewsService } from '../app/src/services/news.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EITNewsPaper';
  loggedinUser: string;
  constructor(private newsService: NewsService){}
  loggedin() {
    this.loggedinUser =  localStorage.getItem('token');
    return this.loggedinUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('apikey');
    this.newsService.setAnonymousApiKey();
    console.log('After' + this.loggedinUser);
  }
}
