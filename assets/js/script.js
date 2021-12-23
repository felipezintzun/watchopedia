// GLOBAL VARIABLES
// Declare input variable
var inputEl = document.getElementById("search");
// Declare the datalist
var datalistEl = document.getElementById("watch");
// Declare the container that holds the actor information
var actorEl = document.getElementById("actor-section");
// Declare the actor title
var actorTitleEl = document.getElementById("actor-title");
// Declare the paragraph for actor information
var actorInfoEl = document.getElementById("actor-results");
// Declare the unordered list to list the movies/shows the actor is known for
var knownForEl = document.getElementById("known-for");
// Declare error messages container
var errorEl = document.getElementById("error");
// Declare button
var buttonEL = document.getElementById("searchBtn");
//declare the container that holds movie infor
var movieSectionEl = document.getElementById("movie-section");
// Declare the movie title
var movieTitleEl = document.getElementById("movie-title");
// Declare the paragraph for movie information
var movieResultsEl = document.getElementById("movie-results");

// API CALLS START
//IMBD API
var getNameSearch = function (name) {
  var apiUrl = "https://imdb-api.com/en/API/SearchName/k_xqqyxw1f/" + name;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (name) {
          getActorId(name);
        });
      } else {
        invalidInput();
      }
    })
    .catch(function (error) {
      connectIssue();
    });
};

//fetch movie
var getMovieSearch = function (name) {
  var movieUrl = "https://imdb-api.com/en/API/SearchMovie/k_xqqyxw1f/" + name;

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
  var movieUrl = "https://imdb-api.com/en/API/SearchMovie/k_xqqyxw1f/" + movieId;

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
  } 


// API CALLS END

//search movies
// function searchMovie(query) {
//   const url = `https://imdb-api.com/en/API/SearchMovie/k_xqqyxw1f?q=${query}`;
//   console.log(url);
//   fetch(url)
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((jsonData) => {
//       console.log(jsonData, 'Json');
//       var htmlCode = '';
//       for (let i = 0; i < jsonData.length; i++) {
//         // jsonData.forEach(element => {
//         let element = jsonData[i];
//         console.log(element);
//         htmlCode += `<div class="card">
//         <div class="card-image">
//           <figure class="image is-4by3">
//             <img src="${element.show.image.medium}" alt="placeholder image">
//           </figure>
//         </div>
//         <div class="card-content">
//           <div class="media">
//             <div class="media-content">
//               <p class="title is-4">${element.show.name}</p>
//               <p class="subtitle is-6">${element.show.rating.average}</p>
//             </div>
//           </div>
//           <div class="content">
//             ${element.show.summary}
//             <a href="${element.show.officialSite}">Offical Site</a>
//             <br>
//             <time>${element.show.schedule.time}</time>
//           </div>
//         </div>
//       </div>`;
//       }
//       console.log(htmlCode);
//       // const list = document.getElementById("resultsList")
//       // list.innerHTML = htmlCode;
//       document.getElementById('movieResults').innerHTML = htmlCode;
//       // renderResults(results);
//     });
// }


// Function if you are unable to connect
var connectIssue = function () {
  errorEl.textContent = "Unable to connect.";
  errorEl.style.color = "red";
};

// POPULATING ELEMENTS
// Function to get the actors id
var getActorId = function (name) {
  // define the actors array
  var actors = name.results;
  // get the actors id
  var actorId = actors[0].id;
  if (actorId) {
    // call the actorInfo function
    actorInfo(actorId);
  } else {
    invalidInput();
  }
};

// Call a new fetch function to get actor information
var actorInfo = function (actorId) {
  // Call api for actor information
  var apiUrl = "https://imdb-api.com/en/API/Name/k_vc5wkpr4/" + actorId;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (actorId) {
          showActorInfo(actorId);
        });
      } 
    })
    .catch(function (error) {
      connectIssue();
    });
};


  

// Function to display the actors information
var showActorInfo = function (actorId) {
  // clear old content
  actorEl.innerHTML = "";
  // clear list item elements
  knownForEl.innerHTML = "";

  // define the actor's name
  var actorName = actorId.name;
  var birthDate = actorId.birthDate;
  var deathDate = actorId.deathDate;
  var awards = actorId.awards;

  // set the text content for the title
  actorTitleEl.innerHTML =
    "Top Movie and Shows for " +
    "<b>" +
    actorName +
    "</b>" +
    ". " +
    "(Born: " +
    birthDate +
    " - Died: " +
    deathDate +
    ")";
  // append title to the actor container
  actorEl.appendChild(actorTitleEl);

  // create an image element
  var actorImage = document.createElement("img");
  // set the source of the image
  actorImage.setAttribute("src", actorId.image + "@2x.png");
  actorImage.classList.add("actor-image");
  // append image to the actor container
  actorEl.appendChild(actorImage);

  // Make a container to hold the actor information
  var actorBioEl = document.createElement("div");

  // define the actors known for array
  var knownFor = actorId.knownFor;
  // For loop to show all the movies/shows the actor is known for
  for (var i = 0; i < knownFor.length; i++) {
    // iterate through the knownFor array
    knownForArr = knownFor[i];
    // Make a list item element for the movies/shows the actor is known for
    var knownforList = document.createElement("li");
    // set the text content of the list item
    knownforList.textContent = knownForArr.fullTitle;
    // style the list item
    knownforList.classList.add("known-list");
    // append the list item to the unordered list
    knownForEl.appendChild(knownforList);
  }
  // append the unordered list to the actorBio container
  actorBioEl.appendChild(knownForEl);

  // make a span element to show the awards the actor has recieved
  var actorAwardsEl = document.createElement("div");
  // set the text content to the awards variable
  actorAwardsEl.textContent = awards;
  // append the awards section to the information container
  actorAwardsEl.appendChild(actorBioEl);

  // append information to the actor container
  actorEl.append(actorBioEl);
};

// EVENT LISTENERS
// button to capture name type into input, set to name vaiable and then running the getNameSearch() and searchShow() functions
buttonEL.addEventListener("click", function (event) {
  // prevent page refresh
  event.preventDefault();
  // set name value
  var name = inputEl.value.trim();
  // run getNameSearch() and searchShow() function
  if (name.length > 0) {
    getNameSearch(name);
    // searchShow(name);
    getMovieSearch(name);
    localStorage.setItem("search-result", JSON.stringify(name));
  } else {
    invalidInput();
  }
});
var myImage = document.querySelector("img");

// FETCHING SHOW DATA
function searchShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  console.log(url);
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData, 'Json');
      var htmlCode = '';
      for (let i = 0; i < jsonData.length; i++) {
        // jsonData.forEach(element => {
        let element = jsonData[i];
        console.log(element);
        htmlCode += `<div class="card">
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
          </div>
        </div>
      </div>`;
      }
      console.log(htmlCode);
      // const list = document.getElementById("resultsList")
      // list.innerHTML = htmlCode;
      document.getElementById('resultsList').innerHTML = htmlCode;
      // renderResults(results);
    });
}
// MAKES LIST OF SHOWS APPEAR ON SITE
function renderResults(results) {
  results.forEach((result) => {
    const element = document.createElement('li');
    element.innerHTML = result;
    list.appendChild(element);
  });
}
