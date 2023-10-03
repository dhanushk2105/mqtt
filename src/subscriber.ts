// MQTT Client
import * as mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:1883')
const topic = "Pulse Enery Test"

client.on('message', (topic, message) => {
    const msg = message.toString()
    console.log(topic, msg)
})

client.on('connect', () => {
    client.subscribe(topic)
})