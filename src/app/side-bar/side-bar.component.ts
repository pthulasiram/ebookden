import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/shared/book.service';
import { Popular } from '../books/shared/popular';
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  popularEbooks:Popular[] = [];
  baseURL: string = "";
  imageBaseURL: string = "";
  constructor(private bookService:BookService) { 
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = this.baseURL + "covers/"
  }

  ngOnInit() {
    this.getEbookList()
  }

  getEbookList() {
    // Use snapshotChanges().map() to store the key
    this.bookService.getTopTenPopularBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.popularEbooks = books;
      //debugger
    });
  }
}
