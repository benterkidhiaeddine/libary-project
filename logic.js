const booksContainer = document.querySelector(".books-container");

//the button responsible for adding new books
const addBookButton = document.querySelector(".add-book-button");
//modal element and buttons
const closeDialogue = document.getElementById("close-dialogue");
const dialogue = document.getElementById("add-book-dialogue");

//select the different input fields inside the modal

const titleField = document.getElementById("title");
const authorField = document.getElementById("author");
const descriptionField = document.getElementById("description");
const numberOfPagesField = document.getElementById("number-of-pages");
const readField = document.getElementById("read");
const bookIdField = document.getElementById("book-id-field");

//select the button inside the modal responsible for submitting a new book

const submitNewBook = document.getElementById("submit-new-book");

//select the button inside the modal responsible for confirming changes

const confirmBookChange = document.getElementById("confirm-book-edit");

//create a list to store our books in

let library = [];
// Create a book constructor function to instantiate new book objects containing relevant information about a book
//put the book constructor inside another function to create a closure so each time a new book is created we increment book count variable and give each book a unique ID
function bookCreator() {
  let bookCount = -1;
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

  title.innerText = `Title : ${this.title}`;
  author.innerText = `Author : ${this.author}`;
  description.innerText = `Description : ${this.description}`;
  numberOfPages.innerText = `Pages : ${this.numberOfPages}`;

  //add the created elements as children to the bookElement

  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(description);
  bookElement.appendChild(numberOfPages);

  //add a toggle button for the read state of the book
  const readToggleButton = document.createElement("input");
  readToggleButton.checked = this.read;
  readToggleButton.type = "checkbox";
  readToggleButton.id = `read-toggle-${this.id}`;
  readToggleButton.name = `read-toggle-${this.id}`;

  //when the check box state is changed change the read property on the book element

  readToggleButton.addEventListener("change", () => {
    library[this.id].read = readToggleButton.checked;
  });

  const readToggleLabel = document.createElement("label");
  readToggleLabel.innerText = "Already read";
  readToggleLabel.htmlFor = `read-toggle-${this.id}`;

  bookElement.appendChild(readToggleLabel);
  bookElement.appendChild(readToggleButton);

  //add a button to edit the contents of the book card

  const editBookButton = document.createElement("button");

  editBookButton.innerText = "Edit";
  editBookButton.id = `edit-book-${this.id}`;

  //functionality when the edit book button is clicked
  editBookButton.addEventListener("click", () => {
    //change the dialogue first p tag to correspond to editing a book and not adding a new one
    dialogue.querySelector("p").innerText =
      "Enter the information you want to change about this book";

    //hide the submit-new-book button and replace it with confirm-edit button

    //show edit button and hide add new button
    confirmBookChange.style.display = "block";
    submitNewBook.style.display = "none";

    //put in the input field the information that is already in the book card
    titleField.value = this.title;
    authorField.value = this.author;
    descriptionField.value = this.description;
    numberOfPagesField.value = this.numberOfPages;
    readField.checked = this.read;
    bookIdField.value = this.id;
    dialogue.showModal();
  });

  bookElement.appendChild(editBookButton);

  //create a remove book button

  const removeBookButton = document.createElement("button");
  removeBookButton.innerText = "Remove";
  //classes for this button for styling
  removeBookButton.classList.add("remove-book-button");

  //functionality for the remove book button
  removeBookButton.addEventListener("click", () => {
    library[this.id] = undefined;
    renderLibrary();
  });

  bookElement.appendChild(removeBookButton);

  return bookElement;
};

let book1 = new Book(
  "example-title",
  "example-author",
  "example-description",
  40,
  false
);

let book2 = new Book(
  "example-title2",
  "example-author2",
  "example-description2",
  40,
  false
);

library.push(book1, book2);

//loop the library list and create a book element and append it to the book container div
function renderLibrary() {
  //empty out the book container div before filling it up again
  booksContainer.innerHTML = "";

  library
    .filter((book) => book !== undefined)
    .map((book) => booksContainer.appendChild(book.createBookElement()));
}
//initial rendering of the library
renderLibrary();

addBookButton.addEventListener("click", () => {
  //show add button and hide edit button
  confirmBookChange.style.display = "none";
  submitNewBook.style.display = "block";

  //make sure the input fields are empty when we are adding a new book
  titleField.value = "";
  authorField.value = "";
  descriptionField.value = "";
  numberOfPagesField.value = "";
  readField.checked = "";

  dialogue.showModal();
});

//closing the modal functionality
closeDialogue.addEventListener("click", () => {
  dialogue.close();
});

submitNewBook.addEventListener("click", (e) => {
  e.preventDefault();

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
  //close modal
  dialogue.close();
});

//confirm edit  book functionality
confirmBookChange.addEventListener("click", (e) => {
  //so the page dosen't refresh when we confirm the changes
  e.preventDefault();
  //make the changes according to the entered values
  library[bookIdField.value].title = titleField.value;
  library[bookIdField.value].author = authorField.value;
  library[bookIdField.value].description = descriptionField.value;
  library[bookIdField.value].numberOfPages = numberOfPagesField.value;
  library[bookIdField.value].read = readField.checked;

  //render the library
  renderLibrary();
  //close modal
  dialogue.close();
});
