const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

//Connection establishment
mongoose.connect('mongodb://mongodb:27017/unit-store', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Models
var db = mongoose.connection;

//We enebled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    // console.log('DB Connection established successfully');
});
