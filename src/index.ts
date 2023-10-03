import express, { Express } from 'express';
import mqttRoutes from './routes/mqtt';

const app: Express = express();

app.use('/mqtt', mqttRoutes);

const PORT = 3000;

// Start the Express server and handle errors
const server = app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Express server error:', err);
});

export default app