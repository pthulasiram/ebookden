import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';
import { map } from 'rxjs/operators';
import { Popular } from '../shared/popular';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book[] = null;
  rbooks: Book[] = null;
  showRbooks: boolean = false;
  baseURL: string = "";
  imageBaseURL: string = "";
  constructor(public activeRoute: ActivatedRoute, public bookService: BookService) {
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = this.baseURL + "covers/"
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;

    // do something with the parameters
    console.log(routeParams.id);
    this.getBookById(routeParams.id);
  }

  getBookById(id: string) {
    this.bookService.getEbookById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.book = books;
      this.listRelatedEbooks(this.book[0].topic);
      this.updatePopularEbooks(this.book[0]);
    });
  }

  listRelatedEbooks(topic: string) {
    console.log(topic)
    this.bookService.getEbookByTopic(topic).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.rbooks = books;
      let size: number = this.rbooks.length;
      if (!(size == 2)) {
        this.updateRelatedEbooks();
        this.showRbooks = false;
      } else {
        this.showRbooks = true;
      }
      //debugger;
    });
  }
  updateRelatedEbooks() {
    this.bookService.listRelatedBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.showRbooks = true;
      this.rbooks = books;
      //debugger
    });
  }
  OnChagneEbook(index: number) {
    this.book[0] = this.rbooks[index];
    this.activeRoute.snapshot.params.id = this.book[0].id;
  }
  updatePopularEbooks(book: Book) {
    let pbooks: Popular = null;

    this.bookService.getPopularEbookById(book.title).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      pbooks = books[0];
    });

    if (pbooks == null) {
      pbooks = new Popular();
      pbooks.id = book.id;
      pbooks.title = book.title;
      pbooks.coverurl = book.coverurl;
      // pbooks.key = book.key;
      pbooks.hits = 1;
      this.bookService.addPopularBook(pbooks);
    } else {
    //  debugger
      pbooks.hits = pbooks.hits + 1;
      this.bookService.updatePopularBook(pbooks.key$, pbooks);
    }

  }


}
