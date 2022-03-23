// global variables
var formEl = document.getElementById("searchForm");
var cityInputEl = document.getElementById("citySearch");
var searchBtnEl = document.getElementById("searchBtn");
var apiKey = "04ca341e77d18f208b89180571b95af1";

formEl.addEventListener("submit", (event) => {
  // handle the form data
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getCoordinates(city);

    // clear current weather data and city search box
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
});

// convert city value to lat/lon
var getCoordinates = function () {
  // format the openweather api url
  var coordinatesUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInputEl.value.trim() +
    "&limit=5&appid=" +
    apiKey;

  // make a get request to url
  fetch(coordinatesUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          getWeather(data, city, lat, lon);
        });
      } else {
        alert("Error: City Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });

  // extract lat, lon, and name data to pass into getWeather function
};

// fetch city info using lat/lon

// display current weather
// display 5-day forecast
// localstorage search history
// create li element for search history
