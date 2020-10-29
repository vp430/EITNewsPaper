import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css']
})
export class InternationalComponent implements OnInit {

  articles$: Observable<Article[]>;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    console.log('hello, getting articles');
    this.articles$ = this.newsService.getArticles();
  }

}