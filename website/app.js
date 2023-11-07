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

        postData('/added', {date: newDate, temp:info.main.temp, content:feelings})
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
// Async POST
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

  const updateUI = async() => {
    const request = await fetch('/all');
    try{
      const allData = await request.json;
        document.getElementById('date').innerHTML = "Date: " + allData[0].date;
        document.getElementById('temp').innerHTML = "Current Temperature: " + Math.round(allData[0].temp) + "&degC";
        document.getElementById('feelings').innerHTML = "I feel : " + allData[0].content;

   }catch(error){
    console.log("error", error);
    // appropriately an error
   };
};


