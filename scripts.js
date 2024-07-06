document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    fetchWeather(location);
});

function fetchWeather(location) {
    // Replace with actual API call
    const mockData = {
        locationName: location,
        temperature: '25°C',
        description: 'Sunny',
        humidity: '60%',
        windSpeed: '10 km/h',
        forecast: [
            { day: 'Monday', high: '27°C', low: '18°C', description: 'Sunny' },
            { day: 'Tuesday', high: '25°C', low: '17°C', description: 'Partly Cloudy' },
            // Add more days
        ],
        alerts: [
            { type: 'Heatwave', description: 'High temperatures expected throughout
