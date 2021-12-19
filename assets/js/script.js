
var buttonEl = document.getElementById('submitBtn');
var searchInputEl = document.getElementById('search');


// FETCHING DATA
function searchShow(query) {
  const url = `http://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url)
  .then(response => response.json())
  .then((jsonData) => {
    const results = jsonData.map(element => element.show.name);
    renderResults(results);
  })
};

// MAKES LIST OF SHOWS APPEAR ON SITE
function renderResults(results) {
  const list = document.getElementById("resultsList")
  list.innerHTML = "";
  results.forEach(result => {
    const element = document.createElement("li");
    element.innerText = result;
    list.appendChild(element);
  })
};

// SEARCH BOX
window.onload = () => {
  const searchFieldElement = document.getElementById("search");
  searchFieldElement.onkeyup = (event) => {

    if (searchFieldElement.value.trim().length === 0) {
      return; 
    }

    searchShow(searchFieldElement.value);
  }
};

//button submission function
var searchForActor = function(actorName){
  console.log(actorName);
};
//get value from searchInputEl
buttonEl.addEventListener('submit', function(event){
  var actorName = searchInputEl.value.trim();
  searchForActor(actorName);
  });

