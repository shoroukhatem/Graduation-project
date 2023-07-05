const express = require('express');
const axios = require('axios');
const app = express();
// middleware
app.use(function (req, res, next) {

    // Websites
    res.setHeader('Access-Control-Allow-Origin', '*');

    // // Request methods 
    res.setHeader('Access-Control-Allow-Methods', '*');

    // // Request headers
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);

    next();
});
process.on('uncaughtException', function (err) {
    console.log(err);
  });
// // get for each sensor reading
app.get('/soil-moisture', async (req, res) => {
    try {
        const url = 'http://localhost:1026/v2/entities/urn:ngsi-ld:SoilMoisture:001?type=SoilMoisture&options=keyValues'
        const headers = {
           'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        } 
        const response = await axios.get(url, { headers });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});
// temperature sensor
app.get('/temperature', async (req, res) => {
    try {
        const url = 'http://localhost:1026/v2/entities/urn:ngsi-ld:Temperature:001?type=Temperature&options=keyValues'
        const headers = {
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        }
        const response = await axios.get(url, { headers });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});
//humidity
app.get('/humidity', async (req, res) => {
    try {
        const url = 'http://localhost:1026/v2/entities/urn:ngsi-ld:Humidity:001?type=Humidity&options=keyValues'
        const headers = {
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        }
        const response = await axios.get(url, { headers });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});
// actoator state
app.get('/actoatorState', async (req, res) => {
    try {
        const url = 'http://localhost:1026/v2/entities/urn:ngsi-ld:Pump:001?type=Pump&options=keyValues'
        const headers = {
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        }
        const response = await axios.get(url, { headers });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
}); 
app.use(express.json());
//actoator threshold
app.patch('/pumpThreshold', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const url = "http://localhost:1026/v2/entities/urn:ngsi-ld:Pump:001/attrs";
    const headers = {
        'Content-Type': 'application/json',
        'fiware-service': 'openiot',
        'fiware-servicepath': '/'
    };
    const data = req.body;
    axios.patch(url, data, { headers })
        .then(response => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(error.response.status).send(error.response.data);
        });
});
app.patch('/pumpCommands', (req, res) => {
    const url = "http://localhost:1026/v2/entities/urn:ngsi-ld:Pump:001/attrs";
    const headers = {
        'Content-Type': 'application/json',
        'fiware-service': 'openiot',
        'fiware-servicepath': '/'
    };
    const data = req.body;
    axios.patch(url, data, { headers })
        .then(response => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(error.response.status).send(error.response.data);
        });
});



app.listen(5000, () => {
    console.log('Server listening on port 5000');
});


