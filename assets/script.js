fetch('https://api.openweathermap.org/data/2.5/forecast?lat=35.457370&lon=-83.055780&appid=263899f28c1a4fdfb9c42daf32e3c285',{
})
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
});