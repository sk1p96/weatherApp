import * as flsFunctions from "./modules/function.js";

flsFunctions.isWebp();



document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '9c86ea28cf45230394a138f2e16b445c',
        weatherTemp = document.querySelector('.weather'),
        search = document.querySelector('.search'),
        form = document.querySelector('.form'),
        btnPrev = document.querySelector('.slider__prev'),
        btnNext = document.querySelector('.slider__next'),
        slider = document.querySelector('.slider');

    // slider

    slider.addEventListener('click', (e) => {
        console.log(e)
    });


    let city = 'Тюмень';

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        city = search.value;
        await loadWeather();
        form.reset();
    });

    async function getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey}`);
        const data = await response.json();
        console.log(data)
        return data;
    }

    async function getCoordsWeather() {
        navigator.geolocation.getCurrentPosition(async(pos) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&lang=ru&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}`);
            const data = await response.json();
            return data;
        });
    }

    getCoordsWeather()


    // Возвращаем объект из промиса

    async function loadWeather() {
        const weather = await getWeather();

        let dateSunrise = new Date(weather.sys.sunrise * 1000),
            dateSunset = new Date(weather.sys.sunset * 1000);

        let dateSunriseTime = `${dateSunrise.getHours() + 3}:${dateSunrise.getMinutes()}:${dateSunrise.getSeconds()}`,
            dateSunsetTime = `${dateSunset.getHours() + 3}:${dateSunset.getMinutes()}:${dateSunset.getSeconds()}`;


        weatherTemp.textContent = `
        ${Math.round(weather.main.temp - 273.15)} градусов в ${city},
        Ощущается, как ${Math.round(weather.main.feels_like - 273.15)},
        ${weather.weather[0].description},
        ветер: ${weather.wind.speed},
        Восход: ${dateSunriseTime},
        Закат: ${dateSunsetTime}
        `;
    }



    loadWeather();
});