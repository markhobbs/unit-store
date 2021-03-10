(function () {
    
    let mongoose = require('mongoose');
    let station = mongoose.model('Station');

    /**
     * Function to execute the create harrs.
     * @param {*} data item data
     * @param {*} callback callback function.
     */
    exports.createStation = (data, callback) => {
        station.create(data).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    };

    /**
     * Funtion to find the count all harrs from harrs collections.
     * @param {*} callback callback function
     */
    exports.countStations = (callback) => {
        station.find().exec(callback) 
    }

    /**
     * Function to execute the list harrs.
     * @param {*} callback callback function.
     */
    exports.listStations = (callback) => {
        station.find().exec(callback) 
    };

    /**
     * Funtion to find the upload from collections.
     * @param {*} query condition or expression to find the upload from collection.
     * @param {*} callback callback function
     */
        exports.findStation = (query, callback) => {
        station.findOne(query, callback);
    }
    
    
})();
