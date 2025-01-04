const form      = document.querySelector("form");
const cityInput = document.getElementById("cityInput");


async function getWeatherData(city) {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.audemars}`;
        const response = await fetch(apiURL);

        if (!(response.ok)) {
                alert("City not found");
        }

        return await response.json();
}

function displayWeatherInfos(cityName, cityTemp, cityWeather) {
        const cityNameEl = document.getElementById("cityName");
        const temperatureEl = document.getElementById("currenTemperature");
        const weatherEl = document.getElementById("currentWeather");

        cityNameEl.textContent = cityName;
        temperatureEl.textContent = cityTemp;
        weatherEl.textContent = cityWeather;
        
        const weatherCardEl = document.querySelector(".weather-card");
        weatherCardEl.style.display = "block";
}

form.onsubmit = async (event) => {
        event.preventDefault();
        
        if (cityInput.value) {
                try {
                        let weatherData = await getWeatherData(cityInput.value);
                        let cityName = weatherData.name;
                        let cityTemperature = `${(weatherData.main.temp - 273.15).toFixed(1)}°`;
                        let cityWeather = `Current weather: ${weatherData.weather[0].description}`;
                        displayWeatherInfos(cityName, cityTemperature, cityWeather);
                }
                catch (error) {
                        console.error(error);
                }

                cityInput.value = "";
        }
        else {
                alert("Enter city to get current weather!");
        }
}