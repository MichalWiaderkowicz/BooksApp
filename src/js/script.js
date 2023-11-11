/* eslint-disable indent */
{
  'use strict';
  
  class BookList {
    constructor(){
      const thisBookList = this;

      this.bookList.initData();
      this.bookList.getElements();
      this.bookList.render(thisBookList.library);
      this.bookList.initActions();
    }
  

    initData(){
      const thisBookList = this;
      thisBookList.data = dataSource;
    }
  
    getElements(){
      const thisBookList = this;
    
      thisBookList.dom = {};
      /* Prepare a reference */
      thisBookList.dom.template = document.querySelector('#template-book');
      thisBookList.dom.booksList = document.querySelector('.books-list');
      thisBookList.dom.formFilters = document.querySelector('.filters');
      thisBookList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      thisBookList.library = dataSource.books;

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }

    initActions(){
      const thisBookList = this;
  
      thisBookList.dom.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
  
        /* make a reference to the DOM element link */
        const clickedElement = event.target.offsetParent;
        const book = clickedElement;
        /* will get the book's ID from its data-id */
        const booksId = book.getAttribute('data-id');
          
        const checkBooksClass = book.getAttribute('class');
        /* whether the clicked element has the .book__image class? */
        if(book.classList.contains('book__image')){
          if(checkBooksClass != 'book__image favorite'){
            /* will add the favorite class to the clicked element */
            book.classList.add('favorite');
            /* and will add this ID to favoriteBooks */
            thisBookList.favoriteBooks.push(booksId);
          } else {
            /* will remove the favorite class to the clicked element */
            book.classList.remove('favorite');
            /* get the index of clicked element form favoriteBooks */
            const booksIdIndex = thisBookList.favoriteBooks.indexOf(booksId);
            /*remove index from favoriteBooks */
            thisBookList.favoriteBooks.splice(booksIdIndex, 1);
          }
        }
      });
  
      thisBookList.dom.formFilters.addEventListener('click', function(event){
        const clickedElement = event.target;
        /*!!!The tagName property returns the tag name in UPPERCASE!!! */
        if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
        /* check what the console shows after selecting the option */
          const checkOption = clickedElement.value;
          /* check if the selected option is true */
          if(clickedElement.checked == true) {
            /* add to filtres */
            thisBookList.filters.push(checkOption);
          } else {
            /* get the index of clicked element */
            const checkOptionIndex = thisBookList.filters. indexOf(checkOption);
            /* remove this index from filters array */
            thisBookList.filters.splice(checkOptionIndex, 1);
          }
          thisBookList.filterBooks();
        }
      });
    }
    
    render(book){
        const thisBookList = this;
  
        for(let data of book){ 
          const ratingBgc = thisBookList.determineRatingBgc(data.rating);
    
          const ratingPercentage = data.rating * 10;
          const ratingWidth = ratingPercentage.toString();
    
          data.ratingBgc = ratingBgc;
          data.ratingWidth = ratingWidth;
    
          /* generating HTML code based on the template and data about a specific book. */
          const generatedHTML = thisBookList.template(data);
          //console.log('generatedHTML:', generatedHTML);
    
          /* Generate a DOM element based on this (LOOK UP) HTML code. */
          const generatedDOM = utils.createDOMFromHTML(generatedHTML);
          //console.log('generatedDOM:', generatedDOM);
    
          /* Append the generated DOM element as a new child DOM to the .books-list */
          thisBookList.dom.booksList.appendChild(generatedDOM);
        }
    }

    filterBooks(){
      const thisBookList = this;
      for(const book of dataSource.books) {
        const informationAboutTheBook = book.details;
        const idOfTheBook = book.id;
        let shouldBeHidden = false;
  
        for(const filter of thisBookList.filters){
          if(!informationAboutTheBook[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const selectHiddenBook = '.book__image[data-id="'+ idOfTheBook +'"]';
        const hiddenBook = thisBookList.dom.booksList.querySelector(selectHiddenBook);
        if(shouldBeHidden== true) {
          hiddenBook.classList.add('hidden');
        } else {
          hiddenBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
        if(rating < 6) {
          return 'linear-gradient(to bottom, #f15536 0%, #f1a936 100%)';
        }
        if(rating > 6 && rating <= 8) {
          return 'linear-gradient(to bottom, #f1b936 0%, #eef136 100%)';
        }
        if(rating > 8 && rating <= 9) {
          return 'linear-gradient(to bottom, #def136 0%, #c5f136 100%)';
        }
        if (rating > 9) {
          return 'linear-gradient(to bottom, #b6f136 0%, #74f136 100%)';
        }
      }

  }
  const app = new BookList();

  app;


}