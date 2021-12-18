// GLOBAL VARIABLES
// Declare button and input variables
var buttonEL = document.getElementById('searchBtn');
var inputEl = document.getElementById('search');

// API CALLS START
//IMBD API
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_1t9p2l2d/' + name;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (name) {
          displayIssues(name);
        });
      } else {
        document.location.replace('./index.html');
      }
    })
    .catch(function (error) {
      alert('Unable to find name');
    });
};

//Trakt API
// var getNameSearch = function (id) {
//   var apiUrl = 'https://api.trakt.tv/people/' + id;

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (id) {
//           displayIssues(id);
//         });
//       } else {
//         document.location.replace('./index.html');
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to find name');
//     });
// };
// API CALLS END

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
