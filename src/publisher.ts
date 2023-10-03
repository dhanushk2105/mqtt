// MQTT Publisher
import * as mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:1883')
const topic = "Pulse Enery Test"
const message = "This is a data from publisher"

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message)
        console.log("Pub: ", message)
    }, 5000)
})