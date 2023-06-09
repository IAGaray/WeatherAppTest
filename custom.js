const result = document.querySelector('.result'); // Agrega el símbolo "#" para seleccionar por id
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#Country');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (nameCity.value === '' || nameCountry.value === '') {
    showError('Both fields are required');
    return;
  }

  callAPI(nameCity.value, nameCountry.value);
});


function callAPI(city, country) {
  const apiId = 'ingresa tu api aqui';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

  clearHTML()

  fetch(url)
  .then(response => response.json())
  .then(data => {
    showWeather(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
}

function showWeather(data) {
  const { name, main: { temp, temp_max, temp_min }, weather: [arr] } = data;

  const degrees = kelvinToCentigrade(temp);
  const min = kelvinToCentigrade(temp_min);
  const max = kelvinToCentigrade(temp_max);

  const content = document.createElement('div');
  content.innerHTML =
    `
    <h1>Selec your countre and city</h1>

    <h5>The weather in ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
    <h2>${degrees}°C</h2>
    <p>Max: ${max}°C</p>
    <p>Min: ${min}°C</p>`;

  result.appendChild(content);

  console.log(name);
  console.log(temp);
  console.log(temp_max);
  console.log(temp_min);
  console.log(arr.icon);
}

function showError(message) {
  console.log(message);
  const alert = document.createElement('p');
  alert.classList.add('alert-message');
  alert.innerHTML = message;

  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function kelvinToCentigrade(temp) {
  return parseInt(temp - 273.15);
}

function clearHTML() {
  result.innerHTML = '';
}