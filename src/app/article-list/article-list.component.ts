import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]>;
  subtitle: any;
  loggedinUser: string;
  article$: Observable<Article>;
  newsa: Article;

  constructor(private newsService: NewsService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('hello, getting articles');
    this.articles$ = this.newsService.getArticles();
 
    /*  this.http.post<any>('http://sanger.dia.fi.upm.es/pui-rest-news/login', 
    { username: 'us_2_2', passwd: '2422' }).subscribe(data => 
      {
      this.postId = data.id;
      }*/
  }

  updateArt(article){
    console.log('article id is ' + article.id);
    article.title = 'Natalia is the best';
    this.newsService.updateArticle(article).subscribe(data => {
      console.log('article updated');
      console.log(data);
    });
  //  const artud = article.id;
   // localStorage.setItem('artud', artud);
   // this.router.navigateByUrl('/edit');
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

  createArt() {
    console.log('Creatiion Test');
    this.newsa.id = 654;
    this.newsa.title = 'Boom Boom';
    this.newsa.subtitle = 'Testing';
    this.newsa.abstract = 'adaudga';
    this.newsa.category = 'Technology';
    console.log(this.newsa);
    this.newsService.createArticle(this.newsa).subscribe(data => {
      console.log('Created');
    });

  }
  // tslint:disable-next-line: typedef
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

  loggedin() {
    this.loggedinUser =  localStorage.getItem('token');
    return this.loggedinUser;
  }
  
}
