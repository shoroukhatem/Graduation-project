import requests
import json
import random
import time

def send_soil_moisture_data(soil_moisture):
    url = "http://localhost:7896/iot/json"

    headers = {
        "Content-Type": "application/json"
    }

    api_key = "a1cc95dd-1b0c-41a9-83aa-f2239a3e22e5"

    payload = {
        "sm": str(soil_moisture)
    }

    params = {
        "k": api_key,
        "i": "soilmoisture001"
    }

    response = requests.post(url, headers=headers, params=params, data=json.dumps(payload))

    if response.status_code == 200:
        print("Soil moisture data sent successfully:", payload)
    else:
        print("Failed to send soil moisture data:", response.text)


def send_temperature_data():
    url = "http://localhost:7896/iot/json"

    headers = {
        "Content-Type": "application/json"
    }

    api_key = "a1cc95dd-1b0c-41a9-83aa-f2239a3e22e5"

    temperature = random.randint(10, 45)
    payload = {
        "t": str(temperature)
    }

    params = {
        "k": api_key,
        "i": "temperature001"
    }

    response = requests.post(url, headers=headers, params=params, data=json.dumps(payload))

    if response.status_code == 200:
        print("Temperature data sent successfully:", payload)
    else:
        print("Failed to send temperature data:", response.text)


def send_humidity_data(humidity):
    url = "http://localhost:7896/iot/json"

    headers = {
        "Content-Type": "application/json"
    }

    api_key = "a1cc95dd-1b0c-41a9-83aa-f2239a3e22e5"

    payload = {
        "h": str(humidity)
    }

    params = {
        "k": api_key,
        "i": "humidity001"
    }

    response = requests.post(url, headers=headers, params=params, data=json.dumps(payload))

    if response.status_code == 200:
        print("Humidity data sent successfully:", payload)
    else:
        print("Failed to send humidity data:", response.text)

def pumpState():
    url = "http://localhost:1026/v2/entities/urn:ngsi-ld:Pump:001?type=Pump&options=keyValues"
    headers = {
        'fiware-service': 'openiot',
        'fiware-servicepath': '/'
    }
    response = requests.get(url, headers=headers)
    response_dict = response.json()
    state = response_dict['state']
    return state



# Generate initial random soil moisture value
soil_moisture = random.randint(0, 100)
humidity = random.randint(20, 80)
while True:
    send_soil_moisture_data(soil_moisture)
    send_temperature_data()
    send_humidity_data(humidity)  # Assuming constant humidity of 20
    state = pumpState()
    if state == "off":
        soil_moisture -= 5
    else:
        soil_moisture += 5
    time.sleep(5)

