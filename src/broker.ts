import Aedes from 'aedes'
import { createServer } from 'net'
import db from './db/db'

const port = 1883

const aedes = new Aedes()
const server = createServer(aedes.handle)

aedes.on('subscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
        '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'), 'from broker', aedes.id)
})

aedes.on('unsubscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
        '\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker', aedes.id)
})

aedes.on('publish', async function (packet, client) {
    console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)

    if (client) {
        const sql = 'INSERT INTO mqtt_log (client_id, meter_value_record) VALUES (?, ?)';
        db.run(sql, [(client ? client.id : 'BROKER_' + aedes.id), packet.payload.toString()]);
    }
})

server.on("connection", () => {
    console.log("client conneted")
})

server.listen(port, function () {
    console.log('MQTT running on port ', port)
})