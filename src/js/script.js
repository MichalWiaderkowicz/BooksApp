{
  'use strict';

  const thisApp = this;
    
  thisApp.data = dataSource;
  const getElem = {};

  console.log('thisApp: window?', thisApp);

  /* Prepare a reference to the template and the .books-list. */
  getElem.dom = {};

  getElem.dom.template = document.querySelector('#template-book');
  getElem.dom.booksList = document.querySelector('.books-list');

  console.log('element DOM Szablon:', getElem.dom.template);
  console.log('element DOM .book-list:', getElem.dom.booksList);


}