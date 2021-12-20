var myImage = document.querySelector('img');

// FETCHING DATA
function searchShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  console.log(url)
  fetch(url)
    .then(response => {
      console.log(response)
     return response.json()})
    .then((jsonData) => {
      console.log(jsonData,"Json")
      var htmlCode = ""
      for(let i = 0 ; i < jsonData.length;i++){
      // jsonData.forEach(element => {
        let element = jsonData [i]
        console.log(element)
       htmlCode+= `<div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.show.url}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${element.show.name}</p>
              <p class="subtitle is-6">${element.show.rating.average}</p>
            </div>
          </div>
      
          <div class="content">
            ${element.show.summary}
            <a href="${element.show.officialSite}">Offical Site</a>
            <br>
            <time>${element.show.schedule.time}</time>
          </div>
        </div>
      </div>`
      };
      htmlCode+= "<h4>end</h4>"
      console.log(htmlCode)
      // const list = document.getElementById("resultsList")
      // list.innerHTML = htmlCode;
      document.getElementById("resultsList").innerHTML = htmlCode
      // renderResults(results);
    })
};

// MAKES LIST OF SHOWS APPEAR ON SITE
function renderResults(results) {
  results.forEach(result => {
    const element = document.createElement("card");
    element.innerText = result;
    list.appendChild(element);
  })
};

// SEARCH BOX
var searchElement = document.getElementById("search-b")
searchElement.addEventListener("click", function (event) {
  event.preventDefault()
  const searchFieldElement = document.getElementById("search");
  if (searchFieldElement.value.trim().length > 0) {
    console.log(searchFieldElement.value)
    searchShow(searchFieldElement.value);
  }
  else { alert("search another show") }

});

// window.onload = () => {
//   const searchFieldElement = document.getElementById("search");
//   searchFieldElement.onkeyup = (event) => {

//     if (searchFieldElement.value.trim().length === 0) {
//       return; 
//     }

//     searchShow(searchFieldElement.value);
//   }
// };




