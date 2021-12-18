var button = document.getElementById('submitButton');
var searchInputEl = document.getElementById('search');

//IMBD API
var searchForActor = function (actorName) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_1t9p2l2d/' + actorName;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (actorName) {
        displayIssues(actorName);
      });
    } 
  })
        .catch(function(error){
          //catching no actors found
            alert('Unable to find name');
        })
};

//Trakt API**Felipe
var getNameSearch = function (id) {
    var traktApi = 'https://api.trakt.tv/people/' + id;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (id) {
          displayIssues(id);
        });
      } else {
        document.location.replace('./index.html');
      }
    })
    .catch(function(error){
        alert('Unable to find name');
    })
  };