class Library {
    constructor() {
        this._myLibrary = [];
    }

    get myLibrary() {
        return this._myLibrary;
    }

    size() {
        return this._myLibrary.length;
    }

    getBook(i) {
        return this._myLibrary[i];
    }

    addBook(book) {
        this._myLibrary.push(book);
    }

    delBook(i) {
        this._myLibrary.splice(i, 1);
    }

    toggleRead(i) {
        this._myLibrary[i].read = !this._myLibrary[i].read;
    }

    isExist(book) {
        for (let b of this._myLibrary) {
            if (b.equals(book)) {
                return true;
            }
        }
        return false;
    }
}

class Book {
    constructor(title, author, pages) {
        this.title = title.trim();
        this.author = author.trim();
        this.pages = pages;
        this.read = false;
    }

    equals(other) {
        return this.title.toLowerCase() === other.title.toLowerCase()
            && this.author.toLowerCase() === other.author.toLowerCase()
            && this.pages === other.pages
    }
}

class LibraryController {
    constructor(library) {
        this.library = library;
    }

    render() {
        let info = document.getElementById("empty-table");
        let tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        if (this.library.size() === 0) {
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

        for (let i = 0; i < this.library.size(); i++) {
            let book = this.library.getBook(i);

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
            input.addEventListener("click", () => this.toggleRead(i));
            let tdRead = document.createElement("td");
            tdRead.appendChild(input);

            let btn = document.createElement("button");
            btn.type = "button";
            btn.id = `del-${i}`;
            btn.textContent = "Delete";
            btn.addEventListener("click", () => this.delBook(i));
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
        }
    }

    addBook() {
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        if (!title || !author || isNaN(pages)) {
            alert("Can't add this book, please check your input.");
            return;
        }
        pages = parseInt(pages, 10);
        if (pages <= 0) {
            alert("Can't add this book, please check your input.");
            return;
        }
        let book = new Book(title, author, pages);
        if (this.library.isExist(book)) {
            alert("The book already exists, cannot add it twice.");
            return;
        }
        this.library.addBook(book);
        this.render();
    }

    delBook(i) {
        this.library.delBook(i);
        this.render();
    }

    toggleRead(i) {
        this.library.toggleRead(i);
        this.render();
    }
}

let controller = new LibraryController(new Library());

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    controller.addBook();
})

controller.render();