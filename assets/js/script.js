var buttonEl = document.getElementById('submitBtn');
var searchInputEl = document.getElementById('search');

//IMBD API
function getNameSearch (name) {
  // format the imdb api
  var apiUrl = 'https://imdb-api.com/en/API/Title/k_1t9p2l2d/' + name;

  // make a request to the url
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
        .catch(function(error){
          //catching no actors found
            connectIssue();
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