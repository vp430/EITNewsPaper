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
  constructor(private newsService: NewsService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('hello, getting articles');
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
