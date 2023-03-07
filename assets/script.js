var city = $("#city-enter");

var fetchWeather = function(city) {
    var loadWeather = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=263899f28c1a4fdfb9c42daf32e3c285';
    console.log('Weather');
    fetch(loadWeather)
        .then (function(response){
            console.log('Weather Retrieved');
            return response.json();
        })
        .then (function(data){
            console.log('Weather', data);
        })
};

var submitBtn = $("#subBtn");
submitBtn.on("click", function(event){
    event.preventDefault();
    fetchWeather(city.val())
});