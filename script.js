const apiKey = "6a1c84b69786c8066b8a3c10bb0a2ccd";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Array to store temperature readings for averaging
let temperatureList = [];

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        console.log(data);

        // Displaying weather data in the HTML elements
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
        document.querySelector(".feel_like").innerHTML = data.main.feels_like + '°C';
        document.querySelector(".wind").innerHTML = data.wind.speed + ' Km/h';

        // Store the current temperature for averaging
        temperatureList.push(data.main.temp);

        // Display the average temperature
        const avgTemp = calculateAvgTemp();
        console.log(`Average Temperature: ${avgTemp.toFixed(2)}°C`);

        // Displaying a message if the temperature is more than 35°C
        if (data.main.temp > 35) {
            throw new Error('Temperature is more than 35 °C');
        }

        // Displaying the maximum temperature
        console.log("Maximum Temperature: " + data.main.temp_max + '°C');

        // Displaying the minimum temperature
        console.log("Minimum Temperature: " + data.main.temp_min + '°C');

        // Extracting the dominant weather condition and displaying it
        const weatherCondition = data.weather[0].main;
        document.querySelector(".condition").innerHTML = weatherCondition;
        // Format and display the last update time
        const dt = new Date(data.dt * 1000);
        const formatTime = dt.toLocaleTimeString();
        document.querySelector(".lastupdate").innerHTML = formatTime; 

    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".feel_like").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        document.querySelector(".avg_temp").innerHTML = "";
        document.querySelector(".lastupdate").innerHTML = "";
        document.querySelector(".condition").innerHTML = "";
    }
}

// Function to calculate the average temperature
function calculateAvgTemp() {
    const sum = temperatureList.reduce((acc, temp) => acc + temp, 0);
    return temperatureList.length > 0 ? sum / temperatureList.length : 0;
}

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

document.getElementById('textInput').addEventListener('input', function (e) {
    // Allow only letters and spaces
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
});
