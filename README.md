# Unit Store
Allows for inputing of cronological data values using REST.
Mongo Database, Express Api Backend, with a ReactJS frontend.

## Quick Docker Start 
Clone the project into a docker privilaged location and build containers using Docker.
```npm install && cd backend && npm install```
```cd .. && docker-compose up -d --build```

## Local Start
Install MongoDB locally and set the backend mongoose.connect to localhost.
```npm install && cd backend && npm install```

```npm start```

Then the client. Open a new terminal.

```npm start```

## API Endpoints

### GET View Stations & Values
http://localhost:3001/stations

http://localhost:3001/stations/count

http://localhost:3001/stations/{ label }

http://localhost:3001/values

http://localhost:3001/values/count

http://localhost:3001/values/{ label }


### POST Create Stations
http://localhost:3001/stations/

headers { 
    "Content-Type": 
    "application/json" 
},

body { 
    "label" : { label }, 
    "labelCustom" : { labelCustom },
    "unitCustom" : { unitCustom } 
}

### POST Create Values
http://localhost:3001/values/

headers { 
    "Content-Type": 
    "application/json" 
},

body { 
    "label" : { label }, 
    "value" : { value }
}
