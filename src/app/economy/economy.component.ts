import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';

@Component({
  selector: 'app-economy',
  templateUrl: './economy.component.html',
  styleUrls: ['./economy.component.css']
})
export class EconomyComponent implements OnInit {
  articles$: Observable<Article[]>;
  subtitle: string;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    console.log('hello, getting articles');
    this.articles$ = this.newsService.getArticles();
  }

  Search() {
    if (this.subtitle === '') {
      this.ngOnInit();
    } else {
     /* this.articles$ = this.articles$.pipe(
        filter( res => {
          return res.subtitle.match(this.subtitle);
        })

      ); */
    }
  }

}
