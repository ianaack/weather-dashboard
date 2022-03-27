// global variables
var formEl = document.getElementById("searchForm");
var cityInputEl = document.getElementById("citySearch");
var searchBtnEl = document.getElementById("searchBtn");
var clearBtnEl = document.getElementById("clearBtn");
var apiKey = "04ca341e77d18f208b89180571b95af1";
var currentWeatherEl = document.getElementById("currentWeather");
var forecastEl = document.getElementById("forecast");
var dayOne = document.getElementById("day1");
var dayTwo = document.getElementById("day2");
var dayThree = document.getElementById("day3");
var dayFour = document.getElementById("day4");
var dayFive = document.getElementById("day5");
var historyEl = document.getElementById("searchHistory");

// user submits search item via form
formEl.addEventListener("submit", (event) => {
  // handle the form data
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    // run function
    getCoordinates(city);
    // clear old content
    currentWeatherEl.innerHTML = "";
    cityInputEl.value = "";
    dayOne.innerHTML = "";
    dayTwo.innerHTML = "";
    dayThree.innerHTML = "";
    dayFour.innerHTML = "";
    dayFive.innerHTML = "";
  } else {
    // user must submit a search value
    city === null(alert("Please enter a valid city"));
  }

  // save city searches to localStorage array
  var existingEntries = JSON.parse(localStorage.getItem("allCities"));
  if (existingEntries == null) existingEntries = [];
  localStorage.setItem("cities", JSON.stringify(city));
  existingEntries.push(city);
  localStorage.setItem("allCities", JSON.stringify(existingEntries));

  // print localStorage to list items
  historyEl.innerHTML = "";
  for (var i = 0; i < existingEntries.length; i++) {
    var historyItem = document.createElement("li");
    historyItem.setAttribute("class", "col-10 m-2 btn btn-primary");
    historyItem.textContent = ("cities", existingEntries[i]);

    historyEl.appendChild(historyItem);
  }

  // when clicked, history search item re-appears
  historyItem.addEventListener("click", function () {
    for (var i = 0; i < existingEntries.length; i++) {
      if (existingEntries === city[i].value) {
        return city[i];
      }
    }
  });

  // when Clear button is clicked, localStorage is cleared and page is refreshed
  clearBtnEl.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
  });
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

  // make a get request to url
  fetch(cityWeatherUrl)
    .then(function (response) {
      // response was successful
      return response.json();
    })
    .then(function (loop) {
      displayWeather(loop);
    })
    .catch(function (error) {
      alert("Unable to Connect to OpenWeather");
    });

  // print current city and date info to card
  var momentDate = moment().format(" (MM/DD/YYYY)");
  var cityName = document.createElement("h3");

  cityName.innerHTML = name + momentDate;
  currentWeatherEl.appendChild(cityName);
};

// print all weather information to the appropriate elements
var displayWeather = function (loop) {
  // if no weather info, display message in card
  if (loop.length === 0) {
    currentWeatherEl.textContent = "No weather data found.";
    return;
  } else {
    // remove display: none class
    forecastEl.classList.remove("d-none");
    // create current weather elements
    var currentTemp = document.createElement("p");
    var currentWind = document.createElement("p");
    var currentHumidity = document.createElement("p");
    var currentUV = document.createElement("p");
    var weatherIcon = loop.current.weather[0].icon;
    var currentIcon = document.createElement("img");
    // pull openweather icon
    currentIcon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
    );

    currentTemp.textContent = "Temp: " + loop.current.temp + "\u00B0C";
    currentWind.textContent =
      "Wind Speed: " + loop.current.wind_speed + " KM/h";
    currentHumidity.textContent = "Humidity: " + loop.current.humidity + " %";
    currentUV.textContent = "UV Index: " + loop.current.uvi;

    currentWeatherEl.appendChild(currentIcon);
    currentWeatherEl.appendChild(currentTemp);
    currentWeatherEl.appendChild(currentWind);
    currentWeatherEl.appendChild(currentHumidity);
    currentWeatherEl.appendChild(currentUV);

    // display day 1 forecast
    var day1Date = moment().add(1, "d").format("MM/DD/YYYY");
    var displayDay1Date = document.createElement("h5");
    var day1Temp = document.createElement("p");
    var day1Wind = document.createElement("p");
    var day1Humidity = document.createElement("p");
    var day1WeatherIcon = loop.daily[0].weather[0].icon;
    var day1Icon = document.createElement("img");
    // pull openweather icon
    day1Icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + day1WeatherIcon + "@2x.png"
    );

    displayDay1Date.textContent = day1Date;
    day1Temp.textContent = "Temp: " + loop.daily[0].temp.day + "\u00B0C";
    day1Wind.textContent = "Wind Speed: " + loop.daily[0].wind_speed + " KM/h";
    day1Humidity.textContent = "Humidity: " + loop.daily[0].humidity + " %";

    dayOne.appendChild(displayDay1Date);
    dayOne.appendChild(day1Icon);
    dayOne.appendChild(day1Temp);
    dayOne.appendChild(day1Wind);
    dayOne.appendChild(day1Humidity);

    // display day 2 forecast
    var day2Date = moment().add(2, "d").format("MM/DD/YYYY");
    var displayDay2Date = document.createElement("h5");
    var day2Temp = document.createElement("p");
    var day2Wind = document.createElement("p");
    var day2Humidity = document.createElement("p");
    var day2WeatherIcon = loop.daily[1].weather[0].icon;
    var day2Icon = document.createElement("img");
    // pull openweather icon
    day2Icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + day2WeatherIcon + "@2x.png"
    );

    displayDay2Date.textContent = day2Date;
    day2Temp.textContent = "Temp: " + loop.daily[1].temp.day + "\u00B0C";
    day2Wind.textContent = "Wind Speed: " + loop.daily[1].wind_speed + " KM/h";
    day2Humidity.textContent = "Humidity: " + loop.daily[1].humidity + " %";

    dayTwo.appendChild(displayDay2Date);
    dayTwo.appendChild(day2Icon);
    dayTwo.appendChild(day2Temp);
    dayTwo.appendChild(day2Wind);
    dayTwo.appendChild(day2Humidity);

    // display day 3 forecast
    var day3Date = moment().add(3, "d").format("MM/DD/YYYY");
    var displayDay3Date = document.createElement("h5");
    var day3Temp = document.createElement("p");
    var day3Wind = document.createElement("p");
    var day3Humidity = document.createElement("p");
    var day3WeatherIcon = loop.daily[2].weather[0].icon;
    var day3Icon = document.createElement("img");
    // pull openweather icon
    day3Icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + day3WeatherIcon + "@2x.png"
    );

    displayDay3Date.textContent = day3Date;
    day3Temp.textContent = "Temp: " + loop.daily[2].temp.day + "\u00B0C";
    day3Wind.textContent = "Wind Speed: " + loop.daily[2].wind_speed + " KM/h";
    day3Humidity.textContent = "Humidity: " + loop.daily[2].humidity + " %";

    dayThree.appendChild(displayDay3Date);
    dayThree.appendChild(day3Icon);
    dayThree.appendChild(day3Temp);
    dayThree.appendChild(day3Wind);
    dayThree.appendChild(day3Humidity);

    // display day 4 forecast
    var day4Date = moment().add(4, "d").format("MM/DD/YYYY");
    var displayDay4Date = document.createElement("h5");
    var day4Temp = document.createElement("p");
    var day4Wind = document.createElement("p");
    var day4Humidity = document.createElement("p");
    var day4WeatherIcon = loop.daily[3].weather[0].icon;
    var day4Icon = document.createElement("img");
    // pull openweather icon
    day4Icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + day4WeatherIcon + "@2x.png"
    );

    displayDay4Date.textContent = day4Date;
    day4Temp.textContent = "Temp: " + loop.daily[3].temp.day + "\u00B0C";
    day4Wind.textContent = "Wind Speed: " + loop.daily[3].wind_speed + " KM/h";
    day4Humidity.textContent = "Humidity: " + loop.daily[3].humidity + " %";

    dayFour.appendChild(displayDay4Date);
    dayFour.appendChild(day4Icon);
    dayFour.appendChild(day4Temp);
    dayFour.appendChild(day4Wind);
    dayFour.appendChild(day4Humidity);

    // display day 5 forecast
    var day5Date = moment().add(5, "d").format("MM/DD/YYYY");
    var displayDay5Date = document.createElement("h5");
    var day5Temp = document.createElement("p");
    var day5Wind = document.createElement("p");
    var day5Humidity = document.createElement("p");
    var day5WeatherIcon = loop.daily[4].weather[0].icon;
    var day5Icon = document.createElement("img");
    // pull openweather icon
    day5Icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + day5WeatherIcon + "@2x.png"
    );

    displayDay5Date.textContent = day5Date;
    day5Temp.textContent = "Temp: " + loop.daily[4].temp.day + "\u00B0C";
    day5Wind.textContent = "Wind Speed: " + loop.daily[4].wind_speed + " KM/h";
    day5Humidity.textContent = "Humidity: " + loop.daily[4].humidity + " %";

    dayFive.appendChild(displayDay5Date);
    dayFive.appendChild(day5Icon);
    dayFive.appendChild(day5Temp);
    dayFive.appendChild(day5Wind);
    dayFive.appendChild(day5Humidity);
  }
};
