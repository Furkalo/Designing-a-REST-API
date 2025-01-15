// Base URL for REST API
const API_URL = "http://localhost:8080/api";

const books = [
  {
    id: 1,
    title: "Book A",
    author: "Author 1",
    category: "Category X",
    description: "This is a description of Book A.",
  },
  {
    id: 2,
    title: "Book B",
    author: "Author 2",
    category: "Category Y",
    description: "This is a description of Book B.",
  },
];
const authors = [
  { id: 1, name: "Author 1", bio: "Author 1 is a famous writer." },
  {
    id: 2,
    name: "Author 2",
    bio: "Author 2 is known for their thrilling novels.",
  },
];
const categories = [
  {
    id: 1,
    name: "Category X",
    description: "Category X includes fiction.",
  },
  {
    id: 2,
    name: "Category Y",
    description: "Category Y includes non-fiction.",
  },
];

const contentDiv = document.getElementById("content");

function displayList(items, type) {
  contentDiv.innerHTML =
    "<ul>" +
    items
      .map(
        (item) =>
          `<li data-id="${item.id}" data-type="${type}">
            <span onclick="displayDetails(${item.id}, '${type}')">${
            item.name || item.title
          }</span>
            <button onclick="deleteItem(${item.id}, '${type}')">Delete</button>
          </li>`
      )
      .join("") +
    "</ul>";
  contentDiv.innerHTML += `
    <button onclick="displayAddForm('${type}')">Add ${type.slice(
    0,
    -1
  )}</button>
  `;
}

function displayDetails(id, type) {
  let item;
  if (type === "books") {
    item = books.find((b) => b.id === id);
    contentDiv.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>Author:</strong> ${item.author}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <button onclick="displayList(books, 'books')">Back to Books</button>
      `;
  } else if (type === "authors") {
    item = authors.find((a) => a.id === id);
    contentDiv.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Bio:</strong> ${item.bio}</p>
        <button onclick="displayList(authors, 'authors')">Back to Authors</button>
      `;
  } else if (type === "categories") {
    item = categories.find((c) => c.id === id);
    contentDiv.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Description:</strong> ${item.description}</p>
        <button onclick="displayList(categories, 'categories')">Back to Categories</button>
      `;
  }
}

function deleteItem(id, type) {
  let list;
  if (type === "books") list = books;
  else if (type === "authors") list = authors;
  else if (type === "categories") list = categories;
  const index = list.findIndex((item) => item.id === id);
  if (index > -1) list.splice(index, 1);
  displayList(list, type);
}

function addItem(item, type) {
  let list;
  if (type === "books") list = books;
  else if (type === "authors") list = authors;
  else if (type === "categories") list = categories;
  list.push({ id: Date.now(), ...item });
  displayList(list, type);
}

function displayAddForm(type) {
  const fields =
    type === "books"
      ? ` 
        <label>Title: <input type="text" id="title" required></label><br>
        <label>Author: <input type="text" id="author" required></label><br>
        <label>Category: <input type="text" id="category" required></label><br>
        <label>Description: <textarea id="description" required></textarea></label><br>
      `
      : `<label>Name: <input type="text" id="name" required></label><br>
           <label>Description: <textarea id="description"></textarea></label><br>`;

  contentDiv.innerHTML = `
    <form id="addForm">
      ${fields}
      <button type="submit">Add</button>
    </form>
    <button onclick="displayList(${type}, '${type}')">Back</button>
  `;

  const form = document.getElementById("addForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (type === "books") {
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;
      addItem({ title, author, category, description }, type);
    } else {
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      addItem({ name, description }, type);
    }
  });
}

document
  .getElementById("showBooks")
  .addEventListener("click", () => displayList(books, "books"));
document
  .getElementById("showAuthors")
  .addEventListener("click", () => displayList(authors, "authors"));
document
  .getElementById("showCategories")
  .addEventListener("click", () => displayList(categories, "categories"));

