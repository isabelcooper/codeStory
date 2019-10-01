function loadPage(event, _pageName) {
       event.preventDefault();
       console.log("here")
}

document.getElementById("blocks").addEventListener("click", () => loadPage(event, "blocks"));

