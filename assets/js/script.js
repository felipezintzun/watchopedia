/* GLOBAL VARIABLES START */
var inputEl = document.getElementById('search');

// Define the select element
var chooseSearch = document.getElementById('choose-search');

// Define the dropdown options
var actorOption = document.getElementById('actor-option');
var movieOption = document.getElementById('movie-option');
var showOption = document.getElementById('tv-show-option');

// Define the movie section
var movieSectionEl = document.getElementById('movie-section');
// Declare the movie title
var movieTitleEl = document.getElementById('movie-title');
var movieResultsEl = document.getElementById('movie-results');
// the movie db api key
var movieDbApi = '40ead071b983da851d42031943eb549a';

// Define the show section
var showSectionEl = document.getElementById('show-section');

// Define the actor section
var actorSectionEl = document.getElementById('actor-section');
// Declare the actor subtitle
var actorTitleEl = document.getElementById('actor-title');
// Declare the container that holds the actor information
var actorImageContainerEl = document.getElementById('actor-img-container');
// Declare the unordered list to list the movies/shows the actor is known for
var knownForEl = document.getElementById('known-for');

// Declare movie error messages container
var errorEl = document.getElementById('error');

// Declare button
var buttonEL = document.getElementById('searchBtn');
/* GLOBAL VARIABLES END */

/* MOVIE SECTION START */
// fetch movie from imdb
var getMovieSearch = function (name) {
  var movieUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    movieDbApi +
    '&language=en-US&query=' +
    name +
    '&page=1&include_adult=false';

  fetch(movieUrl)
    .then(function (response) {
      //if response is good run getMovieId function
      if (response.ok) {
        response.json().then(function (name) {
          showMovieInfo(name);
        });
      } else {
        // otherwise run invalid input
        invalidMovie();
        return;
      }
    })
    //runs if there is a connection issues
    .catch(function () {
      connectIssue();
    });
};

// function to display movie info
var showMovieInfo = function (name) {
    movieSectionEl.classList.remove('hide');
  for (let i = 0; i < 10; i++) {
    let movieInfoDiv = document.createElement('div');
    movieInfoDiv.setAttribute('id', 'movieDiv');
    movieInfoDiv.setAttribute('style', 'width: 350px; color: white; text-align: center');
    movieInfoDiv.setAttribute('class', 'column is-one-fifth is-full-mobile');
    //generates movie posters
    let movieImage = document.createElement('img');
    movieImage.setAttribute('id', name.results[i].title);
    movieImage.setAttribute('alt', name.results[i].title + ': ' + 'Image Not Available');
    movieImage.setAttribute('src','https://image.tmdb.org/t/p/original' + name.results[i].poster_path);
    // displays alt message if no poster available
    if (movieImage.src == 'https://image.tmdb.org/t/p/w342undefined') {
      movieImage.removeAttribute('src', 'https://image.tmdb.org/t/p/w342undefined');
      movieImage.setAttribute('style', 'width: 100%; color: red; font-size: 1.25em');
    }
  movieInfoDiv.append(movieImage);
  movieResultsEl.append(movieInfoDiv);
  movieSectionEl.append(movieResultsEl);
  }
};
/* MOVIE SECTION END */

/* SHOW SECTION START */
function searchShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url).then((response) => {
    if (response.ok) {
      response.json().then((jsonData) => {
        if (jsonData.length === 0) {
          invalidShow();
          return;
        } else {
          // allow the show section and card to be visable
          showSectionEl.classList.remove('hide');
          // hide the movie and actor sections
          movieSectionEl.classList.add('hide');
          actorSectionEl.classList.add('hide');
          // clear html
          var htmlCode = '';
          // clear error content
          errorEl.textContent = '';
          // Declare the show title
          var showTitle = 'Shows';

          for (let i = 0; i < 5; i++) {
            // jsonData.forEach(element => {
            let element = jsonData[i];

            htmlCode += `<div class="card is-flex-column is-justify-content-space-between" id="tvshowsnav"> 
              <div class="section-title"> ${showTitle} </div>
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

            document.getElementById('resultsList').innerHTML = htmlCode;
          }
        }
      });
    }
  });
}

/* SHOW SECTION ENDS */

/* ACTOR SECTION START */
// the movie DB API call to get actor id. Note: name parameter is defined as the input value
var getNameSearch = function (name) {
  var apiUrl =
    'https://api.themoviedb.org/3/search/person?api_key=' +
    movieDbApi +
    '&language=en-US&query=' +
    name +
    '&page=1&include_adult=false';

  fetch(apiUrl)
    .then(function (response) {
      // if response is good, run the getActorId function
      if (response.ok) {
        response.json().then(function (name) {
          getActorId(name);
        });
      } else {
        // otherwise run invalid input
        invalidActor();
        return;
      }
    })
    // runs if there is a connection issue
    .catch(function (error) {
      connectIssue();
    });
};

// Get the actors id
var getActorId = function (name) {
  // define the actors array
  var actors = name.results;
  if (actors[0] === undefined) {
    invalidActor();
    return;
  } else {
    // check for the actors id
    var actorId = actors[0].id;
    // if there is an actor id
    if (actorId) {
      // call the actorInfo function
      actorInfo(actorId);
    } else {
      invalidActor();
      return;
    }
  }
};

// Call a new fetch function to get actor information
var actorInfo = function (actorId) {
  // Call api for actor information
  var apiUrl =
    'https://api.themoviedb.org/3/person/' +
    actorId +
    '?api_key=' +
    movieDbApi +
    '&language=en-US';

  fetch(apiUrl)
    .then(function (response) {
      // if there is a valid input
      if (response.ok) {
        // convert to json and run the and showActorInfo functions
        response.json().then(function (actorId) {
          showActorInfo(actorId);
        });
      }
    })
    // Runs if there is a connection issue
    .catch(function (error) {
      connectIssue();
    });
};

// Function to display the actors information
var showActorInfo = function (actorId) {
  // clear old content
  actorSectionEl.innerHTML = '';
  // clear list item elements
  knownForEl.innerHTML = '';
  // clear the actor subtitle section
  actorTitleEl.innerHTML = '';
  // clear error content
  errorEl.textContent = '';

  // define the actor's name
  var actorName = actorId.name;
  // define the actors birth date
  var birthDate = actorId.birthday;
  // define the actors death date (if applicable)
  var deathDate = actorId.deathday;
  // define the actors biography
  var actorBiography = actorId.biography;

  // if theres a birth date then show the actor information
  if (birthDate) {
    // unhide the actor section
    actorSectionEl.classList.remove('hide');
    // hide the tv shows section
    showSectionEl.classList.add('hide');
    // hide the movie section
    movieSectionEl.classList.add('hide');

    // define div where actor is alive
    var liveDiv =
      'Information for ' +
      actorName +
      ' (Born: ' +
      birthDate +
      ' - ' +
      'Present' +
      ')';

    // define div where the actor died
    var deadDiv =
      'Information for ' +
      actorName +
      ' (Born: ' +
      birthDate +
      ' - Died: ' +
      deathDate +
      ')';

    // if statement for if the actor has died or not
    if (deathDate === null) {
      actorTitleEl.innerHTML = liveDiv;
    } else {
      actorTitleEl = deadDiv;
    }
    // style the actor subtitle
    actorTitleEl;
    // append title to the actor container
    actorSectionEl.append(actorTitleEl);

    // create an image element
    var actorImage = document.createElement('img');
    // set the source of the image
    actorImage.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/original' + actorId.profile_path
    );
    actorImage.classList.add('actor-image');
    // append image to the image container
    actorImageContainerEl.append(actorImage);
    // append image container to the actor bio section
    actorSectionEl.append(actorImageContainerEl);

    // Make a container to hold the actor information
    var actorInfoEl = document.createElement('div');
    actorInfoEl.classList.add('actorInfoContainer');
    // Make a paragraph element for the actor's biography
    var actorBio = document.createElement('p');
    // set the text content of the list item
    actorBio.textContent = actorBiography;
    // style the biography
    actorBio.classList.add('biography');

    // append the biography to the actorInfo container
    actorInfoEl.append(actorBio);

    // append information to the actor container
    actorSectionEl.append(actorInfoEl);
  } else {
    // otherwise run the function to hide the section and display 'actor not found'
    invalidActor();
    return;
  }
};
/* ACTOR SECTION ENDS */

/* ERROR MESSAGES START */
// Function for invalid movies
var invalidMovie = function () {
  errorEl.textContent = 'Movie not found';
  errorEl.style.color = 'red';
  movieSectionEl.classList.add('hide');
  showSectionEl.classList.add('hide');
  actorSectionEl.classList.add('hide');
  // stop the function
  return;
};

var invalidShow = function () {
  errorEl.textContent = 'Show not found';
  errorEl.style.color = 'red';
  movieSectionEl.classList.add('hide');
  showSectionEl.classList.add('hide');
  actorSectionEl.classList.add('hide');
  // stop the function
  return;
};

// Function for invalid or improper inputs for actors
var invalidActor = function () {
  errorEl.textContent = 'Actor not found';
  errorEl.style.color = 'red';
  movieSectionEl.classList.add('hide');
  showSectionEl.classList.add('hide');
  actorSectionEl.classList.add('hide');
  // stop the function
  return;
};

var invalidInput = function () {
  errorEl.textContent = 'Invalid search';
  errorEl.style.color = 'red';
  movieSectionEl.classList.add('hide');
  showSectionEl.classList.add('hide');
  actorSectionEl.classList.add('hide');
  // stop the function
  return;
};

// Function if you are unable to connect
var connectIssue = function () {
  errorEl.textContent = 'Unable to connect.';
  errorEl.style.color = 'red';
  return;
};

/* ERROR MESSAGES END */

/* EVENT LISTENERS START */

// Button to prevent default, and check if an input was submitted
buttonEL.addEventListener('click', function (event) {
  // prevent page refresh
  event.preventDefault();

  // set name value
  var name = inputEl.value.trim();

  // If there is a name inputted
  if (name.length > 0) {
    functionSelector(name);
  } else {
    invalidInput();
    return;
  }
});

/* EVENT LISTENERS START */
var functionSelector = function () {
  // set name value
  var name = inputEl.value.trim();
  // define select element value
  var chooseValue = chooseSearch.value;
  // define option values
  var actorValue = actorOption.value;
  var movieValue = movieOption.value;
  var showValue = showOption.value;

  if (name === '') {
    return;
  } else {
    if (chooseValue === actorValue) {
      getNameSearch(name);
    } else if (chooseValue === movieValue) {
      getMovieSearch(name);
    } else if (chooseValue === showValue) {
      searchShow(name);
    } else {
      invalidInput();
      return;
    }
  }
};
/* EVENT LISTENERS END */
