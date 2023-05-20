//create a list to store our books in

let library = [];
// Create a book constructor function to instantiate new book objects containing relevant information about a book
//put the book constructor inside another function to create a closure so each time a new book is created we increment book count variable and give each book a unique ID
function bookCreator() {
  let bookCount = 0;
  return function (title, author, description, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.numberOfPages = numberOfPages;
    this.read = read;
    bookCount++;
    //give each book a unique id once it was created , need to test if this works as intended first

    this.id = bookCount;
  };
}

let Book = bookCreator();

Book.prototype.createBookElement = function () {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book-card");
  //This is so we can associate the DOM element of the book with the book in the library list
  bookElement.dataset.id = this.id;
  //create the elements inside the book card that are going to contain the information
  const title = document.createElement("h2");
  const author = document.createElement("p");
  const description = document.createElement("p");
  const numberOfPages = document.createElement("p");

  title.innerText = this.title;
  author.innerText = this.author;
  description.innerText = this.description;
  numberOfPages.innerText = this.numberOfPages;

  //add the created elements as children to the bookElement

  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(description);
  bookElement.appendChild(numberOfPages);

  //add a toggle button for the read state of the book

  return bookElement;
};

let book1 = new Book(
  "example-title",
  "example-author",
  "example-description",
  40,
  false
);

console.log(book1.id);

let book2 = new Book(
  "example-title2",
  "example-author2",
  "example-description2",
  40,
  false
);

library.push(book1, book2);

const appContainer = document.querySelector(".app-container");

//loop the library list and create a book element and append it to the app container div
library.map((book) => appContainer.appendChild(book.createBookElement()));
