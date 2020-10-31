import { Component, OnInit } from '@angular/core';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  artid: any;
  article$: Observable<Article>;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artid = this.route.snapshot.queryParams.articleId;
    console.log(this.artid);
    this.article$ = this.newsService.getArticle(this.artid);
    console.log(this.article$);

  }

}
