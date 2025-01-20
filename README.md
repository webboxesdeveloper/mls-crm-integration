# MLS to CRM Integration

This project implements a function that accepts varying JSON data sources representing properties from a Multiple Listing Service (MLS) and sends them to a fictional CRM endpoint. The function makes an HTTP POST request to a CRM endpoint for a customer with ID `762910`. The CRM endpoint is mocked for testing purposes, and different MLS JSON input sources are processed one at a time.

## Core Feature: Flexible MLS Data Mapping

The project supports multiple MLS data sources, and it can easily extend or modify data mapping rules for new sources. The data from each MLS source is transformed into the desired CRM format. Here's how it works:
- **Auto-conversion**: Each MLS source is mapped with rules that convert its data into the required format for the CRM.
- **Custom Data Handling**: Functions within the mapping handle tasks like cleaning (e.g., converting list prices) and reformatting (e.g., combining address components).
- **Easy Expansion**: Adding new MLS sources involves defining the mapping and data transformation rules. This makes the project easy to maintain and scale.

## Technologies Used
- **Node.js** (ES6+)
- **Jest** for testing
- **HTTP POST requests** (mocked)

## Features
- Accepts different MLS JSON data formats for property listings.
- Sends the data to a mock CRM endpoint.
- The function is designed to handle various property data formats dynamically.
- Tests are written using Jest to validate functionality.

## How to start
To get started with this project locally, follow these steps:

1. **Install the dependencies:**
   ```bash
   npm install
   ```

2. **Make .env:**
   ```bash
   cp .env.example .env
   ```

2. **Start the project:**
   ```bash
   npm start
   ```

3. **Run tests:**
   ```bash
   npm run test
   ```