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

// Define the actor section
var actorSectionEl = document.getElementById('actor-section');
// Declare the actor subtitle
var actorTitleEl = document.getElementById('actor-title');

// Declare movie error messages container
var errorEl = document.getElementById('error');

// DEFINE SHOW SECTION
var showSectionEl = document.getElementById('show-section');

// ADD TO WATCH LATER LIST
var modalButtonEl = document.querySelector("#modal-button");
var watchListEl = document.querySelector("#watch-list");
var movieFavhEl = document.getElementById('movies-to-watch')
var showFavEl = document.getElementById('shows-to-watch')


// Declare button
var buttonEL = document.getElementById('searchBtn');
/* GLOBAL VARIABLES END */

/* MOVIE SECTION START */
// fetch movie from api
var getMovieSearch = function (name) {
  var movieUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    movieDbApi +
    '&language=en-US&query=' +
    name +
    '&page=1&include_adult=false';

  fetch(movieUrl)
    .then(function (response) {
      //if response is good run getMovieInfo function
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
  //clear out old content
  movieSectionEl.innerHTML = '';
  movieResultsEl.innerHTML = '';
  errorEl.textContent = '';
  var totalResults = name.total_results;
  if (totalResults === 0) {
    invalidMovie();
    return;
  } else {
    // hide other sections
    movieSectionEl.classList.remove('hide');
    showSectionEl.classList.add('hide');
    actorSectionEl.classList.add('hide');
    // display results in posters
    var movieArray = name.results;
    for (let i = 0; i < movieArray.length; i++) {
      let movieInfoDiv = document.createElement('div');
      movieInfoDiv.setAttribute('id', 'movieDiv');
      movieInfoDiv.setAttribute(
        'style',
        'width: 350px; color: white; text-align: center'
      );
      movieInfoDiv.setAttribute('class', 'column is-one-fifth is-full-mobile');
      //generates movie posters
      let movieImage = document.createElement('img');
      movieImage.setAttribute('id', movieArray[i].title);
      movieImage.setAttribute(
        'alt',
        movieArray[i].title + ': ' + 'Image Not Available'
      );
      movieImage.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/original' + movieArray[i].poster_path
      );
      // displays alt message if no poster available
      if (movieImage.src == 'https://image.tmdb.org/t/p/w342undefined') {
        movieImage.removeAttribute(
          'src',
          'https://image.tmdb.org/t/p/w342undefined'
        );
        movieImage.setAttribute(
          'style',
          'width: 100%; color: red; font-size: 1.25em'
        );
      }
      let movieDescription = document.createElement('div');
      movieDescription.setAttribute('style', 'font-color: black');
      movieDescription.textContent = movieArray[i].overview;
      movieInfoDiv.append(movieImage);
      movieInfoDiv.append(movieDescription);
      movieResultsEl.append(movieInfoDiv);
      movieSectionEl.append(movieResultsEl);
    }
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
                <button class="modal-button" id="save-title" type="submit">Add to My Watch Later List</button>
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
      'Information about ' +
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

    // Make a container to hold the actor information
    var actorInfoEl = document.createElement('div');
    actorInfoEl.classList.add('actorInfoContainer');

    // create an image element
    var actorImage = document.createElement('img');
    // set the source of the image
    actorImage.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/original' + actorId.profile_path
    );
    actorImage.classList.add('actor-image');
    // append image to the image container
    actorInfoEl.append(actorImage);
    // append image container to the actor bio section
    actorSectionEl.append(actorInfoEl);

    // Make a paragraph element for the actor's biography
    var actorBio = document.createElement('span');
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

/* FAVORITES SECTION STARTS */
var favoriteSection = function () {

  var chooseValue = chooseSearch.value;

  // define option values
  var actorValue = actorOption.value;
  var movieValue = movieOption.value;
  var showValue = showOption.value;
  
  var favList = document.createElement("li");
  favList.innerHTML = 

}

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

modalButtonEl.addEventListener('click' function(event) {
  event.preventDefault();

  var name = inputEl.value.trim();

  if (name.length > 0) {
    functionSelector(name);
  } else {
    invalidInput();
    return;
  }
});
/* EVENT LISTENERS END */


//FUNCTION TO ADD TITLES TO A WATCH LATER LIST
var titleIdCounter = 0;

var formEl = document.querySelector("#title-form");
var titlesToWatchEl = document.querySelector("#titles-to-watch");
var titlesInProgressEl = document.querySelector("#titles-in-progress");
var titlesCompletedEl = document.querySelector("#titles-watched");
var watchlistContentEl = document.querySelector("#watchlist-content");

var titleFormHandler = function(event) {
  event.preventDefault();
  var titleNameInput = document.querySelector("input[name='title-name']").value;
 // var titleTypeInput = document.querySelector("select[name='title-type']").value;

  // check if inputs are empty (validate)
  //if (titleNameInput === "" || titleTypeInput === "") {
    //alert("You need to fill out the title form!");
    //return false;
  //}
  
  // reset form fields for next title to be entered
  document.querySelector("input[name='title-name']").value = "";
  //document.querySelector("select[name='title-type']").selectedIndex = 0;
 
  // check if title is new or one being edited by seeing if it has a data-title-id attribute
  var isEdit = formEl.hasAttribute("data-title-id");

  if (isEdit) {
    var titleId = formEl.getAttribute("data-title-id");
    completeEditTitle(titleNameInput, titleTypeInput, titleId);
  } else {
  //package up data as an object
    var titleDataObj = {
      name: titleNameInput,
      //type: titleTypeInput
    };
  
    createTitleEl(titleDataObj);
  }
};

var createTitleEl = function (titleDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "title-item";
  listItemEl.setAttribute("data-title-id", titleIdCounter);

  // create div to hold title info and add to list item
  var titleInfoEl = document.createElement("div");
  titleInfoEl.className = "title-info";
  titleInfoEl.innerHTML = "<h3 class='title-name'>" + titleDataObj.name + "</h3><span class='title-type'>" + titleDataObj.type + "</span>";
  listItemEl.appendChild(titleInfoEl);

  // create list actions (buttons and select) for title
  var titleActionsEl = createTitleActions(titleIdCounter);
  listItemEl.appendChild(titleActionsEl);
  titlesToWatchEl.appendChild(listItemEl);

  // increase title counter for next unique id
  titleIdCounter++;

};

var createTitleActions = function(titleId) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "title-actions";

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-title-id", titleId);
  actionContainerEl.appendChild(deleteButtonEl);

  // create change status dropdown
  //var statusSelectEl = document.createElement("select");
  //statusSelectEl.setAttribute("name", "status-change");
  //statusSelectEl.setAttribute("data-title-id", titleId);
  //statusSelectEl.className = "select-status";
  //actionContainerEl.appendChild(statusSelectEl);
  // create status options
  //var statusChoices = ["To Watch", "In Progress", "Watched"];

  //for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    //var statusOptionEl = document.createElement("option");
    //statusOptionEl.setAttribute("value", statusChoices[i]);
    //statusOptionEl.textContent = statusChoices[i];
  
    // append to select
    //statusSelectEl.appendChild(statusOptionEl);
  //}
  
  return actionContainerEl;
};

var completeEditTitle = function(titleName, titleId) {
//var completeEditTitle = function(titleName, titleType, titleId) {
  // find title list item with titleId value
  var titleSelected = document.querySelector(".title-item[data-title-id='" + titleId + "']");

  // set new values
  titleSelected.querySelector("h3.title-name").textContent = titleName;
  //titleSelected.querySelector("span.title-type").textContent = titleType;

  // remove data attribute from form
  formEl.removeAttribute("data-title-id");
  // update formEl button to go back to saying "Add Title" instead of "Edit Title"
  formEl.querySelector("#save-title").textContent = "Add Title";
};

var titleButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var titleId = targetEl.getAttribute("data-title-id");
    editTitle(titleId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var titleId = targetEl.getAttribute("data-title-id");
    deleteTitle(titleId);
  }
};

var titleStatusChangeHandler = function(event) {
  console.log(event.target.value);

  // find title list item based on event.target's data-title-id attribute
  var titleId = event.target.getAttribute("data-title-id");

  var titleSelected = document.querySelector(".title-item[data-title-id='" + titleId + "']");

  // convert value to lower case
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to watch") {
    titlesToWatchEl.appendChild(titleSelected);
  } else if (statusValue === "in progress") {
    titlesInProgressEl.appendChild(titleSelected);
  } else if (statusValue === "watched") {
    titlesCompletedEl.appendChild(titleSelected);
  }
};

var editTitle = function(titleId) {
  console.log(titleId);

  // get title list item element
  var titleSelected = document.querySelector(".title-item[data-title-id='" + titleId + "']");

  // get content from title name and type
  var titleName = titleSelected.querySelector("h3.title-name").textContent;
  console.log(titleName);

  //var titleType = titleSelected.querySelector("span.title-type").textContent;
  //console.log(titleType);

  // write values of titlename and titleType to form to be edited
  document.querySelector("input[name='title-name']").value = titleName;
  //document.querySelector("select[name='title-type']").value = titleType;

  // set data attribute to the form with a value of the title's id so it knows which one is being edited
  formEl.setAttribute("data-title-id", titleId);
  // update form's button to reflect editing a title rather than creating a new one
  formEl.querySelector("#save-title").textContent = "Save Title";
};


var deleteTitle = function(titleId) {
  console.log(titleId);
  // find title list element with titleId value and remove it
  var titleSelected = document.querySelector(".title-item[data-title-id='" + titleId + "']");
  titleSelected.remove();
};
  
// Add a new title
formEl.addEventListener("submit", titleFormHandler);
  
// for edit and delete buttons
watchlistContentEl.addEventListener("click", titleButtonHandler);
  
// for changing the status
watchlistContentEl.addEventListener("change", titleStatusChangeHandler);
//WATCH LATER LIST END