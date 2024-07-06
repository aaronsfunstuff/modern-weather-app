document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    fetchWeather(location);
});

async function fetchWeather(location) {
    const apiKey = 'e49e475c5c0f328050cfd6770a9dcd07';  // 
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
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} m/s`,
            forecast: [],  // You can add forecast data here by making another API call if needed
            alerts: []  // You can add weather alerts here if needed
        };
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    document.getElementById('locationName').innerText = data.locationName;
    document.getElementById('temperature').innerText = `Temperature: ${data.temperature}`;
    document.getElementById('description').innerText = `Description: ${data.description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.humidity}`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.windSpeed}`;
    
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    data.forecast.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <p>${day.day}</p>
            <p>High: ${day.high}</p>
            <p>Low: ${day.low}</p>
            <p>${day.description}</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });

    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';
    data.alerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        alertDiv.innerHTML = `
            <p>${alert.type}</p>
            <p>${alert.description}</p>
        `;
        alertsContainer.appendChild(alertDiv);
    });
}
