import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { defineBase } from '@angular/core/src/render3';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any = [];
  result: any = [];
  totalBooks: number = 0;
  no_books_page: number = 4;
  currentPage: number = 1;
  pages: number = 1;
  baseURL: string = "http://libgen.io/covers/";

  items$: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.items$ = db.list('ebooks').valueChanges();
    // this.result = [{
    //   "title": "How the Mind Works",
    //   "author": "Steven Pinker",
    //   "topic": "Biology",
    //   "md5": "F5E45A4A88744C863385FDF19C9F40CE",
    //   "coverurl": "0\/f5e45a4a88744c863385fdf19c9f40ce-d.jpg"
    // }, {
    //   "title": "The blank slate: the modern denial of human nature",
    //   "author": "Steven Pinker",
    //   "topic": "Biology",
    //   "md5": "5FB1EFF06867DD2B197943B46B023F0D",
    //   "coverurl": "0\/5fb1eff06867dd2b197943b46b023f0d-d.jpg"
    // }, {
    //   "title": "Animal domestication and behavior",
    //   "author": "Price E.O.",
    //   "topic": "Biology\\\\Zoology",
    //   "md5": "EA9B63B932EB2ACFD0C9CE00D3B60F35",
    //   "coverurl": "0\/ea9b63b932eb2acfd0c9ce00d3b60f35.jpg"
    // }, {
    //   "title": "Advances in Chemical Physics, Computational Methods for Protein Folding ",
    //   "author": "Richard A. Friesner",
    //   "topic": "Chemistry\\\\Physical Chemistry",
    //   "md5": "9F56D71D34F8775053E42F5A64C759B8",
    //   "coverurl": "0\/9f56d71d34f8775053e42f5a64c759b8-d.jpg"
    // }, {
    //   "title": "Neuroscience",
    //   "author": "Dale Purves, George J. Augustine, David Fitzpatrick, William C. Hall, Anthony-Samuel Lamantia, James O. McNamara, S. Mark Williams",
    //   "topic": "Medicine",
    //   "md5": "CB207C615844574D6384B210090C46D0",
    //   "coverurl": "0\/cb207c615844574d6384b210090c46d0-d.jpg"
    // }, {
    //   "title": "Neuroscience",
    //   "author": "Dale Purves, George J. Augustine, David Fitzpatrick, William C. Hall, Anthony-Samuel Lamantia, James O. McNamara, S. Mark Williams",
    //   "topic": "Medicine",
    //   "md5": "270015C07518D5C2293CD613D3B75F9D",
    //   "coverurl": "0\/270015c07518d5c2293cd613d3b75f9d-d.jpg"
    // }, {
    //   "title": "Life, the science of biology",
    //   "author": "William K. Purves, David Sadava, Gordon H. Orians, H. Craig Heller",
    //   "topic": "Science (general)\\\\Scientific-popular",
    //   "md5": "906B377C74C651DCFE4ACEFB3F3524E6",
    //   "coverurl": "0\/906b377c74c651dcfe4acefb3f3524e6-d.jpg"
    // }, {
    //   "title": "Color atlas of periodontology",
    //   "author": "Klaus H. Rateitschak, Edith M. Rateitschak, Herbert F. Wolf, Hassell",
    //   "topic": "Medicine\\\\Dentistry, Orthodontics",
    //   "md5": "FED33AA47BF03716AA24DA50FCB6D042",
    //   "coverurl": "0\/fed33aa47bf03716aa24da50fcb6d042-d.jpg"
    // }, {
    //   "title": "Biology",
    //   "author": "Raven, Johnson.",
    //   "topic": "Biology",
    //   "md5": "3B3D622874C9A89F480EDE757AD0AE7D",
    //   "coverurl": "0\/3b3d622874c9a89f480ede757ad0ae7d.jpg"
    // }, {
    //   "title": "Molecular neuroscience",
    //   "author": "Dr P Revest, Alan Longstaff",
    //   "topic": "Psychology",
    //   "md5": "8A6714310A205F05314BF58EC87C5FA9",
    //   "coverurl": "0\/8a6714310a205f05314bf58ec87c5fa9-d.jpg"
    // }, {
    //   "title": "Cell Motility: From molecules to organisms",
    //   "author": "Anne Ridley, Michelle Peckham, Peter Clark (Editors)",
    //   "topic": "Biology\\\\Biochemistry",
    //   "md5": "F52936C2786510C5F53FF5CE249E8ED3",
    //   "coverurl": "0\/f52936c2786510c5f53ff5ce249e8ed3-d.jpg"
    // }, {
    //   "title": "You - The Owner's Manual - Inside your Body",
    //   "author": "Michael F. Roizen, Mehmet C. Oz",
    //   "topic": "Biology",
    //   "md5": "882703FFB1DC2DD1A369BE12CDA277A3",
    //   "coverurl": "0\/882703ffb1dc2dd1a369be12cda277a3-d.jpg"
    // }, {
    //   "title": "Biomedical Application of Proteomics",
    //   "author": "Jean-Charles Sanchez, Garry L. Corthals, Denis F. Hochstrasser",
    //   "topic": "Medicine",
    //   "md5": "560ECD8FBD2BA7D757B5A51DA042B50F",
    //   "coverurl": "0\/560ecd8fbd2ba7d757b5a51da042b50f-d.jpg"
    // }, {
    //   "title": "Introduction to botany",
    //   "author": "James (James Schooley) Schooley",
    //   "topic": "Biology\\\\Plants: Botany",
    //   "md5": "60E88758C6B8F4D22D62F88495F30120",
    //   "coverurl": "0\/60e88758c6b8f4d22d62f88495f30120-d.jpg"
    // }, {
    //   "title": "Neuroscience: a mathematical primer",
    //   "author": "Alwyn Scott",
    //   "topic": "Medicine",
    //   "md5": "3E9400AA7C4C99881ED7EDA013A27C0E",
    //   "coverurl": "0\/3e9400aa7c4c99881ed7eda013a27c0e-d.jpg"
    // }, {
    //   "title": "Biology of Plagues: Evidence from Historical Populations",
    //   "author": "Susan Scott, Christopher J. Duncan",
    //   "topic": "History",
    //   "md5": "AA08C6A28172B9288FB4EE419A1E0683",
    //   "coverurl": "0\/aa08c6a28172b9288fb4ee419a1e0683-d.jpg"
    // }, {
    //   "title": "Giant Molecules: Essential Materials for Everyday Living and Problem Solving",
    //   "author": "Charles E.  Carraher Jr.",
    //   "topic": "Biology",
    //   "md5": "AE5ECBBC3885D806441941E0609B05F8",
    //   "coverurl": "0\/ae5ecbbc3885d806441941e0609b05f8-d.jpg"
    // }, {
    //   "title": "The Earth's Biosphere: Evolution, Dynamics, and Change",
    //   "author": "Vaclav Smil",
    //   "topic": "Geology",
    //   "md5": "71206FB07E1E10C4F88BF8DD5836836A",
    //   "coverurl": "0\/71206fb07e1e10c4f88bf8dd5836836a-d.jpg"
    // }, {
    //   "title": "Oxford Dictionary of Biochemistry and Molecular Biology",
    //   "author": "A. D., et al, eds. Smith",
    //   "topic": "Education",
    //   "md5": "16344DAB2E9991A139511158F4C9DCFE",
    //   "coverurl": "0\/16344dab2e9991a139511158f4c9dcfe.jpg"
    // }, {
    //   "title": "Psychopharmacology: an introduction",
    //   "author": "Ren\u00e9 Spiegel",
    //   "topic": "Chemistry\\\\Pharmacology",
    //   "md5": "45D42363F18F345AE058CA9B8AD66412",
    //   "coverurl": "0\/45d42363f18f345ae058ca9b8ad66412-d.jpg"
    // }, {
    //   "title": "Ribosomes",
    //   "author": "Spirin A.S.",
    //   "topic": "Biology\\\\Molecular",
    //   "md5": "4EA3C9295A35C9869BEA1260727C69B6",
    //   "coverurl": "0\/4ea3c9295a35c9869bea1260727c69b6.jpg"
    // }, {
    //   "title": "Ribosomes",
    //   "author": "A. S Spirin",
    //   "topic": "Biology",
    //   "md5": "C2242AB0CDD631EEAC1DD6C31F6492D0",
    //   "coverurl": "0\/c2242ab0cdd631eeac1dd6c31f6492d0.jpg"
    // }, {
    //   "title": "Dictionary of Biochemistry and Molecular Biology",
    //   "author": "J. Stenesh",
    //   "topic": "Biology\\\\Molecular",
    //   "md5": "1D13C90B36613C5A30B9D914113D515D",
    //   "coverurl": "0\/1d13c90b36613c5a30b9d914113d515d-d.jpg"
    // }, {
    //   "title": "Experimental Biochemistry",
    //   "author": "Robert L. Switzer, Liam F. Garrity",
    //   "topic": "Biology\\\\Biochemistry",
    //   "md5": "CCA2E0312D21BAD591A89F1502FA55D1",
    //   "coverurl": "0\/cca2e0312d21bad591a89f1502fa55d1-d.jpg"
    // }, {
    //   "title": "Anatomie, Biologie, Physiologie - Lehrbuch und Atlas",
    //   "author": "Trebsdorf M.",
    //   "topic": "Biology",
    //   "md5": "1A7B7F24DE84FC6E241E2FCF073A12AF",
    //   "coverurl": "0\/1a7b7f24de84fc6e241e2fcf073a12af.jpg"
    // }, {
    //   "title": "Anatomie, Biologie, Physiologie. Lehrbuch und Atlas",
    //   "author": "Trebsdorf M.",
    //   "topic": "Biology",
    //   "md5": "E390BD02816553D8B39EA77EC772BC84",
    //   "coverurl": "0\/e390bd02816553d8b39ea77ec772bc84.jpg"
    // }, {
    //   "title": "Hausaufgaben computer algebra 1",
    //   "author": "von zur Gathen.",
    //   "topic": "Mathematics\\\\Computer Algebra",
    //   "md5": "C2A0F4A8117C8854A4FC56F69F958DE7",
    //   "coverurl": ""
    // }];
    this.listEbooks();
   
    //this.save();
    
  }

  listEbooks(){
this.items$
  .subscribe(actions => {
    actions.forEach(action => {
     // console.log(action.title);
     this.result.push(action);
     
    });
    this.computePagination();
  this.loadPage(this.currentPage);
  });
  
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

  save(){
    //const relative = this.db.object('ebooks').valueChanges();
    const itemRef = this.db.object('ebooks');
    itemRef.set(this.result);
  }
  updateBooksList() {
    this.books = [];
    let total_pages = Math.ceil(this.totalBooks / this.no_books_page);

    for (let i = (this.currentPage * this.no_books_page - this.no_books_page); i < (this.currentPage * this.no_books_page) && (i < this.totalBooks); i++) {
      this.books.push(this.result[i]);
    }
  }
  ngOnInit() {

  }

}
