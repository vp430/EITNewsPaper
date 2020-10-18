import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]>;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    console.log('hello');
    this.articles$ = this.newsService.getArticles();
  /*  this.http.post<any>('http://sanger.dia.fi.upm.es/pui-rest-news/login', 
    { username: 'us_2_2', passwd: '2422' }).subscribe(data => 
      {
      this.postId = data.id;
      }*/
  }

}
