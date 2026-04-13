const apiKey = "747d341913591615216420c92e245281";

// Get Weather
async function getWeather(cityInput = null) {
  const city = cityInput || document.getElementById("cityInput").value.trim();

  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found ");
      return;
    }

    updateUI(data);
    getForecast(data.name);
    saveCity(data.name);

  } catch (error) {
    alert("Error fetching weather ");
    console.log(error);
  }
}

// Update UI
function updateUI(data) {
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;

  document.getElementById("humidity").innerText =
    "Humidity: " + data.main.humidity + "%";
  document.getElementById("wind").innerText =
    "Wind: " + data.wind.speed + " km/h";
  document.getElementById("pressure").innerText =
    "Pressure: " + data.main.pressure + " hPa";

  const iconCode = data.weather[0].icon;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Forecast + Hourly
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    let forecastHTML = "";
    let hourlyHTML = "";

    // 5-day forecast
    data.list
      .filter((item, index) => index % 8 === 0)
      .slice(0, 5)
      .forEach(item => {
        forecastHTML += `
          <div class="forecast-card">
            <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
            <p>${item.main.temp}°C</p>
          </div>
        `;
      });

    // Hourly (next 12 hours)
    data.list.slice(0, 8).forEach(item => {
      const time = new Date(item.dt_txt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      hourlyHTML += `
        <div class="hour-card">
          <p>${time}</p>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
          <p>${item.main.temp}°C</p>
        </div>
      `;
    });

    document.getElementById("forecast").innerHTML = forecastHTML;
    document.getElementById("hourly").innerHTML = hourlyHTML;

  } catch (error) {
    console.log("Forecast error:", error);
  }
}

// Search Suggestions
async function searchCity(query) {
  const suggestionsBox = document.getElementById("suggestions");

  if (!query.trim()) {
    suggestionsBox.innerHTML = "";
    return;
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    suggestionsBox.innerHTML = "";

    data.forEach(city => {
      const div = document.createElement("div");
      div.innerText = `${city.name}, ${city.country}`;
      div.style.padding = "10px";
      div.style.cursor = "pointer";

      div.onclick = () => {
        document.getElementById("cityInput").value = city.name;
        suggestionsBox.innerHTML = "";
        getWeather(city.name);
      };

      suggestionsBox.appendChild(div);
    });

  } catch (error) {
    console.log("Suggestion error:", error);
  }
}

// Save City
function saveCity(city) {
  city = city.toLowerCase();

  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  // remove duplicate
  cities = cities.filter(c => c !== city);

  // add to top
  cities.unshift(city);

  // keep only 5
  cities = cities.slice(0, 5);

  localStorage.setItem("cities", JSON.stringify(cities));
  showSavedCities();
}

// Delete Single City
function deleteCity(cityToDelete) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  cities = cities.filter(city => city !== cityToDelete);

  localStorage.setItem("cities", JSON.stringify(cities));
  showSavedCities();
}

// 🗑 Clear All Cities
function clearAllCities() {
  localStorage.removeItem("cities");
  showSavedCities();
}

// Show Saved Cities
function showSavedCities() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  const container = document.getElementById("cards");

  container.innerHTML = "";

  cities.forEach(city => {
    const card = document.createElement("div");
    card.className = "card";

    // city name
    const name = document.createElement("span");
    name.innerText = city;
    name.style.cursor = "pointer";

    name.onclick = () => getWeather(city);

    // delete button
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.style.border = "none";
    delBtn.style.background = "transparent";
    delBtn.style.cursor = "pointer";
    delBtn.style.color = "red";

    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteCity(city);
    };

    card.appendChild(name);
    card.appendChild(delBtn);

    container.appendChild(card);
  });
}

// GPS Weather
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        updateUI(data);
        getForecast(data.name);

      } catch (error) {
        console.log("GPS error:", error);
      }
    });
  }
}

// Load on Start
window.onload = () => {
  showSavedCities();

  const cities = JSON.parse(localStorage.getItem("cities"));

  if (cities && cities.length > 0) {
    getWeather(cities[0]);
  } else {
    getLocationWeather();
  }
};
