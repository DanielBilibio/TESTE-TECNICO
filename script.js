const apiKey = '131f75fbd995665aa436506db58a56e0'; 

const forecastContainer = document.getElementById('5-day-forecast');
const errorMessage = document.getElementById('error-message');

document.getElementById('search-button').addEventListener('click', fetchWeather);

forecastContainer.classList.add('hidden');

async function fetchWeather() {
    const city = document.getElementById('city-input').value.trim();

    if (city === "") {
        showError("Por favor, insira o nome de uma cidade.");
        return;
    }

    try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        if (!currentWeatherResponse.ok) throw new Error("Cidade não encontrada.");
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error("Erro ao buscar previsão de 5 dias.");
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

        errorMessage.classList.add('hidden');
    } catch (error) {
        showError(error.message);
    }
}

function displayCurrentWeather(data) {
    const { name, main: { temp }, weather: [details] } = data;
    document.getElementById('current-weather').innerHTML = `
        <h2>${name}</h2>
        <p>Temperatura: ${temp}°C</p>
        <p>Clima: ${details.description}</p>
        <img src="https://openweathermap.org/img/wn/${details.icon}@2x.png" alt="${details.description}">
    `;
}

function displayForecast(data) {
    forecastContainer.innerHTML = '<h2>Previsão do tempo para os próximos 5 dias</h2>';
    forecastContainer.classList.remove('hidden'); 

    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; 
        const today = new Date().toISOString().split('T')[0]; 

        if (date > today) {
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(item);
        }
    });

    Object.keys(dailyForecasts).slice(0, 5).forEach(date => {
        const dayData = dailyForecasts[date];
        
        const temps = dayData.map(item => item.main.temp);
        const maxTemp = Math.max(...temps).toFixed(1);
        const minTemp = Math.min(...temps).toFixed(1);

        const weatherCounts = { Clear: 0, Rain: 0, Clouds: 0 };
        let rainIntensity = "Nenhuma";
        
        dayData.forEach(item => {
            const mainWeather = item.weather[0].main;
            if (weatherCounts[mainWeather] !== undefined) {
                weatherCounts[mainWeather]++;
            }
            if (mainWeather === "Rain") {
                const rainDescription = item.weather[0].description;
                if (rainDescription.includes("leve")) {
                    rainIntensity = "Chuva leve";
                } else if (rainDescription.includes("moderada")) {
                    rainIntensity = "Chuva moderada";
                } else if (rainDescription.includes("forte")) {
                    rainIntensity = "Chuva forte";
                }
            }
        });

        const predominantWeather = Object.keys(weatherCounts).reduce((a, b) => weatherCounts[a] > weatherCounts[b] ? a : b);
        const weatherDescriptions = {
            Clear: "Ensolarado",
            Rain: rainIntensity,
            Clouds: "Nublado"
        };
        const description = weatherDescriptions[predominantWeather] || "Variado";
        const icon = dayData[0].weather[0].icon;

        const forecastHTML = `
            <div class="forecast-day">
                <h3>${formatDate(date)}</h3>
                <p>Máx: ${maxTemp}°C</p>
                <p>Mín: ${minTemp}°C</p>
                <p>Clima: ${description}</p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            </div>
        `;

        forecastContainer.innerHTML += forecastHTML;
    });
}

function formatDate(dateString) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    forecastContainer.classList.add('hidden');
}
