// JavaScript code to fetch and update sensor data
// You can use AJAX or WebSocket to fetch real-time data from your sensors and update the values and charts here
// Example code to update the values (replace with your actual implementation)
    const temperatureData = [];
    const humidityData = [];
    const moistureData = [];
    // get moister data from api
    axios.get('http://localhost:5000/soil-moisture')
    .then(response => {
      // handle success
      // moistureData = response.data.soilmoisture
      console.log(response.data.soilmoisture);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
 function updateSensorData() {
  // Fetch and update temperature value
  const temperatureValue = Math.random() * (30 - 15) + 15; // Replace with actual temperature value
  document.getElementById('temperature-value').textContent = temperatureValue.toFixed(2);
  temperatureData.push(temperatureValue); // Store temperature value
  
  // Fetch and update humidity value
  const humidityValue = Math.random() * (70 - 40) + 40; // Replace with actual humidity value
  document.getElementById('humidity-value').textContent = humidityValue.toFixed(2);
  humidityData.push(humidityValue); // Store humidity value
  
  // Fetch and update moisture value
  const moistureValue = Math.random() * 100; // Replace with actual moisture value
  document.getElementById('moisture-value').textContent = moistureValue.toFixed(2);
  moistureData.push(moistureValue); // Store moisture value
  
  // Update the charts
 }

 // Call the function to update sensor data initially
 updateSensorData();

 // Example code to update the Temperature chart

 // Attach an event listener to the threshold input element
 function updateThresholdValue() {
      const thresholdInput = document.getElementById('threshold-input');
      const thresholdValue = document.getElementById('threshold-value');
      thresholdValue.textContent = thresholdInput.value;
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

 // Example code to update the Moisture Sensor measurement (replace with your actual implementation)
 function updateMoistureSensorData() {
  // Fetch and update moisture sensor value
  const moistureValue = Math.random() * 100; // Replace with actual moisture value
  document.getElementById('moisture-value').textContent = moistureValue.toFixed(2);

  // Update the moisture chart (replace with your actual chart library code)
 

  // Check if moisture threshold is exceeded
  checkMoistureThreshold();
 }

 // Call the function to update moisture sensor data initially
 updateMoistureSensorData();

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


//  fetch(`https://github.com/shoroukhatem/Graduation-project/blob/main/package-lock.json`)
//  .then((result) => {
//     console.log(result);
//  });
 