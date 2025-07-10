// Refactored by: Kalvian Team
// Refactoring Approach: Separated structure (HTML), style (CSS), and logic (JS) into files,
// used semantic class and ID names, added comments and consistent formatting.

/**
 * OpenWeatherMap API key
 * NOTE: Replace with your actual API key for production
 */
const apiKey = '3a2b4c5d6e7f8g9h0i1j2k3l4m5n6o7p';

/**
 * Fetches and displays weather data based on user input
 */
function getWeatherData() {
  const cityInput = document.getElementById('cityInput');
  const weatherResult = document.getElementById('weatherResult');
  const city = cityInput.value.trim();

  if (!city) {
    weatherResult.innerHTML = '<p class="error-message">Please enter a city name!</p>';
    return;
  }

  weatherResult.innerHTML = '<p>Loading...</p>';
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === '404') {
        weatherResult.innerHTML = '<p class="error-message">City not found!</p>';
        return;
      }

      const condition = data.weather[0].main;
      const temperature = Math.round(data.main.temp);
      const humidity = data.main.humidity;
      const cityName = data.name;

      weatherResult.innerHTML = `
        <div class="weather-condition">${condition}</div>
        <div class="temperature">${temperature}°C</div>
        <div class="details">Humidity: ${humidity}%</div>
        <div class="details">City: ${cityName}</div>
      `;
    })
    .catch((error) => {
      weatherResult.innerHTML = '<p class="error-message">Error fetching weather data!</p>';
      console.error('Fetch error:', error);
    });
}
