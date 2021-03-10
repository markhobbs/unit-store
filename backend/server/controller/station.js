var stationService = require('../service/station');

/**
 * Function to create the upload in uploads collection.
 */
exports.create = (req, res, next) => {
    var body = new Station(req.body);
    if (!body.label) {
        res.status(400).send('Station label is required');
        return;
    }
    /*if (!body.body) {
        res.status(400).send('Station Body is required');
        return;
    }*/
    if (!body.created) {
        body.created =  Date.now();
    }
    stationService.createStation(body, (error, response) => {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
}

/**
 * Function to find full count from uploads collection.
 */
exports.count = (req, res) => { 
    stationService.countStations((error, response) => {
        response = {"total" : Object.keys(response).length};
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}
    
/**
 * Function to find upload from uploads collection.
 */
exports.list = (req, res) => {
    stationService.listStations((error, response) => {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}

/**
 * Function to find upload from uploads collection. //DUPLICATION
 */
 exports.findOne = (req, res) => {
    let params = req.params || {};
    let query = { label: params.station };
    //console.log(params)
    //console.log(query)
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    stationService.findStation(query, (error, response) => {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}

class Station {
    constructor(stationData) {
        this.label = stationData.label || '';
        this.labelCustom = stationData.labelCustom || '';
        this.unitCustom = stationData.unitCustom || '';
        this.created = stationData.created || '';
    }
}
