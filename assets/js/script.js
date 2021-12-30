/* GLOBAL VARIABLES START */
// Declare input element
var inputEl = document.getElementById('search');
// Declare the datalist
var datalistEl = document.getElementById('watch');
// Define the actor section
var actorSectionEl = document.getElementById('actor-section');
// Define the show section
var showSectionEl = document.getElementById('show-section');
// Define the movie section
var movieSectionEl = document.getElementById('movie-section');
// Declare the container that holds the actor information
var actorEl = document.getElementById('actor');
// Declare the actor subtitle
var actorSubtitleEl = document.getElementById('actor-subtitle');
// Declare the unordered list to list the movies/shows the actor is known for
var knownForEl = document.getElementById('known-for');
// Declare error messages container
var errorEl = document.getElementById('error');
// Declare button
var buttonEL = document.getElementById('searchBtn');
//declare the container that holds movie infor
var movieSectionEl = document.getElementById('movie-section');
// Declare the movie title
var movieTitleEl = document.getElementById('movie-title');
// Declare the paragraph for movie information
var movieResultsEl = document.getElementById('movie-results');

/* SHOW SECTION START */
function searchShow(query) {
  console.log(query);
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url).then((response) => {
    if (response.ok) {
      response.json().then((jsonData) => {
        // allow the show section and card to be visable
        showSectionEl.classList.remove('hide');
        // clear html
        var htmlCode = '';
        // clear error
        errorEl.textContent = '';

        // Declare the show title
        var showTitle = 'Shows';

        for (let i = 0; i < jsonData.length; i++) {
          // jsonData.forEach(element => {
          let element = jsonData[i];
          htmlCode += `<div class="card is-flex-column is-justify-content-space-between"> 
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
            <button class="btn" id="save-title" type="submit">Add to My Watch Later List</button>
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
// Imbd API call to get actor id. Note: name parameter is defined as the input value
// (Original key: k_vc5wkpr4)
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_xqqyxw1f/' + name;

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

//fetch movie
var getMovieSearch = function (name) {
  var movieUrl = 'https://imdb-api.com/en/API/SearchMovie/k_xqqyxw1f/' + name;

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
  //define the movies array
  var movies = name.results;
  //check for the movies id
  var movieId = movies[0].id;
  // if there is a movie id
  if (movieId) {
    // call the movieInfor function
    movieInfo(movieId);
  } else {
    invalidMovie();
  }
};

// cal a new fetch function to get movie info
var movieInfo = function (movieId) {
  // call api for movie info
  var movieUrl =
    'https://imdb-api.com/en/API/SearchMovie/k_xqqyxw1f/' + movieId;

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
  console.log(movieId);
  //clear old content
  movieSectionEl.innerHTML = '';
  movieResultsEl.innerHTML = '';

  if (movieId) {
    movieSectionEl.classList.remove('hide');

    var movieResults = movieId.results;

    for (var i = 0; i < movieResults.length; i++) {
      var movieResultsarr = movieResults[i];

      //create image element
      var movieImage = document.createElement('img');
      // set the source of the image
      movieImage.setAttribute('src', movieResultsarr.image + '@2x.png');
      // movieImage.classList.add('movie-image');
      //append image to the movie section
      movieSectionEl.append(movieImage);

      var movieImageEl = document.createElement('div');
      var movieTitle = document.createElement('span');
      movieTitle.textContent = movieResultsarr.title;
      movieImageEl.append(movieTitle);

      var movieDate = document.createElement('span');
      movieDate.textContent = movieResultsarr.description;
      movieImageEl.append(movieDate);

      movieSectionEl.append(movieImageEl);
    }
  } else {
    invalidMovie();
  }
};

// API CALLS END

// Function if you are unable to connect
var connectIssue = function () {
  errorEl.textContent = 'Unable to connect.';
  errorEl.style.color = 'red';
};

// POPULATING ELEMENTS
// Function to get the actors id
var getActorId = function (name) {
  console.log(name);
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
  var apiUrl = 'https://imdb-api.com/en/API/Name/k_vc5wkpr4/' + actorId;

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
  actorEl.innerHTML = '';
  // clear list item elements
  knownForEl.innerHTML = '';
  // clear the actor subtitle section
  actorSubtitleEl.innerHTML = '';
  // clear the error message
  errorEl.textContent = '';

  // define the actor's name
  var actorName = actorId.name;
  // define the actors birth date
  var birthDate = actorId.birthDate;
  // define the actors death date (if applicable)
  var deathDate = actorId.deathDate;
  // if theres a birth date then show the actor information
  if (birthDate) {
    // unhide the actor section
    actorSectionEl.classList.remove('hide');
    // define div where actor is alive
    var liveDiv =
      'Top Movie and Shows for ' +
      actorName +
      ' (Born: ' +
      birthDate +
      ' - ' +
      'Present' +
      ')';

    // define div where the actor died
    var deadDiv =
      'Top Movie and Shows for ' +
      actorName +
      ' (Born: ' +
      birthDate +
      ' - Died: ' +
      deathDate +
      ')';

    // if statement for if the actor has died or not
    if (deathDate === null) {
      actorSubtitleEl.innerHTML = liveDiv;
    } else {
      actorSubtitleEl = deadDiv;
    }
    // style the actor subtitle
    actorSubtitleEl;
    // append title to the actor container
    actorEl.append(actorSubtitleEl);

    // create an image element
    var actorImage = document.createElement('img');
    // set the source of the image
    actorImage.setAttribute('src', actorId.image + '@2x.png');
    actorImage.classList.add('actor-image');
    // append image to the actor container
    actorEl.append(actorImage);

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
      knownForEl.append(knownforList);
    }
    // append the unordered list to the actorBio container
    actorBioEl.append(knownForEl);

    // append information to the actor container
    actorEl.append(actorBioEl);
  } else {
    // otherwise run the function to hide the section and display 'actor not found'
    invalidActor();
  }
};
/* ACTOR SECTION ENDS */

/* ERROR MESSAGES START */
// Function for invalid or improper inputs for movies
// var invalidMovie = function () {
//   errorEl.textContent = 'Movie not found';
//   errorEl.style.color = 'red';
// };

// Function for invalid or improper inputs for shows
var invalidShow = function () {
  errorEl.textContent = 'Television show not found';
  errorEl.style.color = 'red';
  showSectionEl.classList.add('hide');
};

// Function for invalid or improper inputs for actors
var invalidActor = function () {
  errorEl.textContent = 'Actor not found';
  errorEl.style.color = 'red';
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