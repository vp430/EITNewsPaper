import { Component, OnInit } from '@angular/core';
import {Article} from '../article';
import {NewsService} from '../src/services/news.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {

  artud: any;
  article$: Observable<Article>;
  //art: Article;
/*  art: Article = {
    abstract: '',
    subtitle: '',
    update_date: '',
    category: '',
    title: '',
    thumbnail_image: '',
    thumbnail_media_type: '',
    image_media_type: '',
    image_data: ''
  };*/
  cardImageBase64: any;
  isImageSaved: boolean;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artud = this.route.snapshot.queryParams.articleId;
    console.log(this.artud);
    this.article$ = this.newsService.getArticle(this.artud);
   // console.log(this.article$);
  }
  
  onEdit(editform: NgForm,article) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Article edited Successfully !', '', 'success');
        article.title = editform.value.title;
        article.subtitle = editform.value.subtitle;
        article.abstract = editform.value.abstract;
        article.body = editform.value.body;
        this.newsService.updateArticle(article).subscribe();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  CatChoice(event: any,article){

    article.category = event.target.value;
  }
  fileChangeEvent(fileInput: any,article) {
    
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          //console.log('imgBase64Path', imgBase64Path);
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
         // this.art.image_media_type = fileInput.target.files[0].type;
          article.image_media_type = fileInput.target.files[0].type;
         // console.log('media type', this.art.image_media_type);
          // const head = this.art.image_media_type.length + 13;
          const head = article.image_media_type.length + 13;
         // this.art.image_data = e.target.result.substring(head, e.target.result.length);
          article.image_data = e.target.result.substring(head, e.target.result.length);
          // console.log('image data', this.art.image_data);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      //console.log(this.art.image_data);
      
    }
  }

  /*
  Initial part of fileChangeEvent 
   this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      } */

      // article.category = editform.value.category;
  //  this.art.image_data = 'iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXMzMyVlZWTk5PLy8uXl5fPz8+5ubnHx8ednZ2ampq1tbXDw8O8vLyioqLAwMCtra2oqKhNt9DKAAAEb0lEQVR4nO3Y0ZajKBCAYQUERRTf/2m3qlBj0jPb2Tl7ts3Z/7uYtNEhUkJR2HUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+FQbwcv57/B039Sy39rBRrzevjeM01F38eej09v9WSL7XWmM7jOT8d+iItr/5X//NmyjL1fRjzfq8+L0EO69GVtOnpJb7RlbSNfd+P2x5fX6SlftqOeKY8hssP3dgsXe6ddDu24zi1w9pGud/a6fH7kXJcGpZ27aoREsveUg12esp3nz/DqHcZF+mKjYxZOrYU+WdsTzvKo61RLqrpb9uRlnII/RKzxLTqUPBVGskSCNeirSFaVvmh5b2J+HNW109yz2XsnT6/IfYhrN0g3dv0cWrI5DnHENx3PZn1Up17rg2q5ELIwyDhDdZSlZZ9l6Tluw+UlK3zOu7tUx7ulrQD/aIDQ2ZWiEM3y+P9Lg/I3JjkkqHIf9GYRCfDQoIshzrkkvxCPX/g3oZB+6qPU+f90XkZPmPRYROsg9aTMyY+if3jEqhhtummY0r/2Frnk8REB4ZMHVd0FbNQfYK0tHGySjYo+oUNfBkvoZ90SmXJDcfTHTbn3Dh0a5DPLzNKwhcmDaPmoMFmX9CW4xScjTzJX+W/7Nof8l4yY9A7XUMb6T7YyjNsoR8tJmHPwZ3FJIQwS+KQ/PnlkUdNRam1YBlqsRF4tjCHc4m7sznn0Sa75Fp5ihaTyZ7yMaV0DvVnTPI2hVB1aC1fUoOuLhZd34cWEwmrxURa3jNU/wExKVI17IlP/rRFeB/5wz6lzpFvfCdTatTwlde8K5k0tGXbuzAdMRmHx+yT5cnFmy88nQbC9XvieysmLXEuex3yREPS6o8Pj0kqUapwu+M3Y6LFxlnWXb7OfbD1qvv4mHSPmu3MsdPvc6zykmVDfW1llfw65eOKLzl2+qAcqySZTsN7647SFfbLxkUDeQbqo9cd65huVlyrT5ytGo/6JLzWJ6q4EF43Lm3Dc6SY39YnMqfuXp/MNQ6PmGgFrnXsvOcVrcxTq2OvCXXQESFXPrUkibct5M1e+qbRdged7P6smNE69uabQL3FrjsL1mO/s+37ndT2O9qhyxsULVfG+LLDlSZaRbIrbb9zzJljv7P9arm6l1VfFXjbjeSjOCuWQu0FimaD0Xe5bXsOMi9azXbdF8qA0EvtvB0H7b3XBqyl1sa6p5k7005PVd+t2apgj3PMj/cnRfqwWZn76P6qWUZqe73yMXokYfRbzMaKNq1caz02ULa9XOInvD+RaeHsbdi0LwalvR0L+xDwtZ2+7GV1v6NVi71HO6sWmzpy7Hq374Lm1rI7NtQyUK4/dGdrlXkTluNOvdRvcnjOilT1Tdx2ebVs++JVz8ine9otH1oAV32V+3izq2963Xtvdn+cX2Msl/E8lxjXl9NPWz35wjo2x/2P89vDfnnSli4hkJbL7ScOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyxvwCGcia2SdQndQAAAABJRU5ErkJggg==';
  //  this.art.image_data = editform.value.image_data;
   // console.log(editform.value.image_data);