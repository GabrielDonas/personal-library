//Get elements
let getTitle = document.getElementById("title");
let getAuthor = document.getElementById("author");
let getPages = document.getElementById("pages");
let read = document.getElementById("read");
let addBookButton = document.getElementById("add-book");
let bookContainer = document.getElementById("book-container");

let myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = null;
  }

  readingStatus() {
    this.read = this.read ? false : true;
  }
}

function loadLibrary() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((element, index) => {
    element.id = index;
    let bookInfo = document.createElement("div");
    bookInfo.className = element.read ? "book-finished" : "book";
    bookContainer.appendChild(bookInfo);

    const appendSection = (section, sectionName) => {
      switch (sectionName) {
        case "remove":
          section.innerHTML = sectionName;
          break;
        case "author":
          section.innerHTML = "by " + element[sectionName];
          break;
        case "pages":
          section.innerHTML = element[sectionName] + " pages";
          break;
        default:
          section.innerHTML = element[sectionName];
      }
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
    readCheckBox.checked = element.read ? true : false;
    readCheckBox.addEventListener("click", () => {
      element.readingStatus();
      loadLibrary();
    });

    let removeButton = document.createElement("button");
    appendSection(removeButton, "remove");
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      loadLibrary();
    });
  });
  // reset input values
  getTitle.value = getAuthor.value = getPages.value = "";
  //Update localStorage
  setLocalLibrary();
}

//localStorage
function setLocalLibrary() {
  localStorage.setItem("localLibrary", JSON.stringify(myLibrary));
}

const localLibrary = localStorage.getItem("localLibrary");
if (localLibrary) {
  JSON.parse(localLibrary).forEach((element) => {
    const book = new Book(element.title, element.author, element.pages);
    if (element.read) {
      book.readingStatus();
    }
    myLibrary.push(book);
  });
  loadLibrary();
}

//Add Book Function

function addBookToLibrary() {
  if (!getTitle.value || !getAuthor.value || !getPages.value) {
    alert("Please, fill in all the fields.");
  } else {
    const book = new Book(getTitle.value, getAuthor.value, getPages.value);
    myLibrary.unshift(book);
    loadLibrary();
    console.log(myLibrary);
  }
}

addBookButton.onclick = () => {
  addBookToLibrary();
};
