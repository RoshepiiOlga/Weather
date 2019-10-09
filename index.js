// 1. navigation
// 2. HTTP reavest
// 3. display
var inputCity = document.getElementById('city_input');
var find_button = document.getElementById('find_button');


find_button.disabled = true; //кнопка не активна

function setButtonStatus() { //если есть текст кнопка автоматически становится активной
  find_button.disabled = !this.value;
}

function clearInput(value){
  return inputCity.value = "";
}

function error (){
  var error_id =  getElement('error');
  if(inputCity.value.length < 2){
    error_id.style.display = 'block';
  }
  else{
    error_id.style.display = 'none';
    getElement('find_city').style.opacity = '1';
  }
}

function receiveDataByCityName() {
  var name = inputCity.value;
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      cityInput (response);
    })
}

function cityInput(response) {
  error();
  clearInput();
  // progo();
  getElement('name_city').innerHTML = response.name;
  getElement('city_temperature').innerHTML = 'Температура - ' + Math.trunc(response.main.temp - 270);
  getElement('city_temp-min').innerHTML = 'Мин. температура - ' + Math.trunc(response.main.temp_min - 270);
  getElement('city_temp-max').innerHTML = 'Макс. температура - ' + Math.trunc(response.main.temp_max - 270);
  getElement('city_humidity').innerHTML = 'Влажность - ' + response.main.humidity + ' %';
  getElement('city_pressure').innerHTML = 'Давление - ' + response.main.pressure + ' мм';
}

inputCity.addEventListener('input', setButtonStatus);
find_button.addEventListener('click', receiveDataByCityName);

function getWeather() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      receiveData(position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2));
    })
  }
  else {
    alert('Could not get location.');
  }
}

function receiveData (lat, long) {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long +'&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      updateWebDate (response)
    })
}

function  updateWebDate (response) {
  getElement('current-temperature').innerHTML = 'Температура - ' + Math.trunc(response.main.temp - 270);
  getElement('current-temp-min').innerHTML = 'Мин. температура - ' + Math.trunc(response.main.temp_min - 270);
  getElement('current-temp-max').innerHTML = 'Макс. температура - ' + Math.trunc(response.main.temp_max - 270);
  getElement('current-humidity').innerHTML = 'Влажность - ' + response.main.humidity + ' %';
  getElement('current-pressure').innerHTML = 'Давление - ' + response.main.pressure + ' мм';
}
getWeather()

function getElement(id) {
  return document.getElementById(id);
}



//message

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.addEventListener('result', function (event) {
  inputCity.value = Array
    .from(event.results)
    .map(function (results) {
      return results[0];
    })
    .map(function (results) {
      return results.transcript;
    })
    .join('');
    recognition.stop();
    if(inputCity.value.length > 0){
      find_button.disabled = false;
    }
});
recognition.start();
recognition.addEventListener('end', recognition.start);

inputCity.addEventListener('input', setButtonStatus);
find_button.addEventListener('click', receiveDataByCityName);



