import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book:any ={
    "title": "Dictionary of Biochemistry and Molecular Biology",
    "author": "J. Stenesh",
    "topic": "Biology\\\\Molecular",
    "md5": "1D13C90B36613C5A30B9D914113D515D",
    "coverurl": "0\/1d13c90b36613c5a30b9d914113d515d-d.jpg"
  };
  rbooks = [{
    "title": "How the Mind Works",
    "author": "Steven Pinker",
    "topic": "Biology",
    "md5": "F5E45A4A88744C863385FDF19C9F40CE",
    "coverurl": "0\/f5e45a4a88744c863385fdf19c9f40ce-d.jpg"
  }, {
    "title": "The blank slate: the modern denial of human nature",
    "author": "Steven Pinker",
    "topic": "Biology",
    "md5": "5FB1EFF06867DD2B197943B46B023F0D",
    "coverurl": "0\/5fb1eff06867dd2b197943b46b023f0d-d.jpg"
  }];
  baseURL: string = "http://libgen.io/covers/";
  constructor() { }

  ngOnInit() {
  }

}
