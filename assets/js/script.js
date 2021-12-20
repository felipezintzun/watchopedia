// GLOBAL VARIABLES
// Declare input variable
var inputEl = document.getElementById('search');
// Declare the container that holds the actor information
var actorEl = document.getElementById('actor-section');
// Declare the actor title
var actorTitleEl = document.getElementById('actor-title');
// Declare the paragraph for actor information
var actorInfoEl = document.getElementById('actor-results');
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
          displayActor(name);
        });
      } else {
        invalidInput();
      }
    })
    .catch(function (error) {
      connectIssue();
    });
};

// // Trakt API
// var getRatingsSearch = function (id) {
//   var apiUrl = 'https://api.trakt.tv/people/' + id;

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (id) {
//           displayIssues(id);
//         });
//       } else {
//         invalidInput();
//       }
//     })
//     .catch(function (error) {
//       connectIssue();
//     });
// };
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
  // define the actors array
  var actors = name.results;
  // For loop to show all matching actor names
  for (var i = 0; i < actors.length; i++) {
    // define 5 individual actor names
    var actor = actors[i].title;
    // if an actor matches the input
    if (actor == inputEl.value) {
      // create the option element
      var actorOption = document.createElement('option');
      // Add the actor
      actorOption.innerHTML = actor;
      inputEl.append(actorOption);
    } else {
      invalidInput();
    }
  }
};

var displayActor = function (name) {
  console.log(name);
  // define the actors array
  var actors = name.results;
  // For loop to show all matching actor names
  for (var i = 0; i < actors.length; i++) {
    // Define actors name
    var actor = actors[i].title;
    // Define the movies and shows the actor was in
    var acted = actors[i].description;
    console.log(acted);
    // if an actor matches the input
    if (actor == inputEl.value) {
      // set the text content for the title
      actorTitleEl.innerHTML =
        'Movie and Show Information for ' + '<b>' + actor + '</b>';
      // set the text content for the paragraph
      actorInfoEl.textContent = acted;

      // append title to the actor container
      actorEl.append(actorTitleEl);
      // append paragraph to the actor container
      actorEl.append(actorInfoEl);
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
