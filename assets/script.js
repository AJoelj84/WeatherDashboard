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
            var loadWeather = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&cnt=5&appid=263899f28c1a4fdfb9c42daf32e3c285&units=imperial';
            console.log('Weather');
            fetch(loadWeather)
                .then(function(response) {
                    console.log('Weather Retrieved');
                    return response.json();
                })
                .then(function(data) {
                    console.log('Weather', data);
                    var city = data.city.name;
                    var weatherDescription = data.list[0].weather[0].description;
                    var weatherIcon = data.list[0].weather[0].icon;
                    var currentHumidity = data.list[0].main.humidity;
                    var temp = data.list[0].main.temp;
                    var windSpeed = data.list[0].wind.speed;
                    var cityWeather = document.getElementById('cityname')
                    var weatherHTML = "<ul style='list-style-type:none' class='container'>" +
                  "<li>Todays Weather For <br>"+city+"<br>" + weatherDescription + "</li>" +
                  "<li><img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'></li>" +
                  "<li>Humidity: " + currentHumidity + "</li>" +
                  "<li>Temperature Today: "+ temp +"</li>" +
                  "<li>Wind Speed:"+ windSpeed +"</li>" +
                  "</ul>" 


                    cityWeather.innerHTML = weatherHTML;

                });
        });
};
// Submit Button for Zip Code Input
var submitBtn = $("#subBtn");
submitBtn.on("click", function(event){
    event.preventDefault();
    var zipCode = $("#city-enter").val();
    fetchWeather(zipCode);
});