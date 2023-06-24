

async function fetchTemperatureData() {
  try {
    const response = await axios.get("http://localhost:5000/temperature"); // Replace "/api/get-value" with your backend endpoint
    const temperatureData = response.data.temperature; // Assuming the response contains a "value" property
    // updatetemperatureData(temperatureValue);
    const valueElement = document.getElementById("temperature-value");
    valueElement.textContent = temperatureData;
  } catch (error) {
    console.error(error);
  }
}

async function fetchHumidityData() {
  try {
    const response = await axios.get("http://localhost:5000/humidity"); // Replace "/api/get-value" with your backend endpoint
    const humidityData = response.data.humidity; // Assuming the response contains a "value" property
    // updatehumidityData(value);
    const valueElement = document.getElementById("humidity-value");
    valueElement.textContent = humidityData;
  } catch (error) {
    console.error(error);
  }
}

async function fetchMoistureData() {
  try {
    const response = await axios.get("http://localhost:5000/soil-moisture"); // Replace "/api/get-value" with your backend endpoint
    const moistureData = response.data.soilmoisture; // Assuming the response contains a "value" property
    // updateValue2(value);
    const valueElement = document.getElementById("moisture-value");
    valueElement.textContent = moistureData;
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
  const thresholdInput = document.getElementById('threshold-input').value;
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


// Call the function to update moisture sensor data initially

// Function to update the actuator status display
async function updateActuatorStatus(status) {
const valueElement = document.getElementById('actuator-status');
valueElement.classList.remove('actuator-on', 'actuator-off');
// Update status text and apply corresponding class
valueElement.classList.add(status? 'actuator-on' : 'actuator-off');
}
async function ActuatorStatus(){
  var status = false;
  const response = await axios.get('http://localhost:5000/actoatorState');
  const actoatorStatus = response.data.state;
  if (actoatorStatus == "on"){
     status = true;
  }
  updateActuatorStatus(status);
}

function liveData(){
  setInterval(function(){
    updateSensorData();
    ActuatorStatus();
  },3000)
}

document.addEventListener('DOMContentLoaded',function(){
  liveData();
});

