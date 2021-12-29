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

// Add to Watch Later list
var modalButtonEl = document.querySelector("#modal-button");
var watchListEl = document.querySelector("#watch-list");

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
            <button class="modal-button" id="save-title" type="submit">Add to My Watch Later List</button>
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
  modalButtonEl.addEventListener("click", function () {
    saveLocalStorage(showTitle);
    displayFromLocalStorage();
  });
}

/* SHOW SECTION ENDS */

/* SAVE TO LOCAL STORAGE STARTS */
var displayFromLocalStorage = function () {
  var saveMov = JSON.parse(localStorage.getItem("savedMovies"));
  if (saveMov) {
    watchListEl.innerHTML = "";
    saveMov.forEach((el) => {
      var div = document.createElement("div");
      div.classList.add("watch-list_element");
      var span = document.createElement("span");
      span.textContent = "x";
      span.addEventListener("click", function () {
        deleteFromLocalStorage(el);
      });
      var img = document.createElement("img");
      img.classList.add("watch-list_img");
      img.setAttribute("src", "https://api.tvmaze.com/search/shows" + el);
      div.appendChild(img);
      div.appendChild(span);
      watchListEl.appendChild(div);
    });
  }
};
displayFromLocalStorage();

function saveLocalStorage(item) {
  console.log(item);
  var savedFilms = JSON.parse(localStorage.getItem("shows")) || [];
  if (!savedFilms.includes(item)) {
    savedFilms.push(item);
  }
  localStorage.setItem("shows", JSON.stringify(savedFilms));
}
/* SAVE TO LOCAL STORAGE STARTS */

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
  var titleTypeInput = document.querySelector("select[name='title-type']").value;

  // check if inputs are empty (validate)
  //if (titleNameInput === "" || titleTypeInput === "") {
    //alert("You need to fill out the title form!");
    //return false;
  //}
  
  // reset form fields for next title to be entered
  document.querySelector("input[name='title-name']").value = "";
  document.querySelector("select[name='title-type']").selectedIndex = 0;
 
  // check if title is new or one being edited by seeing if it has a data-title-id attribute
  var isEdit = formEl.hasAttribute("data-title-id");

  if (isEdit) {
    var titleId = formEl.getAttribute("data-title-id");
    completeEditTitle(titleNameInput, titleTypeInput, titleId);
  } else {
  //package up data as an object
    var titleDataObj = {
      name: titleNameInput,
      type: titleTypeInput
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

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-title-id", titleId);
  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-title-id", titleId);
  actionContainerEl.appendChild(deleteButtonEl);

  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-title-id", titleId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Watch", "In Progress", "Watched"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  
  return actionContainerEl;
};

var completeEditTitle = function(titleName, titleType, titleId) {
  // find title list item with titleId value
  var titleSelected = document.querySelector(".title-item[data-title-id='" + titleId + "']");

  // set new values
  titleSelected.querySelector("h3.title-name").textContent = titleName;
  titleSelected.querySelector("span.title-type").textContent = titleType;

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

  var titleType = titleSelected.querySelector("span.title-type").textContent;
  console.log(titleType);

  // write values of titlename and titleType to form to be edited
  document.querySelector("input[name='title-name']").value = titleName;
  document.querySelector("select[name='title-type']").value = titleType;

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