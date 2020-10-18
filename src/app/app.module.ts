import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditionComponent } from './article-edition/article-edition.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailsComponent,
    ArticleEditionComponent,
    ArticleListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'list', component: ArticleListComponent
      },
      {
        path: 'details', component: ArticleDetailsComponent
      },
      {
        path: 'login', component: LoginComponent
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
