document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const tempDisplay = document.getElementById('temperature');
    const descDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const API_KEY = 'cae5c99161b70e97230e4d488a41ca01';

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        try {
            const response = await fetch(url);
            console.log(response);
            if (!response.ok) {
                throw new Error('City not found');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    function displayWeatherData(weatherData) {
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        cityNameDisplay.textContent = `City: ${weatherData.name}`;
        tempDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
        descDisplay.textContent = `Description: ${weatherData.weather[0].description}`;
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});
