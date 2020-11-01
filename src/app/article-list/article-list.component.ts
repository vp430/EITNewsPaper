import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {SearchPipe} from '../Pipes/search.pipe';
import Swal from 'sweetalert2';
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
  rem: boolean = false;
  
  newsa: Article = {
    abstract: '',
    subtitle: '',
    update_date: '',
    category: '',
    title: '',
    thumbnail_image: '',
    thumbnail_media_type: ''
  };
  searchText: '';
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Article has been deleted.',
          'success'
        );
        console.log('Deleting article' + article.title);
        this.newsService.deleteArticle(article).subscribe();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'The Article is Safe :)',
          'error'
        )
      }
    })
  }


  loggedin() {
    this.loggedinUser =  localStorage.getItem('token');
    return this.loggedinUser;
  }
  
}
