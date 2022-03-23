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
      // loop through json object for name, lat, lon
      for (var i = 0; i < data.length; i++) {
        var cityName = data[i].name;
        var lat = data[i].lat;
        var lon = data[i].lon;
        console.log(cityName);
        console.log(lat);
        console.log(lon);
      }
    })
    .catch(function (error) {
      alert("Unable to Connect to OpenWeather");
    });
};

// fetch city info using lat/lon
var getCity = function () {
  var pos = {
    // lat: x,
    // lon: y,
  };
  console.log(pos);
};

// display current weather
// display 5-day forecast
// localstorage search history
// create li element for search history
