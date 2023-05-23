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

const booksContainer = document.querySelector(".books-container");

//loop the library list and create a book element and append it to the book container div
function renderLibrary() {
  //empty out the book container div before filling it up again
  booksContainer.innerHTML = "";

  library.map((book) => booksContainer.appendChild(book.createBookElement()));
}
//initial rendering of the library
renderLibrary();

// create a button : once clicked display a modal for the user to add a new book
const addBookButton = document.querySelector(".add-book-button");
const closeDialogue = document.getElementById("close-dialogue");
const dialogue = document.getElementById("add-book-dialogue");

addBookButton.addEventListener("click", () => {
  dialogue.showModal();
});

closeDialogue.addEventListener("click", () => {
  dialogue.close();
});

//select the button responsible for submitting a new book

const submitNewBook = document.getElementById("submit-new-book");

submitNewBook.addEventListener("click", (e) => {
  e.preventDefault();

  //select the different input fields

  const titleField = document.getElementById("title");
  const authorField = document.getElementById("author");
  const descriptionField = document.getElementById("description");
  const numberOfPagesField = document.getElementById("number-of-pages");
  const readField = document.getElementById("read");

  let newBook = new Book(
    titleField.value,
    authorField.value,
    descriptionField.value,
    numberOfPagesField.value,
    readField.checked
  );

  library.push(newBook);
  //rerender the available books in the library on each modification
  renderLibrary();
});
