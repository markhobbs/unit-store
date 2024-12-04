# Unit Store

Unit Store allows for the input of chronological data values using REST. It features a MongoDB database, an Express API backend, and a ReactJS frontend.

## Quick Docker Start

Clone the project into a Docker-privileged location and build the containers using Docker.

```sh
npm install && cd backend && npm install
cd .. && docker-compose up -d --build
```

## Local Start

Install MongoDB locally and set the backend `mongoose.connect` to `localhost`.

```sh
npm install && cd backend && npm install
npm start
```

Then, start the client in a new terminal.

```sh
npm start
```

## API Endpoints

### GET View Stations & Values

- `GET /stations` - View all stations
- `GET /stations/count` - Get the count of stations
- `GET /stations/{label}` - View a specific station by label
- `GET /values` - View all values
- `GET /values/count` - Get the count of values
- `GET /values/{label}` - View values by label

### POST Create Stations

- `POST /stations/`

    **Headers:**
    ```json
    {
        "Content-Type": "application/json"
    }
    ```

    **Body:**
    ```json
    {
        "label": "{label}",
        "labelCustom": "{labelCustom}",
        "unitCustom": "{unitCustom}"
    }
    ```

### POST Create Values

- `POST /values/`

    **Headers:**
    ```json
    {
        "Content-Type": "application/json"
    }
    ```

    **Body:**
    ```json
    {
        "label": "{label}",
        "value": "{value}"
    }
    ```
