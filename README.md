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

## API

### New Feed

Endpoint: `/feeds/new`

Method: `POST`

Expected Response Status: `201`

Response Message:

The body of the response message will contain JSON data similar to the following that will provide information about the newly created feed.

`{
    "key": "feed-63dbc8cd-d387-4773-99a9-6f4f1b821e09",
    "data": [],
    "_id": "63dab7f1a4389db96bd6a8f1",
    "__v": 0
}`

### Delete Feed

Endpoint: `/feeds/delete`

Method: `POST`

Request Headers:

`X-Feed-Key`: Feed key for the feed to be deleted, e.g. feed-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Expected Response Status: `200`

### Last Data Posted to Feed

Endpoint: `/feeds/last`

Method: `GET`

Request Headers:

`X-Feed-Key`: Feed key for the feed to get data from, e.g. feed-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Expected Response Status: `200`

Response Message:

The body of the response message will contain JSON data similar to the following with a single key-value pair indicating the value of the data last posted to the feed.

`{
    "value": "HIGH"
}`

### All Data Posted to Feed

Endpoint: `/feeds/all`

Method: `GET`

Request Headers:

`X-Feed-Key`: Feed key for the feed to get data from, e.g. feed-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Expected Response Status: `200`

Response Message:

The body of the response message will contain JSON data similar to the following with information about the feed and a `data` key in particular with a value equal to an array of all data posted to the feed with the corresponding timestamps.

`{
    "feed": {
        "_id": "63d99b40eabdd56df382edcd",
        "key": "feed-dc2b8644-afe7-4e40-acc0-45a6570fd76a",
        "data": [
            {
                "date": 1675205730660,
                "value": "HIGH"
            },
            {
                "date": 1675205738750,
                "value": "LOW"
            },
            {
                "date": 1675205743215,
                "value": "HIGH"
            },
            {
                "date": 1675215449237,
                "value": "HIGH"
            },
            {
                "date": 1675215459107,
                "value": "LOW"
            },
            {
                "date": 1675215467339,
                "value": "HIGH"
            }
        ],
        "__v": 6
    }
}`

### All Feeds

Endpoint: `/feeds/feeds`

Method: `GET`

Expected Response Status: `200`

Response Message:

The body of the response message will contain JSON data similar to the following with an array containing information about about every feed on the server and all data posted to every feed.

`{
    "feeds": [
        {
            "_id": "63d99b40eabdd56df382edcd",
            "key": "feed-dc2b8644-afe7-4e40-acc0-45a6570fd76a",
            "data": [
                {
                    "date": 1675205730660,
                    "value": "HIGH"
                },
                {
                    "date": 1675205738750,
                    "value": "LOW"
                },
                {
                    "date": 1675205743215,
                    "value": "HIGH"
                },
                {
                    "date": 1675215449237,
                    "value": "HIGH"
                },
                {
                    "date": 1675215459107,
                    "value": "LOW"
                },
                {
                    "date": 1675215467339,
                    "value": "HIGH"
                }
            ],
            "__v": 6
        },
        {
            "_id": "63d99ccd5130742ef5cf34ec",
            "key": "feed-a",
            "data": [],
            "__v": 0
        },
        {
            "_id": "63d99cd488e32ba25247ceec",
            "key": "feed-b",
            "data": [],
            "__v": 0
        },
        {
            "_id": "63d99cd99a93e22773cbd9b3",
            "key": "feed-c",
            "data": [],
            "__v": 0
        },
        {
            "_id": "63d99cde39cb40355b6101f1",
            "key": "feed-d",
            "data": [],
            "__v": 0
        },
        {
            "_id": "63d99ce6c06787efffa51c47",
            "key": "feed-e",
            "data": [],
            "__v": 0
        },
        {
            "_id": "63d99ced015d3af5a9a007cb",
            "key": "feed-f",
            "data": [],
            "__v": 0
        }
    ]
}`

### Post Data to Feed

Endpoint: `/feeds/data`

Method: `POST`

Request Headers:

`Content-Type`: `application/json`

Request Body:

JSON data in the following format with the key of the feed to post data to and the value of the data to be posted.

`{
    "key": "<Feed Key>",
    "value": "<Value>"
}`

e.g.

`{
    "key": "feed-dc2b8644-afe7-4e40-acc0-45a6570fd76a",
    "value": "HIGH"
}`

Expected Response Status: `201`

Response Message:

The body of the response message will contain JSON data similar to that of `/feeds/all` with information about the feed and a `data` key in particular with a value equal to an array of all data posted to the feed, including the newly posted data, with the corresponding timestamps.
