(function () {
    
    let mongoose = require('mongoose');
    let value = mongoose.model('Value');

    /**
     * Funtion to find the count all harrs from harrs collections.
     * @param {*} callback callback function
     */
    exports.countValues = (callback) => {
        value.find().exec(callback) 
    }

    /**
     * Function to execute the create harrs.
     * @param {*} data item data
     * @param {*} callback callback function.
     */
    exports.createValue = (data, callback) => {
        value.create(data).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    };

    /**
     * Function to execute the list harrs.
     * @param {*} callback callback function.
     */
    exports.listValues = (callback) => {
        value.find().exec(callback) 
    };

    /**
     * Function to execute the update query.
     * @param {*} query Condition or filter to find the upload.
     * @param {*} data data which we need to update.
     * @param {*} options 
     */
    exports.updateValue = (query, data, options, callback) => {
        value.findOneAndUpdate(query, data, options, (err, response) => {
            callback(err, response);
        });
    } 
    
     /**
     * Funtion to find the upload from collections.
     * @param {*} query condition or expression to find the upload from collection.
     * @param {*} callback callback function
     */
    exports.findValue = (query, callback) => {
        value.findOne(query, callback);
    }

    /**
     * Funtion to find the upload from collections.
     * @param {*} query condition or expression to find the upload from collection.
     * @param {*} callback callback function
     */
    exports.findValues = (query, callback) => {
        value.find(query, callback);   
    }
 
})();
