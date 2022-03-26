// global variables
var formEl = document.getElementById("searchForm");
var cityInputEl = document.getElementById("citySearch");
var searchBtnEl = document.getElementById("searchBtn");
var apiKey = "04ca341e77d18f208b89180571b95af1";
var currentWeatherEl = document.getElementById("currentWeather");
var dayOne = document.getElementById("day1");
var dayTwo = document.getElementById("day2");
var dayThree = document.getElementById("day3");
var dayFour = document.getElementById("day4");
var dayFive = document.getElementById("day5");

// user submits search item via form
formEl.addEventListener("submit", (event) => {
  // handle the form data
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getCoordinates(city);

    // clear old content
    currentWeatherEl.innerHTML = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
});

// convert city value to lat/lon
var getCoordinates = function (city) {
  // format the openweather api url and accept only the first 5 array objects
  var coordinatesUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInputEl.value.trim() +
    "&limit=5&appid=" +
    apiKey;
  // make a get request to url
  fetch(coordinatesUrl)
    .then(function (response) {
      // request was successful
      return response.json();
    })
    .then(function (data) {
      getCity(data);
    })
    // display alert if any errors
    .catch(function (error) {
      alert("Unable to Connect to OpenWeather");
    });
};

// fetch weather info using latitude/longitude
var getCity = function (data) {
  // check if api returned any data
  if (data.length === 0) {
    currentWeatherEl.textContent = "No weather data found.";
    return;
  } else {
    // loop through json object for city name, latitude, and longitude
    for (var i = 0; i < data.length; i++) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      var name = data[0].name;
    }
  }

  // fetch openweathermap data using latitude and longitude
  var cityWeatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&appid=" +
    apiKey +
    "&units=metric";

  fetch(cityWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeather(data);
    });

  // add catch error

  // print current city and date info to card
  var momentDate = moment().format(" (MM/DD/YYYY)");
  var cityName = document.createElement("h3");

  cityName.textContent = data[0].name + momentDate;

  currentWeatherEl.appendChild(cityName);
};

// var displayWeather = function (data) {
//   if (data.length === 0) {
//     currentWeatherEl.textContent = "No weather data found.";
//     return;
//   } else {
//     // loop through onecall object for weather information
//     for (var i = 0; i < data.length; i++) {
//       var currentTemp = data[0].temp;
//       console.log(currentTemp);
//     }
//   }
// };
// localstorage search history

// create li element for search history
