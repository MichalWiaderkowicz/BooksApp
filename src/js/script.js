{
  'use strict';

  const thisApp = this;
    
  thisApp.data = dataSource;
  const getElem = {};

  //console.log('thisApp: window?', thisApp);

  getElem.dom = {};

  /* Prepare a reference */
  getElem.dom.template = document.querySelector('#template-book');
  getElem.dom.booksList = document.querySelector('.books-list');
  getElem.dom.formFilters = document.querySelector('.filters');

  console.log('Filters:', getElem.dom.formFiltres);

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  //console.log('template:', template);

  const library = dataSource.books;
  //console.log('library:', library);


  const determineRatingBgc = function(rating) {
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
  };

  /* Add a new render function */
  const render = function(book) {
    /* START LOOP AND step through each item from dataSource.books */
    for(let data of book){ 
      //console.log('data', data);
      const ratingBgc = determineRatingBgc(data.rating);
      console.log('ratingBgc:', ratingBgc);

      const ratingPercentage = data.rating * 10;
      const ratingWidth = ratingPercentage.toString();
      console.log('ratingWidth:', ratingWidth);

      data.ratingBgc = ratingBgc;
      data.ratingWidth = ratingWidth;

      /* generating HTML code based on the template and data about a specific book. */
      const generatedHTML = template(data);
      //console.log('generatedHTML:', generatedHTML);

      /* Generate a DOM element based on this (LOOK UP) HTML code. */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      //console.log('generatedDOM:', generatedDOM);

      /* Append the generated DOM element as a new child DOM to the .books-list */
      getElem.dom.booksList.appendChild(generatedDOM);
    }
  };

  render(library);


  const favoriteBooks = [];

  const filters = [];


  const filterBooks = function() {
    for(const book of dataSource.books) {
      const informationAboutTheBook = book.details;
      const idOfTheBook = book.id;
      let shouldBeHidden = false;

      for(filter of filters){
        if(!informationAboutTheBook[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const selectHiddenBook = '.book__image[data-id="'+ idOfTheBook +'"]';
      const hiddenBook = getElem.dom.booksList.querySelector(selectHiddenBook);
      if(shouldBeHidden== true) {
        hiddenBook.classList.add('hidden');
      } else {
        hiddenBook.classList.remove('hidden');
      }
    }

  };


  const initActions = function() {

    getElem.dom.booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      /* Prepare a reference to the list of all .book__image elements in the .booksList */
      //const books = getElem.dom.booksList.querySelectorAll('li .book__image');
      //console.log('books:', books);
      /**= go through each item on this list */
      //for(let book of books){
      /* For each of them, add a listener that, when detected, will trigger a function that... */
      //book.addEventListener('dblclick', function(event){
      /* ...will stop the browser's default behavior (preventDefault) */
      //event.preventDefault();
      /* will add the favorite class to the clicked element */
      //book.classList.add('favorite');

      /* make a reference to the DOM element link */
      const clickedElement = event.target.offsetParent;
      const book = clickedElement;
      console.log('clickedElement:', clickedElement);
      /* will get the book's ID from its data-id */
      const booksId = book.getAttribute('data-id');
      console.log('bookId:', booksId);
        
      /* and will add this ID to favoriteBooks */
      //favoriteBooks.push(booksId);
      //console.log('favoriteBooks:', favoriteBooks);
      const checkBooksClass = book.getAttribute('class');
      console.log('checkBooksClass:', checkBooksClass);
      /* whether the clicked element has the .book__image class? */
      if(book.classList.contains('book__image')){
        if(checkBooksClass != 'book__image favorite'){
          /* will add the favorite class to the clicked element */
          book.classList.add('favorite');
          /* and will add this ID to favoriteBooks */
          favoriteBooks.push(booksId);
          console.log('favoriteBooks:', favoriteBooks);
        } else {
          /* will remove the favorite class to the clicked element */
          book.classList.remove('favorite');
          /* get the index of clicked element form favoriteBooks */
          const booksIdIndex = favoriteBooks.indexOf(booksId);
          /*remove index from favoriteBooks */
          favoriteBooks.splice(booksIdIndex, 1);
        }
        console.log('favoriteBooks:', favoriteBooks);
      }
    });

    getElem.dom.formFilters.addEventListener('click', function(event){
      const clickedElement = event.target;
      /*!!!The tagName property returns the tag name in UPPERCASE!!! */
      if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
        /* check what the console shows after selecting the option */
        const checkOption = clickedElement.value;
        console.log('checkOption:', checkOption);
        /* check if the selected option is true */
        if(clickedElement.checked == true) {
          /* add to filtres */
          filters.push(checkOption);
        } else {
          /* get the index of clicked element */
          const checkOptionIndex = filters. indexOf(checkOption);
          /* remove this index from filters array */
          filters.splice(checkOptionIndex, 1);
        }
        console.log('filters:', filters) ; 
        filterBooks();
      }
    });

  };

  

  initActions();

}