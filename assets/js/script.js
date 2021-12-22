// GLOBAL VARIABLES
// Declare input variable
var inputEl = document.getElementById('search');
// Declare the datalist
var datalistEl = document.getElementById('watch');
// Declare the container that holds the actor information
var actorEl = document.getElementById('actor-section');
// Declare the actor title
var actorTitleEl = document.getElementById('actor-title');
// Declare the paragraph for actor information
var actorInfoEl = document.getElementById('actor-results');
// Declare the unordered list to list the movies/shows the actor is known for
var knownForEl = document.getElementById('known-for');
// Declare error messages container
var errorEl = document.getElementById('error');
// Declare button
var buttonEL = document.getElementById('searchBtn');


// API CALLS START
//IMBD API
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_ncae1kix/' + name;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (name) {
          getActorId(name);
        });
      } else {
        invalidInput();
      }
    })
    .catch(function (error) {
      connectIssue();
    });
};

var getMovieSearch = function (search) {
  console.log(search);
  var movieUrl = 'https://imdb-api.com/en/API/SearchMovie/k_4724e504/' + search;
  fetch(movieUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (search) {
          getMovieId(search);
          searchMovie(search);
        });
      } else {
        invalidInput();
      }
    })
    .catch(function (error) {
      connectIssue();
    });
};


// API CALLS END

//search movies
// function searchMovie(query) {
//   const url = `https://imdb-api.com/en/API/SearchMovie/k_xqqyxw1f?q=${query}`;
//   console.log(url);
//   fetch(url)
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((jsonData) => {
//       console.log(jsonData, 'Json');
//       var htmlCode = '';
//       for (let i = 0; i < jsonData.length; i++) {
//         // jsonData.forEach(element => {
//         let element = jsonData[i];
//         console.log(element);
//         htmlCode += `<div class="card">
//         <div class="card-image">
//           <figure class="image is-4by3">
//             <img src="${element.show.image.medium}" alt="placeholder image">
//           </figure>
//         </div>
//         <div class="card-content">
//           <div class="media">
//             <div class="media-content">
//               <p class="title is-4">${element.show.name}</p>
//               <p class="subtitle is-6">${element.show.rating.average}</p>
//             </div>
//           </div>
//           <div class="content">
//             ${element.show.summary}
//             <a href="${element.show.officialSite}">Offical Site</a>
//             <br>
//             <time>${element.show.schedule.time}</time>
//           </div>
//         </div>
//       </div>`;
//       }
//       console.log(htmlCode);
//       // const list = document.getElementById("resultsList")
//       // list.innerHTML = htmlCode;
//       document.getElementById('movieResults').innerHTML = htmlCode;
//       // renderResults(results);
//     });
// }

// ERROR MESSAGES
// Function for invalid or improper inputs
var invalidInput = function () {
  errorEl.textContent = 'Actor not found.';
  errorEl.style.color = 'red';
};

// Function if you are unable to connect
var connectIssue = function () {
  errorEl.textContent = 'Unable to connect.';
  errorEl.style.color = 'red';
};

// POPULATING ELEMENTS
// Function to get the actors id
var getActorId = function (name) {
  // define the actors array
  var actors = name.results;
  // get the actors id
  var actorId = actors[0].id;
  // call the actorInfo function
  actorInfo(actorId);
};

// populate movie section
var getMovieId = function (search) {
  // define the movie array
  var movies = search.results;
  // get the movies id
  var movieId = movies[0].id;
  // call the movieInfo function
  actorInfo(movieId);
};

// Call a new fetch function to get actor information
var actorInfo = function (actorId) {
  // Call api for actor information
  var apiUrl = 'https://imdb-api.com/en/API/Name/k_ncae1kix/' + actorId;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (actorId) {
          showActorOption(actorId);
          showActorInfo(actorId);
        });
      } else {
        invalidInput();
      }
    })
    .catch(function (error) {
      connectIssue();
    });
};

// Function to populate the datalist
var showActorOption = function (actorId) {
  console.log(actorId);
  // define the actors name
  var actor = actorId.name;
  var input = inputEl.value;

  // if an actor matches the input
  if (actor === input) {
    // create the option element
    var actorOption = document.createElement('option');
    // Add the actor
    actorOption.innerHTML = input;
    datalistEl.append(actorOption);
  }
};

// Function to display the actors information
var showActorInfo = function (actorId) {
  // clear old content
  actorEl.innerHTML = '';
  // clear list item elements
  knownForEl.innerHTML = '';

  // define the actor's name
  var actorName = actorId.name;
  var birthDate = actorId.birthDate;
  var deathDate = actorId.deathDate;
  var awards = actorId.awards;

  // set the text content for the title
  actorTitleEl.innerHTML =
    'Top Movie and Shows for ' +
    '<b>' +
    actorName +
    '</b>' +
    '. ' +
    '(Born: ' +
    birthDate +
    ' - Died: ' +
    deathDate +
    ')';
  // append title to the actor container
  actorEl.appendChild(actorTitleEl);

  // create an image element
  var actorImage = document.createElement('img');
  // set the source of the image
  actorImage.setAttribute('src', actorId.image + '@2x.png');
  actorImage.classList.add('actor-image');
  // append image to the actor container
  actorEl.appendChild(actorImage);

  // Make a container to hold the actor information
  var actorBioEl = document.createElement('div');

  // define the actors known for array
  var knownFor = actorId.knownFor;
  // For loop to show all the movies/shows the actor is known for
  for (var i = 0; i < knownFor.length; i++) {
    // iterate through the knownFor array
    knownForArr = knownFor[i];
    // Make a list item element for the movies/shows the actor is known for
    var knownforList = document.createElement('li');
    // set the text content of the list item
    knownforList.textContent = knownForArr.fullTitle;
    // style the list item
    knownforList.classList.add('known-list');
    // append the list item to the unordered list
    knownForEl.appendChild(knownforList);
  }
  // append the unordered list to the actorBio container
  actorBioEl.appendChild(knownForEl);

  // make a span element to show the awards the actor has recieved
  var actorAwardsEl = document.createElement('div');
  // set the text content to the awards variable
  actorAwardsEl.textContent = awards;
  // append the awards section to the information container
  actorAwardsEl.appendChild(actorBioEl);

  // append information to the actor container
  actorEl.append(actorBioEl);
};


// Function to display the actors information
var showMovieInfo = function (movieId) {
  
};


// EVENT LISTENERS
// button to capture name type into input, set to name vaiable and then running the getNameSearch() and searchShow() functions
buttonEL.addEventListener('click', function (event) {
  // prevent page refresh
  event.preventDefault();
  // set name value
  var name = inputEl.value.trim();
  // run getNameSearch() and searchShow() function
  if (name.length > 0) {
    getNameSearch(name);
    searchShow(name);
    getMovieSearch(name);
    localStorage.setItem("search-result", JSON.stringify(name));
  } else {
    invalidInput();
  }
});
var myImage = document.querySelector('img');

// FETCHING SHOW DATA
function searchShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  console.log(url);
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData, 'Json');
      var htmlCode = '';
      for (let i = 0; i < jsonData.length; i++) {
        // jsonData.forEach(element => {
        let element = jsonData[i];
        console.log(element);
        htmlCode += `<div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.show.image.medium}" alt="placeholder image" />
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
            <br />
            <time>${element.show.schedule.time}</time>
          </div>
        </div>
      </div>`;
      }
      console.log(htmlCode);
      // const list = document.getElementById("resultsList")
      // list.innerHTML = htmlCode;
      document.getElementById('resultsList').innerHTML = htmlCode;
      // renderResults(results);
    });
}
// MAKES LIST OF SHOWS APPEAR ON SITE
function renderResults(results) {
  results.forEach((result) => {
    const element = document.createElement('li');
    element.innerHTML = result;
    list.appendChild(element);
  });
}
