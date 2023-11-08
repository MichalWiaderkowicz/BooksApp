{
  'use strict';

  const thisApp = this;
    
  thisApp.data = dataSource;
  const getElem = {};

  //console.log('thisApp: window?', thisApp);

  getElem.dom = {};

  /* Prepare a reference to the template and the .books-list. */
  getElem.dom.template = document.querySelector('#template-book');
  getElem.dom.booksList = document.querySelector('.books-list');

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  //console.log('template:', template);

  const library = dataSource.books;
  //console.log('library:', library);

  /* Add a new render function */
  const render = function(book) {
    /* START LOOP AND step through each item from dataSource.books */
    for(let data of book){ 
      //console.log('data', data);

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

  const initActions = function() {

    /* Prepare a reference to the list of all .book__image elements in the .booksList */
    const books = getElem.dom.booksList.querySelectorAll('li .book__image');
    console.log('books:', books);
    /**= go through each item on this list */
    for(let book of books){
      /* For each of them, add a listener that, when detected, will trigger a function that... */
      book.addEventListener('dblclick', function(event){
        /* ...will stop the browser's default behavior (preventDefault) */
        event.preventDefault();
        /* will add the favorite class to the clicked element */
        book.classList.add('favorite');
        /* will get the book's ID from its data-id */
        const booksId = book.getAttribute('data-id');
        console.log('bookId:', booksId);
        /* and will add this ID to favoriteBooks */
        favoriteBooks.push(booksId);
        console.log('favoriteBooks:', favoriteBooks);
      });
    }

  };

  initActions();

}