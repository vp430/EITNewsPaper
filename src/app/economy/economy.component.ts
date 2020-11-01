import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-economy',
  templateUrl: './economy.component.html',
  styleUrls: ['./economy.component.css']
})
export class EconomyComponent implements OnInit {
  articles$: Observable<Article[]>;
  subtitle: string;
  searchText: '';
  loggedinUser: string;
  apk: string;
  token: string;
  constructor(private newsService: NewsService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('hello, getting articles');
    console.log('Token is ',localStorage.getItem('token'));
    console.log('apikey is ',localStorage.getItem('apikey'));
    this.token = localStorage.getItem('token');
    if(this.token)
    {
      console.log('Hallo ha ha');
      this.apk = localStorage.getItem('apikey');
      this.newsService.setUserApiKey(this.apk);
    }
    this.articles$ = this.newsService.getArticles();
  }

  updateArt(article){
    console.log('article id is ' + article.id);
  //  article.title = 'Natalia is the best';
    const artud = article.id;
   // localStorage.setItem('artud', artud);
    this.router.navigate(['/edit'],{queryParams: {articleId: artud}});
  }

  getArt(article) {
    console.log('Fetching article ' + article.title);
   // this.newsService.getArticle(article.id);
    const artid = article.id;
    // localStorage.setItem('artid', artid);
    this.router.navigate(['/details'], {queryParams: {articleId: artid}});

  }

  deleteArt(article)
  {
    console.log('Deleting article' + article.title);
    this.newsService.deleteArticle(article).subscribe(data => {
      console.log('Deleted');
    });
  }


  loggedin() {
    this.loggedinUser =  localStorage.getItem('token');
    return this.loggedinUser;
  }

}
