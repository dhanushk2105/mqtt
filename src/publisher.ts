import * as mqtt from 'mqtt';
import loadData from './utils/loadData';

interface DataPoint{
    charge_point_id: string,
    payload: any
}

// Define the number of clients you want to create
const numClients = 10; // Change this to the desired number

// An array to store client objects
const clients: any = [];

async function getData() {
    try {
        const data = await loadData()
        return data
    } catch (error) {
        console.log(error)
    }
}

getData().then((data : any) => {
    // Create and configure MQTT clients
    for (let i = 0; i < numClients; i++) {
        const randomIndex = Math.floor(Math.random() * 1000)
        const randomCID = data[randomIndex]?.charge_point_id
        const client = mqtt.connect('mqtt://localhost:1883',{
            clientId: randomCID
        });

        //id
        const topic = `Pulse Enery Test`;
        
        clients.push({ client, topic });
        
        client.on('connect', () => {
            setInterval(() => {
                const filteredArr : DataPoint[] = data.filter( (item: { charge_point_id: string | undefined; }) => item.charge_point_id === client.options.clientId)
                const randomPayloadIndex = Math.floor(Math.random() * filteredArr.length)
                const message: any = `${JSON.stringify(filteredArr[randomPayloadIndex]?.payload?.meterValue)}`;
                client.publish(topic, message);
                console.log(`Client ${data[randomIndex]?.charge_point_id} published: ${message}`);
            }, 5000);
        });
    }
})