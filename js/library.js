//Get elements
let getTitle = document.getElementById("title");
let getAuthor = document.getElementById("author");
let getPages = document.getElementById("pages");
let read = document.getElementById("read");
let addBookButton = document.getElementById("add-book");
let bookContainer = document.getElementById("book-container");

let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = null;
}

Book.prototype.readStatus = function () {
  alert("Hi");
};

function loadLibrary() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((element, index) => {
    element.id = index;
    let bookInfo = document.createElement("div");
    bookInfo.className = "book";
    bookContainer.appendChild(bookInfo);

    const appendSection = (section, sectionName) => {
      section.innerHTML =
        sectionName == "remove" ? sectionName : element[sectionName];
      section.className = sectionName;
      bookInfo.appendChild(section);
    };

    let title = document.createElement("div");
    appendSection(title, "title");
    let author = document.createElement("div");
    appendSection(author, "author");
    let pages = document.createElement("div");
    appendSection(pages, "pages");
    let readCheckBox = document.createElement("input");
    appendSection(readCheckBox, "readCheckBox");
    readCheckBox.type = "checkbox";
    let removeButton = document.createElement("button");
    appendSection(removeButton, "remove");
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      loadLibrary();
    });
  });
}

function addBookToLibrary() {
  const book = new Book(getTitle.value, getAuthor.value, getPages.value);
  myLibrary.push(book);
  loadLibrary();
}

addBookButton.onclick = () => {
  addBookToLibrary();
};

// 3 - read status associate with a prototype
