/* GLOBAL VARIABLES START */
var inputEl = document.getElementById('search');

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
var movieErrorEl = document.getElementById('movie-error');
// Declare show error messages container
var showErrorEl = document.getElementById('show-error');
// Declare actor error messages container
var actorErrorEl = document.getElementById('actor-error');

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
          getMovieId(name);
        });
      } else {
        // otherwise run invalid input
        invalidMovie();
      }
    })
    //runs if there is a connection issues
    .catch(function (error) {
      connectIssue();
    });
};

//check if there is a movie id

var getMovieId = function (name) {
  for (var i = 0; i < 10; i++);
  {
    //movie array
    var movieArr = name.results[i];
    //check for the movies id
    var movieId = movieArr.id;
    // if there is a movie id
    if (movieId) {
      // call the movieInfor function
      movieInfo(movieId);
    } else {
      invalidMovie();
    }
  }
};

// cal a new fetch function to get movie info
var movieInfo = function (movieId) {
  // call api for movie info
  var movieUrl =
    'https://api.themoviedb.org/3/movie/' +
    movieId +
    '?api_key=' +
    movieDbApi +
    '&language=en-US';

  fetch(movieUrl)
    .then(function (response) {
      // if there is a valid input
      if (response.ok) {
        //conver to json and run showMovieInfo Functions
        response.json().then(function (movieId) {
          showMovieInfo(movieId);
        });
      }
    })
    //runs if ther is a connection issue
    .catch(function (error) {
      connectIssue();
    });
};

// function to display movie info
var showMovieInfo = function (movieId) {
  //clear old content
  movieSectionEl.innerHTML = '';
  movieResultsEl.innerHTML = '';
  // clear error content
  movieErrorEl.textContent = '';

  if (movieId) {
    // unhide the movie section
    movieSectionEl.classList.remove('hide');
    //create image element
    var movieImage = document.createElement('img');
    // set the source of the image
    movieImage.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w342' + movieId.poster_path
    );
    // movieImage.classList.add('movie-image');
    //append image to the movie section
    movieResultsEl.append(movieImage);

    var movieTitle = document.createElement('span');
    movieTitle.textContent = movieId.title;
    movieResultsEl.append(movieTitle);

    var movieDate = document.createElement('span');
    movieDate.textContent = movieId.overview;
    movieResultsEl.append(movieDate);
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
        // allow the show section and card to be visable
        showSectionEl.classList.remove('hide');
        // clear html
        var htmlCode = '';
        // clear error content
        showErrorEl.textContent = '';

        // Declare the show title
        var showTitle = 'Shows';

        for (let i = 0; i < jsonData.length; i++) {
          // jsonData.forEach(element => {
          let element = jsonData[i];
          htmlCode += `<div class="card is-flex-column is-justify-content-space-between" id="tvshowsnav"> 
          <div class="section-title"> ${showTitle} </div>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.show.image.original}" alt="placeholder image" />
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
        document.getElementById('resultsList').innerHTML = htmlCode;
      });
    } else {
      invalidShow();
    }
  });
}

/* SHOW SECTION ENDS */

/* ACTOR SECTION START */
// the movie DB API call to get actor id. Note: name parameter is defined as the input value
var getNameSearch = function (name) {
  console.log(name);
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
  // check for the actors id
  var actorId = actors[0].id;
  // if there is an actor id
  if (actorId) {
    // call the actorInfo function
    actorInfo(actorId);
  } else {
    invalidActor();
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
  actorErrorEl.textContent = '';

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
  }
};
/* ACTOR SECTION ENDS */

/* ERROR MESSAGES START */
// Function for invalid movies
var invalidMovie = function () {
  movieErrorEl.textContent = 'Movie not found';
  movieErrorEl.style.color = 'red';
  movieSectionEl.classList.add('hide');
};

var invalidShow = function () {
  showErrorEl.textContent = 'Movie not found';
  showErrorEl.style.color = 'red';
  showSectionEl.classList.add('hide');
};

// Function for invalid or improper inputs for actors
var invalidActor = function () {
  actorErrorEl.textContent = 'Actor not found';
  actorErrorEl.style.color = 'red';
  actorSectionEl.classList.add('hide');
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
    // searchShow(name);
    getMovieSearch(name);
    // save item to local storage
    localStorage.setItem('search-result', JSON.stringify(name));
  } else {
    invalidActor();
  }
  localStorage.clear();
});
/* EVENT LISTENERS END */
