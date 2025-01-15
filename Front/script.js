// Base URL for REST API
const API_URL = "http://localhost:8080/api";

const books = [
  {
    id: 1,
    title: "Book A",
    author: "Author 1",
    category: "Category X",
    description: "Description of Book A.",
  },
  {
    id: 2,
    title: "Book B",
    author: "Author 2",
    category: "Category Y",
    description: "Description of Book B.",
  },
  {
    id: 3,
    title: "Book C",
    author: "Author 3",
    category: "Category Z",
    description: "Description of Book C.",
  },
];

const authors = [
  { id: 1, name: "Author 1" },
  { id: 2, name: "Author 2" },
  { id: 3, name: "Author 3" },
];

const categories = [
  { id: 1, name: "Category X" },
  { id: 2, name: "Category Y" },
  { id: 3, name: "Category Z" },
];

const contentDiv = document.getElementById("content");

// Display a list of items
function displayList(items, type) {
  contentDiv.innerHTML =
    "<ul>" +
    items
      .map(
        (item) =>
          `<li data-id="${item.id}" data-type="${type}">${
            item.name || item.title
          }</li>`
      )
      .join("") +
    "</ul>";

  const listItems = document.querySelectorAll("li");
  listItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      const itemType = event.target.dataset.type;
      if (itemType === "books") {
        displayBookDetails(id);
      }
    });
  });
}

// Display book details
function displayBookDetails(bookId) {
  const book = books.find((b) => b.id == bookId);
  if (book) {
    contentDiv.innerHTML = `
      <div class="details">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Description:</strong> ${book.description}</p>
        <button onclick="displayList(books, 'books')">Back to Books</button>
      </div>
    `;
  }
}

// Event listeners for buttons
document
  .getElementById("showBooks")
  .addEventListener("click", () => displayList(books, "books"));
document
  .getElementById("showAuthors")
  .addEventListener("click", () => displayList(authors, "authors"));
document
  .getElementById("showCategories")
  .addEventListener("click", () => displayList(categories, "categories"));
