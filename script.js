const key = "";

const windDirection = {0: "N", 1: "NNE", 2: "NE", 3: "ENE",
                       4: "E", 5: "ESE", 6: "SE", 7: "SSE",
                       8: "S", 9: "SSW", 10: "SW", 11: "WSW",
                       12: "W", 13: "WNW", 14: "NW", 15: "NNW"}

const searchCity = document.querySelector(".search");
const city = document.getElementById("search-bar");

searchCity.addEventListener('submit', () => displayData(city.value)); // Pass the City

async function displayData(x) { // Take in the City
    var t;
    clearTimeout(t);
    searchCity.reset();
    city.blur();

    const fetchData = await fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + x + "&appid=" + key);
    let cityData = await fetchData.json();
    console.log(cityData);

    function displayTime() {
        let currDate = new Date();
        let utcHours = currDate.getUTCHours();
        let utcMins = currDate.getUTCMinutes();
        let utcSecs = currDate.getUTCSeconds();
        
        utcHours = (utcHours + cityData.timezone / 60 / 60) % 24;
        utcHours = String(utcHours).padStart(2, "0");
        utcSecs = String(utcSecs).padStart(2, "0");
        utcMins = String(utcMins).padStart(2, "0");

        let currTime = utcHours + ":" + utcMins + ":" + utcSecs;
        document.querySelector("#time").innerHTML = currTime;
        t = setTimeout(displayTime, 1000);
    }

    document.querySelector("#location").innerHTML = cityData.name;
    displayTime();
    document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + cityData.weather[0].icon + "@2x.png";
    document.querySelector("#temperature").innerHTML = cityData.main.temp.toFixed(1) + " °F";
    document.querySelector("#feels_like").innerHTML = "Feels Like " + cityData.main.feels_like.toFixed(1) + " °F";
    document.querySelector("#description").innerHTML = cityData.weather[0].description;
    document.querySelector("#wind").innerHTML = "Wind: " + Math.round(cityData.wind.speed) + " mph " + windDirection[Math.floor((cityData.wind.deg + 11.25) / 22.5) % 16];
    document.querySelector("#humidity").innerHTML = "Humidity: " + cityData.main.humidity + "%";
}

