fetch('https://api.openweathermap.org/data/2.5/forecast?lat={35.457370}&lon={-83.055780}&appid={b6533fadaacf8190721a4a03a425d1dd}',{
})
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
});