document.addEventListener('DOMContentLoaded', () => {
    const locationBtn = document.getElementById('locationBtn');
    locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                await fetchWeatherByCoords(latitude, longitude);
            }, (error) => {
                console.error('Error getting location:', error);
                alert('Failed to track your location.');
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });
});

async function fetchWeatherByCoords(latitude, longitude) {
    const apiKey = 'e49e475c5c0f328050cfd6770a9dcd07'; // Replace with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found for your location.');
        }
        const data = await response.json();

        const weatherData = {
            locationName: data.name,
            temperature: `${data.main.temp}°C`,
            feelsLike: `${data.main.feels_like}°C`, // Feels like temperature
            description: data.weather[0].description,
            icon: data.weather[0].icon,  // Weather icon
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} m/s`
        };

        displayWeather(weatherData);
        startClock(); // Start the clock when weather data is displayed
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data for your location.');
    }
}

function displayWeather(data) {
    document.getElementById('locationName').innerText = data.locationName;
    document.getElementById('temperature').innerText = `Temperature: ${data.temperature}`;
    document.getElementById('feelsLike').innerText = `Feels like: ${data.feelsLike}`;
    document.getElementById('description').innerText = `Description: ${data.description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.humidity}`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.windSpeed}`;

    // Set the weather icon
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    weatherIcon.alt = data.description;
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000); // Update every second
}

