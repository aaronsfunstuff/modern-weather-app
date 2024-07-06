document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    fetchWeather(location);
});

async function fetchWeather(location) {
    const apiKey = 'e49e475c5c0f328050cfd6770a9dcd07';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();

        const weatherData = {
            locationName: data.name,
            temperature: `${data.main.temp}°C`,
            description: data.weather[0].description,
            icon: data.weather[0].icon, 
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} m/s`
        };

        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    document.getElementById('locationName').innerText = data.locationName;
    document.getElementById('temperature').innerText = data.temperature;
    document.getElementById('description').innerText = `Description: ${data.description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.humidity}`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.windSpeed}`;
    
    // Set the weather icon
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    weatherIcon.alt = data.description;
}

