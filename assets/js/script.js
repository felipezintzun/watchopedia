var buttonEl = document.getElementById('submitBtn');
var searchInputEl = document.getElementById('search');

//IMBD API
function searchForActor (actorName) {
  console.log(actorName);
  // format the imdb api
  var apiUrl = 'https://imdb-api.com/en/API/SearchAll/k_1t9p2l2d/' + actorName;

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayName(data);
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

    //button submission function
    var searchForActor = function(actorName){
      console.log(actorName);
    };
      //get value from searchInputEl
    buttonEl.addEventListener('submit', function(event){
      var actorName = searchInputEl.value.trim();
      searchForActor(actorName);
      })
    