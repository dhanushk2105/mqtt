# Pulse Energy README

## Overview
Pulse Energy is a Node.js application that enables the management and monitoring of energy data using MQTT (Message Queuing Telemetry Transport) protocol. It provides functionalities for publishing and subscribing to energy-related data and is built using various Node.js libraries and TypeScript.

## Installation
Before you start, make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

To install the necessary dependencies, navigate to the project's root directory and run:

```bash
npm install
```

This will install both runtime and development dependencies listed in the `package.json` file.

## Usage

### Development

To run the application in development mode, you can use the following npm scripts:

- Start the main application:
  ```bash
  npm run dev
  ```

- Start the MQTT broker:
  ```bash
  npm run broker-dev
  ```

- Start a subscriber:
  ```bash
  npm run sub-dev
  ```

- Start a publisher:
  ```bash
  npm run pub-dev
  ```

### Customizing Mock Clients in `publisher.ts`

In the `publisher.ts` file, you can customize the behavior of the mock clients. These mock clients simulate publishing energy data to the MQTT broker. Here's how you can customize them:

1. **Number of Clients**: You can change the number of clients you want to create by modifying the `numClients` variable in `publisher.ts`.

   ```javascript
   const numClients = 10; // Change this to the desired number
   ```

2. **Client Configuration**: You can further customize the client configuration, such as the MQTT broker URL and client ID. The client IDs are randomly selected from your data.

   ```javascript
   const client = mqtt.connect('mqtt://localhost:1883', {
       clientId: randomCID
   });
   ```

3. **Publishing Frequency**: The clients publish data at a specified interval. You can adjust the publishing frequency by modifying the `setInterval` function. The current interval is set to 5000 milliseconds (5 seconds).

   ```javascript
   setInterval(() => {
       // ...
   }, 5000); // Adjust this interval as needed
   ```

4. **Data to Publish**: The data being published is randomly selected from your dataset. You can customize how data is selected or modify the data payload before publishing it.

   ```javascript
   const message: any = `${JSON.stringify(filteredArr[randomPayloadIndex]?.payload?.meterValue)}`;
   ```

Feel free to customize these parameters to match your requirements for simulating energy data publishing using the mock clients in `publisher.ts`.

# API Endpoint Documentation

## Main URL
- Base URL: http://localhost:3000/

This document provides information about the available API endpoints for interacting with the MQTT data. The MQTT API allows you to retrieve data in a paginated manner, filter data by client ID, and fetch detailed information for a specific record.

## Endpoints

### 1. Get Paginated MQTT Data
- **HTTP Method:** GET
- **Endpoint:** /mqtt

**Description:** This endpoint allows you to retrieve a paginated list of MQTT data, with each request returning 10 values of the entire dataset.

**Request Parameters:**
- `page` (optional): The page number for pagination. Default is 1.

**Example Request:**
```http
GET http://localhost:3000/mqtt?page=1&itemsPerPage=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 11,
      "client_id": "client_2",
      "value": "Sample Value 11",
      // Other MQTT data fields
    },
    {
      "id": 12,
      "client_id": "client_3",
      "value": "Sample Value 12",
      // Other MQTT data fields
    },
    // More MQTT data items
  ],
          "currentPage": 1,
          "totalPages": 10,
          "itemsPerPage": 10,
          "totalListings": 100,
}
```

### 2. Filter MQTT Data by Client ID
- **HTTP Method:** GET
- **Endpoint:** /mqtt/:client_id

**Description:** This endpoint allows you to filter MQTT data by a specific client ID.

**Request Parameters:**
- `client_id`: The unique identifier of the client for which you want to filter data.

**Example Request:**
```http
GET http://localhost:3000/mqtt/client_1
```

**Response:**
```json
{
  "client_id": "client_1",
    // More MQTT data items for client_1
  ]
}
```

### 3. Get Detailed MQTT Data by ID
- **HTTP Method:** GET
- **Endpoint:** /mqtt/detail/:id

**Description:** This endpoint allows you to retrieve detailed information for a specific MQTT record by its ID.

**Request Parameters:**
- `id`: The unique identifier of the MQTT record for which you want to retrieve details.

**Example Request:**
```http
GET http://localhost:3000/mqtt/detail/7
```

**Response:**
```json
{
  "id": 7,
  // Other MQTT data fields for the record with ID 7
}
```

## Error Handling
- If a requested resource is not found, a 404 Not Found response will be returned.
- If there are validation errors in the request parameters, a 400 Bad Request response will be returned with details on the errors.


## Dependencies

### Runtime Dependencies

- **aedes** (^0.50.0): Aedes is a blazing-fast MQTT broker, which also supports MQTT 5.0.
- **chai-http** (^4.4.0): Chai HTTP is an extension for Chai assertion library, which makes it easy to test HTTP endpoints.
- **csv-parse** (^5.5.0): csv-parse is a library for parsing CSV data.
- **express** (^4.18.2): Express.js is a fast, unopinionated, minimalist web framework for Node.js.
- **mosca** (^2.8.3): Mosca is a MQTT broker that can be used to build scalable IoT applications.
- **mqtt** (^5.0.5): MQTT.js is a library for the MQTT protocol.
- **sqlite3** (^5.1.6): SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **ts-node** (^10.9.1): ts-node is a TypeScript execution environment and REPL for Node.js.

### Development Dependencies

- **@types/express** (^4.17.18): TypeScript type definitions for Express.js.
- **@types/mocha** (^10.0.2): TypeScript type definitions for Mocha testing framework.
- **@types/mosca** (^2.8.6): TypeScript type definitions for Mosca MQTT broker.
- **chai** (^4.3.10): Chai is an assertion library that can be paired with any testing framework.
- **mocha** (^10.2.0): Mocha is a feature-rich JavaScript test framework.
- **nodemon** (^3.0.1): Nodemon is a utility that monitors for changes in files and automatically restarts the server.
- **supertest** (^6.3.3): Supertest is a library for making HTTP assertions in tests.
- **typescript** (^5.2.2): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## Author
Dhanush Kumar Suresh


---