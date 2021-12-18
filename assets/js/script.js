
//IMBD API
var getNameSearch = function (name) {
  var apiUrl = 'https://imdb-api.com/en/API/SearchName/k_1t9p2l2d/' + name;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (name) {
        displayIssues(name);

        // Since GitHub only returns 30 results at a time, we check to see if there's more than 30 by looking for a next page URL in the response headers.
        if (response.headers.get('Link')) {
          displayWarning(name);
        }
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
  
          // Since GitHub only returns 30 results at a time, we check to see if there's more than 30 by looking for a next page URL in the response headers.
          if (response.headers.get('Link')) {
            displayWarning(id);
          }
        });
      } else {
        document.location.replace('./index.html');
      }
    });
  };