
document.addEventListener("DOMContentLoaded", () => {

    const cityInput = document.querySelector("#city-input");
    const cityInfo = document.querySelector("#city-info");
    const cityDiv = document.querySelector("main");
    const errorDiv = document.querySelector("#error-msg")
    
    function displayCityData(data) {
        cityDiv.style.height = "auto";
        cityDiv.style.justifyContent = "flex-start";
        errorDiv.classList.add("hidden");
        cityInfo.classList.remove("hidden");
        document.querySelector("#cur-year").textContent = new Date().getFullYear();
        document.querySelector("#weather-img").setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        document.querySelectorAll(".country-flag").forEach(cur => cur.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`));
        document.querySelector("#lat").textContent = data.coord.lat;
        document.querySelector("#lon").textContent = data.coord.lon;
        document.querySelector("#cur-city").textContent = data.name;
        document.querySelector("#cur-country").textContent = data.sys.country;
        document.querySelector("#wea-main").textContent = data.weather[0].main;
        document.querySelector("#wea-desc").textContent = data.weather[0].description;
        document.querySelector("#temp-main").textContent = data.main.temp;
        document.querySelector("#temp-feels-like").textContent = data.main.feels_like;
        document.querySelector("#temp-min").textContent = data.main.temp_min;
        document.querySelector("#temp-max").textContent = data.main.temp_max;
        document.querySelector("#city-air-pressure").textContent = data.main.pressure;
        document.querySelector("#city-humidity").textContent = data.main.humidity;
        document.querySelector("#city-sealevel").textContent = data.main.sea_level;
        document.querySelector("#city-grndlevel").textContent = data.main.grnd_level;
        document.querySelector("#wind-speed").textContent = data.wind.speed;
        document.querySelector("#wind-deg").textContent = data.wind.deg;
        document.querySelector("#wind-gust").textContent = data.wind.gust;
        document.querySelector("#city-clouds").textContent = data.clouds.all;
        document.querySelector("#city-timezone").textContent = data.timezone;
        document.querySelector("#city-dt").textContent = data.dt;
        document.querySelector("#city-sunrise").textContent = data.sys.sunrise;
        document.querySelector("#city-sunset").textContent = data.sys.sunset;
    }
    
    async function manageError() {
        cityDiv.style.height = "60vh";
        cityDiv.style.justifyContent = "center";
        cityInfo.classList.add("hidden");
        errorDiv.classList.remove("hidden");
        setTimeout(() => {
            errorDiv.classList.add("hidden");
        }, 5000);
    }

    async function fetchCityData(city) {
        try {
            const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
            if (response.ok == true) {
                return await response.json();
            }
            await manageError();
            throw new Error("Error 404, City not found!");
        } catch (e) {
            await manageError();
        }
    }

    document.querySelector("#input-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const cityName = cityInput.value.trim();
        if (!cityName) {
            return;
        }
        cityInput.value = "";
        const data = await fetchCityData(cityName);
        if (data == undefined || data.cod != 200) {
            manageError();
        } else {
            displayCityData(data);
        }
    });

});