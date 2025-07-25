const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    email:{
        type: String
    },
    message:{
        type: String
    },
    senderEmail:{
        type: String
    },
    isRead:{
        type: Boolean,
        default: false
    },
    time:{
        type: Date,
        default: Date.now
    }
});

const MongooseModel = mongoose.model("Message",messageSchema);

module.exports = MongooseModel;