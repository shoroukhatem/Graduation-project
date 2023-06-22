// Example code to update the values (replace with your actual implementation)
const tempData = [];
const humData = [];
const moisData = [];

axios.get('http://localhost:5000/soil-moisture')
.then(response => {
  // handle success
  moistureData = response.data.soilmoisture
  console.log(response.data.soilmoisture);
})
.catch(error => {
  // handle error
  console.log(error);
});

axios.get('http://localhost:5000/temperature')
.then(response => {
  // handle success
  temperatureData = response.data.temperature
  console.log(response.data.temperature);
})
.catch(error => {
  // handle error
  console.log(error);
});

  axios.get('http://localhost:5000/humidity')
.then(response => {
  // handle success
  humidityData = response.data.humidity
  console.log(response.data.humidity);
})
.catch(error => {
  // handle error
  console.log(error);
});
  axios.get('http://localhost:5000/actoatorState')
.then(response => {
  // handle success
  updateActuatorStatus(response.data.state);  
  console.log(response.data.state);  
})
.catch(error => {
  // handle error
  console.log(error);
});

function updateSensorData() {
// Fetch and update temperature value
const temperatureValue = temperatureData // Replace with actual temperature value
document.getElementById('temperature-value').textContent = temperatureValue.toFixed(2);
tempData.push(temperatureValue); // Store temperature value

// Fetch and update humidity value
const humidityValue = humidityData // Replace with actual humidity value
document.getElementById('humidity-value').textContent = humidityValue.toFixed(2);
humData.push(humidityValue); // Store humidity value

// Fetch and update moisture value
const moistureValue = moistureData// Replace with actual moisture value
document.getElementById('moisture-value').textContent = moistureValue.toFixed(2);
moisData.push(moistureValue); // Store moisture value

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


// Function to check if the current moisture value exceeds the threshold
function checkMoistureThreshold() {
const moistureValue = parseFloat(document.getElementById('moisture-value').textContent);
const thresholdValue = parseFloat(document.getElementById('threshold-input').value);

if (moistureValue > thresholdValue) {
// Perform action when threshold is exceeded
console.log('Moisture threshold exceeded!');
// Add your custom logic here
}
}

// Call the function to check the moisture threshold initially
checkMoistureThreshold();

// Call the function to update moisture sensor data initially

// Function to update the actuator status display
function updateActuatorStatus(status) {
const actuatorStatus = document.getElementById('actuator-status');

// Clear previous classes
actuatorStatus.classList.remove('actuator-on', 'actuator-off');

// Update status text and apply corresponding class
actuatorStatus.classList.add(status ? 'actuator-on' : 'actuator-off');
}

// Attach an event listener to the toggle actuator button

// Call the function to update the actuator status initially
updateActuatorStatus(false); // Set initial status to "Off"
