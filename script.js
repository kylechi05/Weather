let apiKey = "bf5b4bc38648b1b0564d37450097ee4c"

const searchCity = document.querySelector(".search");
const city = document.getElementById("search-bar");

searchCity.addEventListener('submit', () => displayData(city.value)); // Pass the City

async function displayData(x) { // Take in the City

    searchCity.reset();
    city.blur();

    const fetchData = await fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + x + "&appid=bf5b4bc38648b1b0564d37450097ee4c");
    let cityData = await fetchData.json();

    console.log(cityData);

    document.querySelector("#location").innerHTML = cityData.name;
    document.querySelector("#temperature").innerHTML = cityData.main.temp.toFixed(1) + " °F";
    document.querySelector("#feels_like").innerHTML = "Feels Like " + cityData.main.feels_like.toFixed(1) + " °F";
    document.querySelector("#description").innerHTML = cityData.weather[0].description;
    document.querySelector("#wind").innerHTML = "Wind: " + Math.round(cityData.wind.speed) + " mph";
    document.querySelector("#precipitation").innerHTML = "Precipitation: ";
    document.querySelector("#humidity").innerHTML = "Humidity: " + cityData.main.humidity + "%";

}

