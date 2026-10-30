const API_KEY = "YOUR_API_KEY";
let chart;

const getUrl = city =>
 `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

function printStatus(message, callback){
 document.getElementById("status").textContent=message;
 if(callback) callback();
}

async function loadWeather(city){
 printStatus("Loading weather...", () => console.log("Request started"));
 try{
   const response = await fetch(getUrl(city));
   if(!response.ok) throw new Error("City not found or API request failed");
   const data = await response.json();
   const points = data.list.slice(0, 8);
   const labels = points.map(x => new Date(x.dt*1000).toLocaleTimeString());
   const temps = points.map(x => x.main.temp);

   if(chart) chart.destroy();
   chart = new Chart(document.getElementById("chart"),{
     type:"line",
     data:{labels,datasets:[{label:"Temperature (°C)",data:temps}]},
     options:{responsive:true}
   });
   document.getElementById("status").textContent=`Weather loaded for ${data.city.name}`;
 }catch(err){
   document.getElementById("status").textContent=err.message;
 }
}

document.getElementById("btn").addEventListener("click",()=>loadWeather(document.getElementById("city").value));
