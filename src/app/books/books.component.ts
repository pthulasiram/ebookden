import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';
import { BookService } from './shared/book.service';
import { Book } from './shared/book';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  result: Book[] = [];
  totalBooks: number = 0;
  no_books_page: number = 4;
  currentPage: number = 1;
  pages: number = 1;
  baseURL: string = "http://libgen.io/covers/";
  spinner:boolean = true;
  searchForm:FormGroup;
  submitted = false;
  success = false;
  constructor(private bookService: BookService, private formBuilder: FormBuilder) {

  }

  loadPage(page: number) {
    if (this.currentPage <= this.pages) {
      this.currentPage = page;
      this.updateBooksList();
    }
    console.log(this.currentPage + " ------------------------");
  }

  computePagination() {
    this.totalBooks = this.result.length;
    let total_pages = Math.ceil(this.totalBooks / this.no_books_page);
    this.pages = total_pages;
    // for (let i = 1; i <= total_pages; i++) {
    //   this.pages.push(i);
    // }
    console.log(`total books ${this.totalBooks} ------- pages ${total_pages}`)
  }


  updateBooksList() {
    this.books = [];
    let total_pages = Math.ceil(this.totalBooks / this.no_books_page);

    for (let i = (this.currentPage * this.no_books_page - this.no_books_page); i < (this.currentPage * this.no_books_page) && (i < this.totalBooks); i++) {
      this.books.push(this.result[i]);
    }
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.getEbookList();
  }

  getEbookList() {
    // Use snapshotChanges().map() to store the key
    this.bookService.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.result = books;

      this.computePagination();
      this.loadPage(this.currentPage);
      this.spinner=false;
    });
  }

  searchEbooksByTitle(){
    this.spinner=true;
    this.submitted = true;
    this.currentPage =1;
    if (this.searchForm.invalid) {
      this.getEbookList();
        return;
    }
    console.log('searchig ebooks for '+this.searchForm.controls.title.value);
  
    this.bookService.getEbooksByTitle(this.searchForm.controls.title.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.result = books;
      this.computePagination();
      this.loadPage(this.currentPage);
      this.spinner=false;
    });
    this.success = true;
    //this.searchForm.controls.title.setValue('')
    //this.searchForm.reset;
  }
  clear(){
    this.searchForm.controls.title.setValue('')
  }
}
