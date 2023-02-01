# AoM-IoT-Feeds

Simple web app and backend service to test replacing Adafruit IO

View a demo at [https://aom-iot-feeds.onrender.com](https://aom-iot-feeds.onrender.com/)

## Prerequisites

1. Node.js and npm

   See [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for installation instructions

2. MongoDB database

   [MongoDB Atlas](https://www.mongodb.com/atlas/database) can be used to quickly spin up a free MongoDB database for testing and development

3. Docker (for testing and deployment)

   See [https://www.docker.com](https://www.docker.com/) for installation instructions. Make sure to install `docker-compose` with Docker

## Getting Started

1. Clone the repository

   `git clone https://github.com/The-Art-of-Making/AoM-IoT-Feeds.git`

2. Install the dependencies by running the following command in both the `backend` and `frontend` directories

   `npm install .`

3. Set the environment variable `MONGOURI` to the URI used to access your MongoDB database. For instance, if using MongoDB Atlas this might look something like

   `export MONGOURI="mongodb+srv://<user>:<password>@<cluster.mongodb.net>/aom-iot-feeds?retryWrites=true&w=majority`

4. Start the live development server from the `backend` directory

   `npm run dev`

## Deploy with Docker

1. Set the environment variable `MONGOURI` to the URI used to access your MongoDB database (see Getting Started, step 3) as well as the environment variable `PORT` for which port you would like the server to run on. For instance, to run the server on port `8080`

   `export PORT=8080`

2. Build the Docker container image from the root directory of the project

   `docker-compose build`

3. Start the container

   `docker-compose up`
