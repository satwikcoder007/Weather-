//this function is for searching city
 function searchCity()
{
  document.getElementById("btn1").disabled=false;
  document.getElementById("btn2").disabled=true;
  let target=document.getElementById("search");
  target.setAttribute("class","flex w-[500px] justify-start pl-[70px] mt-[50px]");
  target=document.getElementById("content");
  target.setAttribute("class","w-full  box-border mt-[40px] flex flex-col items-center hidden");
  target=document.getElementById("cityName");
  target.textContent="Fetching Your Data.....";
  resetStatus();
  resetTemparature();
  resetWind();
  resetHumidity();
  resetCloud();

}

function searchBar()
{
  let target=document.getElementById("cityName");
  target.textContent="Fetching Your Data.....";
  resetStatus();
  resetTemparature();
  resetWind();
  resetHumidity();
  resetCloud();
  target=document.getElementById("searchValue");
  let searchVal=target.value;
  city=searchVal;
  target=document.getElementById("content");
  target.setAttribute("class","w-full  box-border mt-[40px] flex flex-col items-center");
  getYourWeather();
  
}
var lat=0;
var lng=0;
var city="";
var windSpeed=0;
var humidity=0;
var clouds=0;
var temparature=0;

//thius function givw my current location
async function YourWeather()
{
  let target=document.getElementById("cityName");
  target.textContent="Fetching Your Data.....";
  resetStatus();
  resetTemparature();
  resetWind();
  resetHumidity();
  resetCloud();
  document.getElementById("btn1").disabled=true;
  document.getElementById("btn2").disabled=false;
  target=document.getElementById("search");
  target.setAttribute("class","flex w-[500px] justify-start pl-[70px] mt-[50px] hidden");
  target=document.getElementById("content");
  target.setAttribute("class","w-full  box-border mt-[40px] flex flex-col items-center");
  if ("geolocation" in navigator) 
  {
     let abc=new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            resolve(lat,lng);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
     })
     abc
        .then((lat,lng)=>{
          getYourCity(lat,lng);
        })
  } 
}

//this function fetch the weather details from city name
function getYourWeather()
{
  
  const option={
    method: 'GET',
    headers: { 'X-Api-Key': 'FBrE6KVdpGClpOq90iLYTg==OLvMgtA6PUfS0606'}
  };

  fetch("https://api.api-ninjas.com/v1/weather?city="+city,option)
    .then((value)=>value.json())
    .then((value)=>{
      clouds=value.cloud_pct;
      windSpeed=value.wind_speed;
      humidity=value.humidity;
      temparature=value.temp;
      printWeather();
    });
}

//this function help to get the city from the lat and lng
function getYourCity(lat,lng)
{
  const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+lng+'&localityLanguage=en';
  const options = {
	  method: 'GET',
	  headers: {

    }

  };
  fetch(url,options)
      .then((value)=>value.json())
      .then((value)=>{
        city=value.city;
        getYourWeather();
      });
}
//this function print the details of weather
function printWeather()
{
  let target=document.getElementById("cityName");
  target.innerText=city;

  target=document.getElementById("skyStatus");
  target.innerText=getStatus();
  setTemparature();
  setWind();
  setCloud();
  setHumidity();

}

// this function basically returns the staus of sky
function getStatus()        
{
  let target=document.getElementById("loader");
  target.setAttribute("class","hidden");
  target=document.getElementById("image");
  let newElement=document.createElement("div");
  newElement.setAttribute("id","temp");
  if(clouds<=30)
  {
      newElement.innerHTML="<img src='images/sun.png'  alt=''>";
      target.appendChild(newElement);
      return "Clear";
  }
  if(clouds>30 && clouds<=60)
  {
    newElement.innerHTML="<img src='images/partly-cloudy.png'  alt=''>";
    target.appendChild(newElement);
    return "Partly-cloudy";
  }
  if(clouds>60 && clouds<=100)
  {
      newElement.innerHTML="<img src='images/overcast.png'  alt=''>";
      target.appendChild(newElement);
      return "cloudy";
  }
}

function setWind()
{
  let target=document.getElementById("loader1");
  target.setAttribute("class","hidden");
  target=document.getElementById("windSpeed");
  target.textContent=windSpeed+"mi/hr"
  target=document.getElementById("wi");
  target.setAttribute("class","relative");
}
function setHumidity()
{
  let target=document.getElementById("loader2");
  target.setAttribute("class","hidden");
  target=document.getElementById("Humidity");
  target.textContent=humidity+"%"
  target=document.getElementById("hi");
  target.setAttribute("class","relative");
}
function setCloud()
{
  let target=document.getElementById("loader3");
  target.setAttribute("class","hidden");
  target=document.getElementById("clouds");
  target.textContent=clouds+"%"
  target=document.getElementById("ci");
  target.setAttribute("class","relative");
}

function setTemparature()
{
  let target=document.getElementById("Temparature");
  target.textContent=temparature+"ºC"
}

function resetTemparature()
{
  let target=document.getElementById("Temparature");
  target.textContent="  ";
}
function resetStatus()
{
  let target=document.getElementById("skyStatus");
  target.innerText="  ";
  target=document.getElementById("temp");
  if(target!=null) target.remove();
  target=document.getElementById("loader");
  target.setAttribute("class","w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black");
}

function resetWind()
{
  let target=document.getElementById("loader1");
  target.setAttribute("class","w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black");
  target=document.getElementById("windSpeed");
  target.textContent=" "
  target=document.getElementById("wi");
  target.setAttribute("class","relative hidden");
}

function resetHumidity()
{
  let target=document.getElementById("loader2");
  target.setAttribute("class","w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black");
  target=document.getElementById("Humidity");
  target.textContent="  "
  target=document.getElementById("hi");
  target.setAttribute("class","relative hidden");
}

function resetCloud()
{
  let target=document.getElementById("loader3");
  target.setAttribute("class","w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black");
  target=document.getElementById("clouds");
  target.textContent=" "
  target=document.getElementById("ci");
  target.setAttribute("class","relative hidden");
}


