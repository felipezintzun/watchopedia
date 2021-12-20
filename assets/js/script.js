
//IMBD API
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_1t9p2l2d/' + name;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (name) {
        displayIssues(name);

      });
    } else {
      document.location.replace('./index.html');
    }
  })
        .catch(function(error){
            alert('Unable to find name');
        })
};

//Trakt API
var getNameSearch = function (id) {
    var apiUrl = 'https://api.trakt.tv/people/' + id;
  
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

// create watch later from submission
var watchList = {
  title: searchInputEl.value.trim(),
};
// set new submission to local storage
localStorage.setItem("watchList", JSON.stringify(watchList));