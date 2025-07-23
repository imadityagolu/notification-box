const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name:{
        type: String
    },
    message:{
        type: String
    },
    time:{
        type: Date,
        default: Date.now
    }
});

const MongooseModel = mongoose.model("Message",messageSchema);

module.exports = MongooseModel;