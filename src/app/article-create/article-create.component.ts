import { Component, OnInit } from '@angular/core';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  
  art: Article = {
    abstract: '',
    subtitle: '',
    update_date: '',
    category: '',
    title: '',
    thumbnail_image: '',
    thumbnail_media_type: '',
    image_media_type: '',
    image_data: ''
  };
  cardImageBase64: any;
  isImageSaved: boolean;
  ngOnInit(): void {
  }

  onCreate(editform: NgForm) {
    this.art.title = editform.value.title;
    this.art.subtitle = editform.value.subtitle;
    this.art.abstract = editform.value.abstract;
    this.art.body = editform.value.body;
    console.log(' Category is ' + this.art.category)
    this.newsService.createArticle(this.art).subscribe();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Article has been successfully created !',
      showConfirmButton: false,
      timer: 1500
    })
  }
  CatChoice(event: any){

    this.art.category = event.target.value;
  }
  fileChangeEvent(fileInput: any) {
    
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          //console.log('imgBase64Path', imgBase64Path);
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          this.art.image_media_type = fileInput.target.files[0].type;
          console.log('media type', this.art.image_media_type);
          const head = this.art.image_media_type.length + 13;
          this.art.image_data = e.target.result.substring(head, e.target.result.length);
          // console.log('image data', this.art.image_data);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      //console.log(this.art.image_data);
      
    }
}
