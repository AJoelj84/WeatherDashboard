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
            var loadWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=263899f28c1a4fdfb9c42daf32e3c285';
            console.log('Weather');
            fetch(loadWeather)
                .then(function(response) {
                    console.log('Weather Retrieved');
                    return response.json();
                })
                .then(function(data) {
                    console.log('Weather', data);
                });
        });
};

var submitBtn = $("#subBtn");
submitBtn.on("click", function(event){
    event.preventDefault();
    var zipCode = $("#city-enter").val();
    fetchWeather(zipCode);
});
