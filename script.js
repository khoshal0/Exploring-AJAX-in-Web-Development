function getWeather() {
    var location = document.getElementById('locationInput').value;
    var unit = document.getElementById('unitSelect').value;
    var apiKey = '1f615bb5795006b01dad046d50b18c91'; // Replace with your API key
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

    showLoader();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function() {
        hideLoader();
        if (xhr.status === 200) {
            var weatherData = JSON.parse(xhr.responseText);
            displayWeather(weatherData);
            // Optionally, you can fetch forecast data here
            // fetchForecast(location, unit);
        } else {
            handleErrors(xhr);
        }
    };
    xhr.send();
}

function displayWeather(data) {
    var resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = `
        <p>Location: ${data.name}, ${data.sys.country}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Add similar functions for fetching and displaying forecast data

function toggleUnits() {
    getWeather(); // Reload weather data with the selected unit
}

function showLoader() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function handleErrors(xhr) {
    var errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p>Error: ${xhr.status} - ${xhr.statusText}</p>`;
    setTimeout(() => {
        errorContainer.innerHTML = '';
    }, 5000);
}
