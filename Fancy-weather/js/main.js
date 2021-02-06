const refreshButton = document.querySelector(".refresh");
const enLang = document.querySelector('.en');
const ruLang = document.querySelector('.ru');
const fahrenheitMode = document.querySelector(".fahrenheit");
const celsiusMode = document.querySelector(".celsius");
const cityCountry = document.querySelector(".current_city");
const date = document.querySelector(".current_date");
const time = document.querySelector(".current_time");
const currentTemp = document.querySelector(".temperature_number");
const currentTempIcon = document.querySelector(".details_weather_img");
const currentWeatherDetails = document.querySelector(".details_clouds");
const currentWeatherFeels = document.querySelector(".details_feels");
const currentWeatherWind = document.querySelector(".details_wind");
const currentWeatherHumidity = document.querySelector(".details_humidity");
const weatherForecast1 = document.querySelector(".day_1");
const weatherForecast2 = document.querySelector(".day_2");
const weatherForecast3 = document.querySelector(".day_3");
const forecastTemp1 = document.querySelector(".temp_1");
const forecastTemp2 = document.querySelector(".temp_2");
const forecastTemp3 = document.querySelector(".temp_3");
const forecastIcon1 = document.querySelector(".icon_1");
const forecastIcon2 = document.querySelector(".icon_2");
const forecastIcon3 = document.querySelector(".icon_3");
const searchButton = document.querySelector(".input_submit");
const searchInput = document.querySelector(".input_search");
const positionLat = document.querySelector(".map_lat");
const positionLng = document.querySelector(".map_lng");
const backgroundContainer = document.querySelector(".weather"); 
const keyWeather = "d2c04de69ed62d66d08538028617ce18";
let now = new Date(),
  mapLatitude,
  mapLongitude;
 
function renderBackground() {
  fetch(
    "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tJdVJxD140-P3Phv2uKMuOHpswNoGoxMWavWyVbzTK0"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let bgImage = data.urls.regular;
      localStorage.setItem('bg', bgImage);
      backgroundContainer.style.backgroundImage = `linear-gradient(
                180deg,
                rgba(8, 15, 26, 0.11) 0%,
                rgba(192, 192, 252, 0.21) 100%
              ), url(${data.urls.regular})`;
      backgroundContainer.style.backgroundSize = "100% 100%";
    });
}

function getUserLocation() {
  return fetch("https://ipinfo.io/json?token=beefee580f15ff")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      alert("Something went wrong");
      console.log("err getUserLocation")
    });
}

function initUserData() {
  getUserLocation()
    .then((data) => {
      let city = localStorage.getItem("searchValue");
      let lang = localStorage.getItem("lang");
      if (city !== null) {
        return getUserData(city, lang);
      } else  {
        const currentCity = data.city;
        let lang = localStorage.getItem("lang");
        return getUserData(currentCity, lang);
      }
    })
    .then((currentUserTime) => {})
    .catch((err) => {
      alert("Something went wrong");
      console.log("err initUserData")
    });
}

function getUserData(locationCity, lang) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locationCity}&language=${lang}&key=bdca322080e3433b9f0e21d216562bea`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cityCountry.textContent = `${data.results[0].formatted}`;
    })
    .catch((err) => {
      alert("Something went wrong");
      console.log("err getUserData")
    });
}

function initNewUserData() {
  changePosition()
    .then((location) => {
      const newCity = location.results[0].components.city;
      let lang = localStorage.getItem("lang");
      return getUserData(newCity, lang);
    })
    .then((newUserData) => {})
    .catch((err) => {
      alert("Something went wrong");
      console.log("err initNewUserData")
    });
}

function initWeather() {
  getUserLocation()
    .then((location) => {
      let city = localStorage.getItem("searchValue");
      const currentCity = location.city;
      let lang = localStorage.getItem("lang");

      if (city !== null) {
        return getWeather(city, lang);
      } else {
        let lang = localStorage.getItem("lang");
        return getWeather(currentCity, lang);
      }
    })
    .catch((err) => {
      alert("Something went wrong");
      console.log("err initWeather")
    });
}

function getWeather(locationCity, lang) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&units=metric&lang=${lang}&appid=${keyWeather}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      positionLat.innerHTML = `${data.city.coord.lat}`;
      positionLng.innerHTML = `${data.city.coord.lon}`;
      let degree = localStorage.getItem("radioDegree");
      if (degree) {
        if (degree === "fahrenheit") {
          currentTemp.innerHTML = `${Math.round((data.list[0].main.temp * 9) / 5 + 32)}`;
          currentWeatherFeels.innerHTML = ` ${Math.round((data.list[0].main.feels_like * 9) / 5 + 32)}&deg`;
          forecastTemp1.innerHTML = `${Math.round((data.list[5].main.temp * 9) / 5 + 32)}&deg`;
          forecastTemp2.innerHTML = `${Math.round((data.list[13].main.temp * 9) / 5 + 32)}&deg`;
          forecastTemp3.innerHTML = `${Math.round((data.list[21].main.temp * 9) / 5 + 32)}&deg`;
        } else {
          currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
          currentWeatherFeels.innerHTML = ` ${Math.round(data.list[0].main.feels_like)}&deg`;
          forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}`;
          forecastTemp2.innerHTML = `${Math.round(data.list[13].main.temp)}`;
          forecastTemp3.innerHTML = `${Math.round(data.list[21].main.temp)}`;
        }
      }

      currentTempIcon.innerHTML =
        `<img src="/img/icons/${data.list[0].weather[0].icon}.svg">`;
      currentWeatherDetails.textContent = data.list[0].weather[0].description;
      currentWeatherWind.textContent = `${data.list[0].wind.speed} m/s`;
      currentWeatherHumidity.textContent =`${data.list[0].main.humidity} %`;
      forecastIcon1.innerHTML =`<img src="/img/icons/${data.list[5].weather[0].icon}.svg">`;
      forecastIcon2.innerHTML =`<img src="/img/icons/${data.list[13].weather[0].icon}.svg">`;
      forecastIcon3.innerHTML =`<img src="/img/icons/${data.list[21].weather[0].icon}.svg">`;

      mapLatitude = data.city.coord.lat.toFixed(2);
      mapLongitude = data.city.coord.lon.toFixed(2);

      //FORECAST WEEKDAYS//

      let week = [];

      week = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
              "Friday", "Saturday", ];
      let today = new Date();
      let day = today.getDay();
      day++;
      if (day > week.length - 1) day = 0;
        weatherForecast1.textContent = week[day];
        day++;
      if (day > week.length - 1) day = 0;
        weatherForecast2.textContent = week[day];
        day++;
      if (day > week.length - 1) day = 0;
        weatherForecast3.textContent = week[day];
      if (day > week.length - 1) day = 0;
        day++;

      mapboxgl.accessToken =
      'pk.eyJ1IjoibHVlMjEiLCJhIjoiY2tpdzV5bmM2MHJ6ejMwbnozbmE0aDhkaiJ9.WU_nweukjgiOyA7Juh20nQ';
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [mapLongitude, mapLatitude], // starting position [lng, lat]
        zoom: 9,
      });

      fahrenheitMode.addEventListener("click", () => {             
        fahrenheitMode.classList.add("button_active");
        celsiusMode.classList.remove("button_active");
            
        currentTemp.innerHTML = `${Math.round(
          (data.list[0].main.temp * 9) / 5 + 32)}`;
        currentWeatherFeels.innerHTML = `${Math.round((data.list[0].main.feels_like * 9) / 5 + 32)}&deg`;
        forecastTemp1.innerHTML = `${Math.round((data.list[5].main.temp * 9) / 5 + 32)}`;
        forecastTemp2.innerHTML = `${Math.round((data.list[13].main.temp * 9) / 5 + 32)}`;
        forecastTemp3.innerHTML = `${Math.round((data.list[21].main.temp * 9) / 5 + 32)}`;
      });
      celsiusMode.addEventListener("click", () => {        
        celsiusMode.classList.add("button_active");
        fahrenheitMode.classList.remove("button_active");

        currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
        currentWeatherFeels.innerHTML = `${Math.round(data.list[0].main.feels_like)}&deg`;
        forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}`;
        forecastTemp2.innerHTML = `${Math.round(data.list[13].main.temp)}`;
        forecastTemp3.innerHTML = `${Math.round(data.list[21].main.temp)}`;        
      });
    })
    .catch((err) => {
      alert("Something went wrong");
      console.log("err getWeather")
    });
}

function changePosition() {
  let address = searchInput.value;
  let lang = localStorage.getItem("lang");

  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${address}&language=${lang}&key=bdca322080e3433b9f0e21d216562bea`
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      alert("Something went wrong");
      console.log("err changePosition")
    });
}

function initNewWeather() {
  changePosition()
    .then((location) => {
      const currentCity = location.results[0].components.city;
      let lang = localStorage.getItem("lang");

      return getWeather(currentCity, lang);
    })
    .then((currentWhether) => {})
    .catch((err) => {
      alert("Something went wrong");
      console.log("err initNewWeather")
    });
}

function clockDate() {

  if (localStorage.getItem('lang') === 'ru') {
   
    let now = new Date(),
      hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
      minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
      seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

    let weekday = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
        "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    
    time.innerHTML = `${ hours }:${ minutes }:${ seconds }`;
    date.textContent = `${weekday[now.getDay()]} ${now.getDate()} ${month[now.getMonth()]}`;
  } else {
    let now = new Date(),
      hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
      minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
      seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let month = ["January", "February", "March", "Aplil", "May", "June", "July", 
                  "August", "Semtembre", "Octobre", "November", "December"];    
    
    time.innerHTML = `${ hours }:${ minutes }:${ seconds }`;
    date.textContent = `${weekday[now.getDay()]} ${now.getDate()} ${month[now.getMonth()]}`;
  }
}

function changeLanguage() {

  if (localStorage.getItem('lang') === 'ru') { 
    searchButton.value = 'ПОИСК';
    searchInput.placeholder = "Название города";
    document.querySelector('.coordinates_lat').innerHTML = 'Широта:';
    document.querySelector('.coordinates_lng').innerHTML = 'Долгота:';
    document.querySelector('.feels_like').textContent = 'ОЩУЩАЕТСЯ:';
    document.querySelector('.wind').textContent = 'ВЕТЕР: ';
    document.querySelector('.humidity').textContent = 'ВЛАЖНОСТЬ: ';    
  } else {
    searchButton.value = 'SEARCH';
    searchInput.placeholder = "Search city";
    document.querySelector('.coordinates_lat').innerHTML = 'Latitude:';
    document.querySelector('.coordinates_lng').innerHTML = 'Longitude:';
    document.querySelector('.feels_like').textContent = `FEELS LIKE :`;
    document.querySelector('.wind').textContent = 'WIND: ';
    document.querySelector('.humidity').textContent = 'HUMIDITY: ';
  }  
}

function dayWeek() {

  if (localStorage.getItem('lang') === 'ru') {

    let week = [];

    week = ['Воскресенье', 'Понедельник', 'Вторник', 
            'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let today = new Date();
    let day = today.getDay();
    day++;
    if (day > week.length - 1) day = 0;
      weatherForecast1.textContent = week[day];
      day++;
    if (day > week.length - 1) day = 0;
      weatherForecast2.textContent = week[day];
      day++;
    if (day > week.length - 1) day = 0;
      weatherForecast3.textContent = week[day];
    if (day > week.length - 1) day = 0;
      day++;
        
  } else {

    let week = [];
    week = ["Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday", ];
    let today = new Date();
    let day = today.getDay();
    day++;
    if (day > week.length - 1) day = 0;
      weatherForecast1.textContent = week[day];
      day++;
    if (day > week.length - 1) day = 0;
      weatherForecast2.textContent = week[day];
      day++;
    if (day > week.length - 1) day = 0;
      weatherForecast3.textContent = week[day];
      if (day > week.length - 1) day = 0;
      day++;
  }
}

enLang.addEventListener("click", () => {
  enLang.classList.add("button_active");
  ruLang.classList.remove("button_active");
});

ruLang.addEventListener("click", () => {
  ruLang.classList.add("button_active");
  enLang.classList.remove("button_active");
});

refreshButton.addEventListener("click", renderBackground);
searchButton.addEventListener("click", initNewWeather);
searchButton.addEventListener("click", initNewUserData);

searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});

ruLang.addEventListener('click', function () {
  initUserData();
  initWeather();
  localStorage.setItem('lang', 'ru');  
});

enLang.addEventListener('click', function () {
  initUserData();
  initWeather();
  localStorage.setItem('lang', 'en');  
});

searchButton.addEventListener("click", function (event) {
  let currentCity = searchInput.value;
  localStorage.setItem("searchValue", currentCity);
  renderBackground();
});


dayWeek();
setInterval(dayWeek, 500);
setInterval(changeLanguage, 500);
setInterval(clockDate, 1000);
clockDate();
initUserData();
initWeather();




































/*
let map;
let latitude = 53.902564567768394;
let longitude = 27.55628244855248;
let dateObj = new Date();

let year = dateObj.getFullYear();
let month = dateObj.getMonth();
let numDay = dateObj.getDate();
let day = dateObj.getDay();
let hour = dateObj.getHours();
let minute = dateObj.getMinutes();
  
let day_array_en=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat")
let day_array_ru=new Array("Вс.","Пн.","Вт.","Ср.","Чт.","Пт.", "Сб.")
let month_array_en=new Array("January","February","March","April","May","June",
                        "July","August","September","October","November","December")
let month_array_ru=new Array("Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
                        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря")


if (minute < 10) minute = "0" + minute;

let date_naw = daysArr_en[day] + ", " + numDay + " " + monthsArr_en[month];
let time_naw = hour + ":" + minute;
                      
let out = daysArr[day] + ", " + numDay + " " + monthsArr[month] 
          + " " + year + ", " + hour + ":" + minute + ":" + second;

document.getElementById("current_date").innerHTML = out;
let myVar=setInterval(function(){myTimer()},1000);
          
function myTimer() {
let d = new Date();
document.getElementById("current_time").innerHTML = d.toLocaleTimeString();
}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},    
    disableDefaultUI: true,
    zoom: 10      
  });  
}

*/