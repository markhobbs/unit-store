var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    label: {  
        type: String, 
        default: '' 
    },
    labelCustom: {
        type: String,
        default: '' 
    },
    unitCustom: {
        type: String,
        default: '' 
    },
    created: Date
});

var station = new mongoose.model('Station', schema);
module.exports = station;