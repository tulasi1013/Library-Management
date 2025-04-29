let searchinputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let Resultcontainer = document.getElementById("searchResults");
let rowcontainer;

function result(item) {
    let {
        imageLink,
        author
    } = item;

    let container = document.createElement("div");
    container.classList.add("container1", "col-6");
    rowcontainer.appendChild(container);
    let imageEl = document.createElement("img");
    imageEl.src = imageLink;
    imageEl.classList.add("img")
    container.appendChild(imageEl);
    let autorEl = document.createElement("p");
    autorEl.textContent = author;
    autorEl.classList.add("autor");
    container.appendChild(autorEl);
}

function data(search_results) {
    spinnerEl.classList.add("d-none");
    let para = document.createElement("p");
    Resultcontainer.appendChild(para);
    if (search_results.length === 0) {

        para.textContent = "No results found";
        para.classList.add("para");
    } else {
        para.textContent = "Popular Books";
        para.classList.remove("para");
        para.classList.add("para1");
        rowcontainer = document.createElement("div");
        rowcontainer.classList.add("row");
        Resultcontainer.appendChild(rowcontainer);
        for (let item of search_results) {
            result(item);

        }
    }
}

function search(searchvalue) {
    let url = "https://apis.ccbp.in/book-store?title=" + searchvalue;
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            data(search_results);
        });
}







searchinputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        Resultcontainer.textContent = "";

        let searchvalue = searchinputEl.value
        search(searchvalue);
    }
})