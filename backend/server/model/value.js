var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    label: {  
        type: String, 
        default: '' 
    },
    value: {
        type: Number,
        default: '' 
    },
    created: Date 
});
var value = new mongoose.model('Value', schema);
module.exports = value;