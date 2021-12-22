/* GLOBAL VARIABLES START */
// Declare input element
var inputEl = document.getElementById('search');
// Declare the datalist
var datalistEl = document.getElementById('watch');
// Declare the container that holds the actor information
var actorEl = document.getElementById('actor-section');
// Declare the actor subtitle
var actorSubtitleEl = document.getElementById('actor-subtitle');
// Declare the unordered list to list the movies/shows the actor is known for
var knownForEl = document.getElementById('known-for');
// Declare error messages container
var errorEl = document.getElementById('error');
// Declare button
var buttonEL = document.getElementById('searchBtn');
/* GLOBAL VARIABLES END */

/* SHOW SECTION START */
function searchShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      var htmlCode = '';
      for (let i = 0; i < jsonData.length; i++) {
        // jsonData.forEach(element => {
        let element = jsonData[i];
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
/* SHOW SECTION ENDS */ 

/* ACTOR SECTION START */
// Imbd API call to get actor id. Note: name parameter is defined as the input value
// (Original key: k_vc5wkpr4)
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_t2dr26vg/' + name;

  fetch(apiUrl)
    .then(function (response) {
      // if response is good, run the getActorId function
      if (response.ok) {
        response.json().then(function (name) {
          getActorId(name);
        });
      } else {
        // otherwise run invalid input
        invalidInput();
      }
    })
    // runs if there is a connection issue
    .catch(function (error) {
      connectIssue();
    });
};

// Check if there is an actors id
var getActorId = function (name) {
  // define the actors array
  var actors = name.results;
  // check for the actors id
  var actorId = actors[0].id;
  // if there is an actor id
  if (actorId) {
    // call the actorInfo function
    actorInfo(actorId);
  } else {
    invalidInput();
  }
};

// Call a new fetch function to get actor information
var actorInfo = function (actorId) {
  // call api for actor information
  var apiUrl = 'https://imdb-api.com/en/API/Name/k_t2dr26vg/' + actorId;

  fetch(apiUrl)
    .then(function (response) {
      // if there is a valid input
      if (response.ok) {
        // convert to json and run the showActorOption and showActorInfo functions
        response.json().then(function (actorId) {
          showActorOption(actorId);
          showActorInfo(actorId);
        });
      }
    })
    // Runs if there is a connection issue
    .catch(function (error) {
      connectIssue();
    });
};

// Function to populate the datalist
var showActorOption = function (actorId) {
  // define the actors name and input values
  var actor = actorId.name;
  var input = inputEl.value;

  // if an actor name matches the input
  if (actor === input) {
    // create the option element
    var actorOption = document.createElement('option');
    // add the actor from the input
    actorOption.innerHTML = input;
    // append the option to the datalist
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

  // set the text content for the subtitle
  actorSubtitleEl.innerHTML =
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
  actorEl.appendChild(actorSubtitleEl);

  // create an image element
  var actorImage = document.createElement('img');
  // set the source of the image
  actorImage.setAttribute('src', actorId.image + '@2x.png');
  actorImage.classList.add('actor-image');
  // append image to the actor container
  actorEl.appendChild(actorImage);

  // Make a container to hold the actor information
  var actorBioEl = document.createElement('div');

  // define the actors known for array for top 4 movies/shows
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

  // append information to the actor container
  actorEl.append(actorBioEl);
};
/* ACTOR SECTION ENDS */

/* ERROR MESSAGES START */
// Function for invalid or improper inputs
var invalidInput = function () {
  // clear old content
  actorEl.innerHTML = '';
  // clear list item elements
  knownForEl.innerHTML = '';
  // clear image
  actorImage.innerHTML = '';
};

// Function if you are unable to connect
var connectIssue = function () {
  errorEl.textContent = 'Unable to connect.';
  errorEl.style.color = 'red';
};

/* ERROR MESSAGES END */

/* EVENT LISTENERS START */
// Button to capture name type into input, set to name vaiable and then running the getNameSearch() and searchShow() functions
buttonEL.addEventListener('click', function (event) {
  // prevent page refresh
  event.preventDefault();

  // set name value
  var name = inputEl.value.trim();

  // If there is a name inputted 
  if (name.length > 0) {
    // run getNameSearch() and searchShow() function
    getNameSearch(name);
    searchShow(name);

    // save item to local storage
    localStorage.setItem('search-result', JSON.stringify(name));
  } else {
    invalidInput();
  }
});
/* EVENT LISTENERS END */