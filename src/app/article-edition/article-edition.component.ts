import { Component, OnInit } from '@angular/core';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { LoginService } from '../src/services/login.service'

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {

  artud: any;
  article$: Observable<Article>;
  art: Article;

  constructor(private newsService: NewsService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.artud = localStorage.getItem('artud');
    console.log(this.artud);
    this.article$ = this.newsService.getArticle(this.artud);
   // console.log(this.article$);
  }
  
  onEdit(editform: NgForm) {
    this.loginService.login('us_2_2', '2422').subscribe(data => {
      console.log('Login API response', data);
     });
    this.art.title = editform.value.title;
    this.art.subtitle = editform.value.subtitle;
    this.art.abstract = editform.value.abstract;
    this.newsService.updateArticle(this.art);
  }
}
