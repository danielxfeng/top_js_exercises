const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages) {
    let book = new Book(title, author, pages, false);
    myLibrary.push(book);
    showLibrary();
}

function toggleRead(i) {
    myLibrary[i].read = !(myLibrary[i].read);
    showLibrary();
}

function delBook(i) {
    myLibrary.splice(i, 1);
    showLibrary();
}

function showLibrary() {
    let info = document.getElementById("empty-table");
    if (myLibrary.length === 0) {
        if (!info) {
            let info = document.createElement("p");
            info.id = "empty-table";
            info.textContent = "The table is empty, please add new books first.";
            let table = document.getElementById("table");
            table.append(info);
        }
        info.hidden = false;
        return;
    }
    if (info) {
        info.hidden = true;
    }

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    myLibrary.forEach((book, i) => {
        let tdIdx = document.createElement("td");
        tdIdx.textContent = i;

        let tdTitle = document.createElement("td");
        tdTitle.textContent = book.title;

        let tdAuthor = document.createElement("td");
        tdAuthor.textContent = book.author;

        let tdPages = document.createElement("td");
        tdPages.textContent = book.pages;

        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = book.read;
        input.id = `checked-${i}`;
        input.addEventListener("click", ()=>toggleRead(i));
        let tdRead = document.createElement("td");
        tdRead.appendChild(input);

        let btn = document.createElement("button");
        btn.type = "button";
        btn.id = `del-${i}`;
        btn.textContent = "Delete";
        btn.addEventListener("click", ()=>delBook(i));
        let tdDel = document.createElement("td");
        tdDel.appendChild(btn);

        let row = document.createElement("tr");
        row.appendChild(tdIdx);
        row.appendChild(tdTitle);
        row.appendChild(tdAuthor);
        row.appendChild(tdPages);
        row.appendChild(tdRead);
        row.appendChild(tdDel);

        tbody.appendChild(row);
    })
}

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    if (!title || !author || !pages) {
        alert("Can't add this book, please check your input.");
        return;
    }
    for (let book of myLibrary) {
        if (book.title === title && book.author === author && book.pages === pages) {
            alert("The book already exists, cannot add it twice.");
            return;
        }
    }
    addBookToLibrary(title, author, pages);
})

showLibrary();