'use strict';
const api_key = 'f7fdd6aa792047a382d195611242206';
const weather_days = '2';
let search_input = document.getElementById("search_input");
let search_button = document.getElementById("search_button");
let row = document.getElementById("row");
let search_form = document.forms[0];
let weather_arr = [];
const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = dayName[new Date().getDay()];
const formattedDate = new Date().toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long'
}).replace(/ /g, '');
view_weather();


search_form.addEventListener("submit", function (e) {
  e.preventDefault();
  view_weather();

});


async function view_weather(country){
  weather_arr = await search_fun(search_input.value);
  display_fun();
}


async function search_fun(country) {
  if (!country) {
    country = 'Cairo';
  }
  let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${country}&days=${weather_days}`);
  return await url.json();
}


function display_fun() {
  let { location, current, forecast } = weather_arr;
  let { temp_c, condition } = current;
  let { icon, text } = condition;

  var box = `<div class="col-md-4 shadow-lg">
            <div class="card text-white card_one">
                <div class="card-header d-flex justify-content-between card_two">
                  <small class="text-secondary">${day}</small>
                  <small class="text-secondary">${formattedDate}</small>
                </div>
                <div class="card-body">
                  <h4 class="opacity-75">${location?.name}</h4>
                  <h5 class="card-title display-1 fw-bolder">${temp_c} oc</h5>
                  <img src="https:${icon}" class="card-img-top w-25 h-25" alt="...">
                  <span class="text-info">${text}</span>
                  <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <small class="text-secondary"><i class="fa-solid fa-umbrella"></i> 20%</small>
                  <small class="text-secondary"><i class="fa-solid fa-wind"></i> 18km/h</small>
                  <small class="text-secondary"><i class="fa-solid fa-compass"></i> East</small>
                </div>
              </div>
        </div>`
  console.log(typeof (forecast))
  forecast?.forecastday.forEach((element,index) => {
    let { day } = element;
    let { maxtemp_c, mintemp_c, condition } = day;
    let { icon, text } = condition;
    box += `<div class="col-md-4 shadow-lg">
            <div class="card text-white px-0 d-flex align-items-center ${(index%2==0)?"card_two":"card_one"}">
                <div class="card-header card_two w-100 text-center">
                  <small class="text-secondary">${dayName[new Date().getDay() + (index+1)]}</small>
                </div>
                <div class="card-body">
                <img src="https:${icon}" class="card-img-top w-50 h-50" alt="...">

                  <h5 class="card-title display-6 fw-bolder">${maxtemp_c} oC</h5>
                  <h5 class="card-title display-6">${mintemp_c} o</h5>
                  <span class="text-info">${text}</span>
                  <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                </div>
                
              </div>
        </div>`
  });

  row.innerHTML = box;
}

// get user current location
