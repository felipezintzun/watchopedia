// GLOBAL VARIABLES
// Declare input variable
var inputEl = document.getElementById('search');
// Declare error messages container
var errorEl = document.getElementById('error');
// Declare button
var buttonEL = document.getElementById('searchBtn');

// API CALLS START
//IMBD API
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_1t9p2l2d/' + name;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (name) {
          showActorOption(name);
        });
      } else {
        invalidInput();
      }
    })
    .catch(function (error) {
      connectIssue();
    });
};

// Trakt API
var getRatingsSearch = function (id) {
  var apiUrl = 'https://api.trakt.tv/people/' + id;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (id) {
          displayIssues(id);
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
// Function to populate the datalist
var showActorOption = function (name) {
  console.log(name);
  // For loop to show all matching actor names
  for (var i = 0; i < 5; i++) {
    // define the actors array
    var actors = name.results;
    // define 5 individual actor names
    var actor = actors[i].title;
    // if an actor matches the input
    if (actor == inputEl.value) {
      // create the option element
      var actorOption = document.createElement('option');
      console.log(actorOption);
      // Add the actor
      actorOption.innerHTML = actor;
      inputEl.append(actorOption);
    } else {
      invalidInput();
    }
  }
};
// EVENT LISTENERS
// button to capture name type into input, set to name vaiable and then running the getNameSearch() function
buttonEL.addEventListener('click', function (event) {
  // prevent page refresh
  event.preventDefault();
  // set name value
  var name = inputEl.value.trim();
  // run getNameSearch() function
  getNameSearch(name);
});
