var mongoose = require('mongoose');

//Validation require, map to middleware validation
var schema = new mongoose.Schema({
    label: {  
        type: String, 
        default: '' 
    },
    value: {
        type: String,
        default: '' 
    },
    created: Date 
});

var value = new mongoose.model('Value', schema);

module.exports = value;
