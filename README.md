# MERN DEMO
Allows for the inputing cronological data values using REST.
Mongo Database, Express Api Backend, with a ReactJS frontend.

## Quick Docker Start 
Clone project and build containers with Docker.
```npm install && cd backend && npm install```
```docker-compose up -d --build```

## Local Start
Install MongoDB locally and set the backend mongoose.connect to localhost
```npm install && cd backend && npm install```
```npm start```
Then the client. Open a new terminal 
```npm start```

## API Endpoints

### GET stations & Values
http://localhost:3001/stations
http://localhost:3001/stations/count
http://localhost:3001/stations/{ label }
http://localhost:3001/values
http://localhost:3001/values/count
http://localhost:3001/values/{ label }

### POST stations
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

### POST values
http://localhost:3001/values/
headers { 
    "Content-Type": 
    "application/json" 
},
body { 
    "label" : { label }, 
    "value" : { value }
}
