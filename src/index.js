function refreshWeather(response){
    let temperatureElement=document.querySelector("#temperature");
let temperature= response.data.temperature.current;
  let cityElement=document.querySelector("#city");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windSpeedElement= document.querySelector("#wind-speed");
  let timeElement= document.querySelector("#time");
  let date=new Date (response.data.time * 1000);
let iconElement=document.querySelector("#icon");

  cityElement.innerHTML=response.data.city;
  timeElement.innerHTML = formatDate (date);
  descriptionElement.innerHTML=response.data.condition.description;
  humidityElement.innerHTML=` ${response.data.temperature.humidity}% `;
  windSpeedElement.innerHTML= ` ${response.data.wind.speed} km/h`;
temperatureElement.innerHTML=Math.round(temperature);
iconElement.innerHTML=`<img src="${response.data.condition.icon_url}"  class="weather-app-icon"  />`;
getForecast(response.data.city);
}

function formatDate(date) {

let minuets=date.getMinutes();
let hour=date.getHours();
let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day= days[date.getDay()];
if (minuets<10) {minuets= `0${minuets}`};
return `${day} ${hour}:${minuets}`
}


function searchCity(city){
let apiKey="o0bta765574648ffe02e8d81539be096";
apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(refreshWeather);
}

function handleSearch (event){
    event.preventDefault();
autocomplete="off";
    let searchInput= document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
}


function getForecast(city){
let apiKey="o0bta765574648ffe02e8d81539be096";
apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
axios(apiUrl).then(displayForecast);
}







function displayForecast(response){
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
let forecastHtml="";
days.forEach(function (day) {
   forecastHtml= 
   forecastHtml +
    `
 <div class= "weather-forecast-day">
<div class= "weather-forecast-date">${day}</div>
<div class = "weather-forecast-icon">🌤️ </div>
<div class= "weather-forecast-temperatures"> 
<div class= "weather-forecast-temperature"> 
<strong> 15 </strong>
</div>
<div class="weather-forecast-temperature"> 9 </div>
</div>
  </div>
`;
});
 let forecastElement= document.querySelector("#forecast");

forecastElement.innerHTML=forecastHtml;
}

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);
let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener("submit", handleSearch);
searchCity("Midlothian");

