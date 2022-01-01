var valueService = require('../service/value');

/**
 * Function to create the upload in uploads collection.
 */
exports.create = (req, res) => {
    var body = new Value(req.body);
    /*if (!body.label) {
        res.status(400).send('Value label is required');
        return;
    }*/
    if (!body.created) {
        body.created =  Date.now();
    }
    valueService.createValue(body, (error, response) => {
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
    valueService.countValues((error, response) => {
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
    valueService.listValues((error, response) => {
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
    valueService.findValue(query, (error, response) => {
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
 exports.findAll = (req, res) => {
    let params = req.params || {};
    let query = { label: params.station };
    //console.log(params)
    //console.log(query)
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    valueService.findValues(query, (error, response) => {
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

class Value {
    constructor(valueData) {
        this.label = valueData.label || '';
        this.value = valueData.value || '';
        this.value2 = valueData.value2 || '';
        this.created = valueData.created || '';
    }
}
