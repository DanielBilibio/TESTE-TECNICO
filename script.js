const apiKey = '131f75fbd995665aa436506db58a56e0'; 

document.getElementById('search-button').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        if (city.trim() === "") {
            throw new Error("Por favor, insira o nome de uma cidade.");
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Cidade não encontrada.");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('error-message').classList.remove('hidden');
    }
}

function displayWeather(data) {
    const { name, main: { temp }, weather: [details] } = data;
    document.getElementById('weather-info').innerHTML = `
        <h2>${name}</h2>
        <p>Temperatura: ${temp}°C</p>
        <p>Clima: ${details.description}</p>
        <img src="https://openweathermap.org/img/wn/${details.icon}@2x.png" alt="${details.description}">
    `;
    document.getElementById('error-message').classList.add('hidden');
}
