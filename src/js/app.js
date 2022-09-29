import * as flsFunctions from "./modules/function.js";

flsFunctions.isWebp();




const apiKey = '9c86ea28cf45230394a138f2e16b445c',
    weather = document.querySelector('.weather'),
    search = document.querySelector('.search'),
    submit = document.querySelector('.submit');

let city = 'Tyumen';

search.addEventListener('keydown', (e) => {
    if (e.which === 13 || e.keyCode === 13 || e.key === 'Enter') {
        e.preventDefault();
        city = search.value;
        getWeather();
    }
});


function getWeather() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            weather.textContent = `${Math.round(data.main.temp - 273.15)} - градусов в ${city}`;
        });
}

getWeather();