const key = "";

const windDirection = {0: "N", 1: "NNE", 3: "NE", 4: "ENE",
                       5: "E", 6: "ESE", 7: "SE", 8: "SSE",
                       9: "S", 10: "SSW", 11: "SW", 12: "WSW",
                       13: "W", 14: "WNW", 15: "NW", 16: "NNW"}

const searchCity = document.querySelector(".search");
const city = document.getElementById("search-bar");

searchCity.addEventListener('submit', () => displayData(city.value)); // Pass the City

async function displayData(x) { // Take in the City

    searchCity.reset();
    city.blur();

const fetchData = await fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + x + "&appid=" + key);
    let cityData = await fetchData.json();

    console.log(cityData);

    document.querySelector("#location").innerHTML = cityData.name;
    document.querySelector("#temperature").innerHTML = cityData.main.temp.toFixed(1) + " °F";
    document.querySelector("#feels_like").innerHTML = "Feels Like " + cityData.main.feels_like.toFixed(1) + " °F";
    document.querySelector("#description").innerHTML = cityData.weather[0].description;
    document.querySelector("#wind").innerHTML = "Wind: " + Math.round(cityData.wind.speed) + " mph";
    document.querySelector("#humidity").innerHTML = "Humidity: " + cityData.main.humidity + "%";

}

