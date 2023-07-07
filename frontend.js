
var moistureData = 0.0;
var thresholdInput = 0;
async function fetchTemperatureData() {
  try {
    const response = await axios.get("http://localhost:5000/temperature"); // Replace "/api/get-value" with your backend endpoint
    const temperatureData = response.data.temperature; // Assuming the response contains a "value" property
    var message = ""
    if(temperatureData>28){
      message="Give your plants extra water and skip fertilizing";
    }
    else if(temperatureData<15){
      message="Get the plant to warmer temperatures as soon as you can"
    }
    else{
      message="Temperature is good"
    }
    const valueElement = document.getElementById("temperature-value");
    valueElement.textContent = temperatureData;
    const tipElement = document.getElementById("temperature-tip");
    tipElement.textContent = message;
    
    // const tip
  } catch (error) {
    console.error(error);
  }
}

async function fetchHumidityData() {
  try {
    const response = await axios.get("http://localhost:5000/humidity"); // Replace "/api/get-value" with your backend endpoint
    const humidityData = response.data.humidity; // Assuming the response contains a "value" property
    var message = ""
    if(humidityData >= 65){
      message="use a heater or  dehumidifier";
    }
    else if(humidityData <= 55 ){
      message="use a humidifier or spray some water around the garden."
    }
    else{
      message="Humidity is good"
    }
    const valueElement = document.getElementById("humidity-value");
    valueElement.textContent = humidityData;
    const tipElement = document.getElementById("humidity-tip");
    tipElement.textContent = message;
  } catch (error) {
    console.error(error);
  }
}

async function fetchMoistureData() {
  try {
    const response = await axios.get("http://localhost:5000/soil-moisture"); // Replace "/api/get-value" with your backend endpoint
    moistureData = response.data.soilmoisture; // Assuming the response contains a "value" property
    var message = ""
    if(moistureData > 80){
      message="keep moister 41% - 80%.";
    }
    else if(moistureData < 41 ){
      message="keep moister 41% - 80%."
    }
    else{
      message="Soil Moister is good"
    }
    const valueElement = document.getElementById("moisture-value");
    valueElement.textContent = moistureData;
    const tipElement = document.getElementById("moisture-tip");
    tipElement.textContent = message;
   
  } catch (error) {
    console.error(error);
  }
}

function updateSensorData() {
  fetchMoistureData();
  fetchHumidityData();
  fetchTemperatureData();
}

// Attach an event listener to the threshold input element
function updateThresholdValue() {
  thresholdInput = document.getElementById('threshold-input').value;
  const thresholdValue = document.getElementById('threshold-value');
  thresholdValue.textContent = thresholdInput;
//  console.log(document.getElementById('threshold-input').value)
 const data = {
  "threshold" :{
     "type":"attribute",
     "value":thresholdInput
  }
};

const headers = {
  'content-type': 'application/json'
};
axios.patch("http://localhost:5000/pumpThreshold",data,{ headers } )
.then((res)=>console.log(res))     
.catch((err)=>console.log(err))
}
document.getElementById('threshold-input').addEventListener('input', updateThresholdValue);


// PUMP Code



// Function to update the actuator status display
async function updateActuatorStatus(status) {
  const actuatorStatusElement = document.getElementById("actuator-status");
  const toggleSwitch =document.querySelector('.switch input');
  actuatorStatusElement.textContent = status === "on" ? "On" : "Off";
  actuatorStatusElement.classList.toggle("on", status === "on");
  toggleSwitch.checked = status === "on" ? true : false;

}
async function ActuatorStatus(){
  const response = await axios.get('http://localhost:5000/actoatorState');
  const actoatorStatus = response.data.state;

  updateActuatorStatus(actoatorStatus);
}
function PumpCommand(command){
  if (command === "on") {
    const data = {
      "state": {
        "type" : "Text",
        "value" : "on"
    },
    "on": {
      "type" : "command",
      "value" : ""
    }
    };
    
    const headers = {
      'content-type': 'application/json'
    };
    axios.patch("http://localhost:5000/pumpCommands",data,{ headers } )
    .then((res)=>console.log(res))     
    .catch((err)=>console.log(err))
    ActuatorStatus();
  } else {
    const data = {
      "state": {
          "type" : "Text",
          "value" : "off"
      },
      "off": {
        "type" : "command",
        "value" : ""
    }
    };
    
    const headers = {
      'content-type': 'application/json'
    };
    axios.patch("http://localhost:5000/pumpCommands",data,{ headers } )
    .then((res)=>console.log(res))     
    .catch((err)=>console.log(err))
    ActuatorStatus();
  }
}
// switch code
const Switch = document.querySelector('.switch input');
Switch.addEventListener('click',()=>{
  if(Switch.checked){
    PumpCommand('on');
  }
  else{
    PumpCommand('off');
  }
});
// automation code
function automaticPump(moistureData,thresholdInput){
  
  if(moistureData < thresholdInput){
    PumpCommand('on');
    console.log(moistureData);
    console.log("on");
    
  }
  else{
    PumpCommand('off');
    console.log(moistureData);
    console.log("off");
  }
}
var isAutomationActive = true; 
function toggleOption() {
  var btn = document.getElementById("toggle-btn");
  if (btn.innerText === "Manual") {
    btn.innerText = "Automatic";
    btn.classList.add("active");
    isAutomationActive = false;
  } else {
    btn.innerText = "Manual";
    btn.classList.remove("active");
    isAutomationActive = true;
  }
}

function liveData(){
  setInterval(function(){
    updateSensorData();
    ActuatorStatus();
    if(isAutomationActive){
      automaticPump(moistureData,thresholdInput);
    }
   else{
    // switch code
    const Switch = document.querySelector('.switch input');
    Switch.addEventListener('click',()=>{
    if(Switch.checked){
      PumpCommand('on');
    }
    else{
      PumpCommand('off');
    }});
   }

  },4000)
}

document.addEventListener('DOMContentLoaded',function(){
  liveData();
});

