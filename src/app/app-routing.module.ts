import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'', component:MainComponent},
  {path:'books', component:BookDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
