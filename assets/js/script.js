var searchFormEl = document.querySelector("#searchForm");
var cityInputEl = document.querySelector("#citySearch");
var currentWeatherEl = document.querySelector("#currentWeather");
var apiKey = "04ca341e77d18f208b89180571b95af1";
var city = cityInputEl.value.trim();

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getCityWeather(city);

    // clear old content
    currentWeatherEl.textContnet = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var getCityWeather = function (city) {
  // format the OpenWeather API Url
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/reverse?lat=" +
    lat +
    "&lon=" +
    lon +
    "&limit=5&appid=" +
    apiKey;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather();
      });
    }
  });
};

var getCoordinateData = function (coordinates) {
  // format the OpenWeather API Url
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    apiKey;
};
