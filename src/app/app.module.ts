import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditionComponent } from './article-edition/article-edition.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { MatButtonModule, MatCardModule,
// MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './Pipes/filter.pipe';
import { SportsComponent } from './sports/sports.component';
import { NationalComponent } from './national/national.component';
import { InternationalComponent } from './international/international.component';
import { TechnologyComponent } from './technology/technology.component';
import { EconomyComponent } from './economy/economy.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailsComponent,
    ArticleEditionComponent,
    ArticleListComponent,
    LoginComponent,
    FilterPipe,
    SportsComponent,
    NationalComponent,
    InternationalComponent,
    TechnologyComponent,
    EconomyComponent
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
      path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: 'economy', component: EconomyComponent
      },
      {
        path: 'sports', component: SportsComponent
      },
      {
        path: 'tech', component: TechnologyComponent
      },
      {
        path: 'national', component: NationalComponent
      },
      {
        path: 'inter', component: InternationalComponent
      },
      {
        path: 'details', component: ArticleDetailsComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'edit', component: ArticleEditionComponent
      }
    ]),
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
