// Variable and Functions to Fetch Lattitude and Longitude by Zip Code, then API call 5 day forecast
var fetchWeather = function(zipCode) {
    var enteredCity = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + zipCode + '&appid=263899f28c1a4fdfb9c42daf32e3c285';
    console.log(zipCode);
    fetch(enteredCity)
        .then(function(response) {
            console.log('City Retrieved');
            return response.json();
        })
        .then(function(data) {
            var lat = data.lat;
            var lon = data.lon;
            var loadWeather = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&cnt=6&appid=263899f28c1a4fdfb9c42daf32e3c285&units=imperial';
            console.log('Weather');
            fetch(loadWeather)
                .then(function(response) {
                    console.log('Weather Retrieved');
                    return response.json();
                })
                .then(function(data) {
                    console.log('Weather', data);
// Creates the HTML and DayJs date for current day
                    var cityWeather = document.getElementById('cityname');
                    var today = dayjs();
                    var city = data.city.name;
                    var weatherIcon = data.list[0].weather[0].icon;
                    var currentHumidity = data.list[0].main.humidity;
                    var temp = data.list[0].main.temp;
                    var windSpeed = data.list[0].wind.speed;
                    var date = today.format('ddd, MMM D');
                    var currentDay ="<ul style='list-style-type:none;' class='container-fluid d-block text-center'>" +
                                    "<li>Today " + date + "<br>" + city + "<br></li>" +
                                    "<li><img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'></li>" +
                                    "<li>Humidity: " + currentHumidity + "</li>" +
                                    "<li>Temperature: "+ temp +"</li>" +
                                    "<li>Wind Speed: "+ windSpeed +"</li>" +
                                    "</ul>" +
                                    "</div>";
 // Create HTML elements for the Five Day Forecast 
                    var sameday = document.getElementById('sameday');
                    var fiveday = document.getElementById('fiveday');
                    fiveday.style.display = 'flex';
                    sameday.classList.add('print');
                    sameday.innerHTML = currentDay;   
                    var nextFiveDays = '';
                        for (var i = 1; i < 6; i++) {
                        var city = data.city.name;
                        var weatherIcon = data.list[i].weather[0].icon;
                        var currentHumidity = data.list[i].main.humidity;
                        var temp = data.list[i].main.temp;
                        var windSpeed = data.list[i].wind.speed;
                        var date = today.add(i, 'day').format('ddd, MMM D');
                        var weatherHTML="<ul style='list-style-type:none' class='container'>" +
                                        "<li>" + date + "<br>" + city + "<br></li>" +
                                        "<li><img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'></li>" +
                                        "<li>Humidity: " + currentHumidity + "</li>" +
                                        "<li>Temperature: "+ temp +"</li>" +
                                        "<li>Wind Speed: "+ windSpeed +"</li>" +
                                        "</ul>" 
                        nextFiveDays += weatherHTML;
                    }
                        cityWeather.innerHTML = nextFiveDays;
                        sameday.innerHTML = currentDay;      
                });
                
                saveLocalStorage(zipCode);

                function saveLocalStorage(zipCode){
                    previousSearch = JSON.parse(localStorage.getItem('Previous Zip Code')) || [];
                  
                    if(!previousSearch.includes(zipCode)){
                      previousSearch.push(zipCode);
                      localStorage.setItem('Previous Zip Code', JSON.stringify(previousSearch));
                      loadLocalStorage(); 
                    }
                  }
        });
};
// Submit Button for Zip Code Input
var submitBtn = $("#subBtn");
submitBtn.on("click", function (event) {
  event.preventDefault();
  var zipCode = $("#city-enter").val();
  fetchWeather(zipCode);
  saveLocalStorage(zipCode);
  loadLocalStorage();
});

// Local Storage Loading and retrieval for Dropdown Menu 
  function loadLocalStorage() {
    previousSearch = JSON.parse(localStorage.getItem('Previous Zip Code'));
    if (!previousSearch) {
      previousSearch = [];
    } 
// Clear the previous searches dropdown menu
    $("#dropdownitems").empty(); 
// Add the previous searches to the dropdown menu
    $.each(previousSearch, function (index, zipCode) {
      var item = $("<a>")
        .addClass("dropdown-item")
        .attr("href", "#")
        .text(zipCode);
      item.on("click", function (event) {
        event.preventDefault();
        fetchWeather(zipCode);
      });
      var listItem = $("<li>").append(item);
      listItem.appendTo("#dropdownitems");
    });
  }   
      $(document).ready(function() {
        $('.dropdown-toggle').dropdown();
        loadLocalStorage();
      });