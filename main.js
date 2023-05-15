const express = require('express');
const axios = require('axios');

const app = express();
// // get for the actuator for status
// // get for each sensor reading
app.get('/soil-moisture', async (req, res) => {
    try {
        const url = 'http://localhost:1026/v2/entities/urn:ngsi-ld:SoilMoisture:001?type=SoilMoisture&options=keyValues'
        const headers = {
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        }
        const response = await axios.get(url, { headers });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});
app.use(express.json());
//actoator threshold
app.patch('/pumpThreshold', (req, res) => {
    const url = "http://localhost:1026/v2/entities/urn:ngsi-ld:Pump:001/attrs";
    const headers = {
        'Content-Type': 'application/json',
        'fiware-service': 'openiot',
        'fiware-servicepath': '/'
    };
    const data = { "th": 50 };
    axios.patch(url, data, { headers })
        .then(response => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(error.response.status).send(error.response.data);
        });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


// const express = require('express');
// const rp = require('request-promise');

// const app = express();
// const port = 3000;

// // Set up the Orion Context Broker endpoint
// const brokerEndpoint = 'http://localhost:1026/v2';

// // Define a route to get TemperatureSensor data from Orion Context Broker
// app.get('/sensor-data', async (req, res) => {
//     try {
//         // Define the NGSI query to get the sensor data
//         const query = {
//             entity_type: 'Temperature',
//             options: 'keyValues',
//             attrs: ['temperature']
//         };

//         // Send the NGSI query to Orion Context Broker
//         const response = await rp.get({
//             url: `${brokerEndpoint}/entities`,
//             qs: query,
//             json: true
//         });

//         // Send the sensor data as the response
//         res.send(response);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error getting sensor data');
//     }
// });
// // get for the actuator for status
// // get for each sensor reading
// // Define a route to send a threshold value to Orion Context Broker
// app.post('/actuator', async (req, res) => {
//     try {
//         // Get the threshold value from the request body
//         const { threshold } = req.body;

//         // Define the NGSI update to send the threshold value to Orion Context Broker
//         const update = {
//             actuatorThreshold: {
//                 type: 'Number',
//                 value: threshold
//             }
//         };

//         // Send the NGSI update to Orion Context Broker
//         await rp.patch({
//             url: `${brokerEndpoint}/entities/TemperatureSensor/attrs`,
//             body: update,
//             json: true
//         });

//         // Send a success response
//         res.send('Threshold value sent successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error sending threshold value');
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });