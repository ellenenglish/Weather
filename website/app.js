/* Global Variables */


// Personal API KEY For OpenWeatherMap API
//units=metric to get Temp in celisus
let apiKey = '&appid=fbd37568d48d1d282e9c662b54944c2b&units=imperial';

// The URL TO retrieve weather information from API (Country ID US)
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';



// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.toDateString();



document.getElementById('generate').addEventListener('click', getUserInfo);

function getUserInfo(e){
    const zip =  document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
    .then(function(info) {

        postData('/added', {date: newDate, temp:info.main.temp, content:feelings, high:info.main.max, low: info.main.low})
    })
};


const getWeather = async (baseURL, zip, apiKey)=>{
  try {
    const weatherResponse = await fetch(baseURL+zip+apiKey);
    const data = await weatherResponse.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch (url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
  
      try {
        updateInfo()
      }catch(error) {
      console.log("error", error);
      };
  };


  const updateInfo = async() => {
    const request = await fetch('/all')
    try{
      const newData = await request.json;
        document.getElementById('date').innerHTML = "Date: " + newData.date;
        document.getElementById('temp').innerHTML = "Current Temperature: " + Math.round(newData.temp) + "&degC";
        document.getElementById('feelings').innerHTML = "I feel : " + newData.content;

   }catch(error){
    console.log("error:", error);
    // appropriately an error
   };
};



