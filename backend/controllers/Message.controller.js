const { io } = require('../index');
const MessageModel = require('../models/Message.model');

const addMessage = async(req,res) => {
    try{

        const { name, message } = req.body;
        if(!name || !message){
            return res.status(400).json({
                alert: "All fields required"
            });
        }
        const data = new MessageModel({name, message});
        await data.save();

        io.emit('new_message', data);

        res.status(200).json({
            alert:"Message Send"
        });

    }
    catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const showMessage = async(req,res) => {
    try {
        const data = await MessageModel.find().sort({ time: -1 });
        res.status(200).json({
            data
        });
    }
    catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const markAllAsRead = async(req,res) => {
    try{
        await MessageModel.updateMany({ isRead: false }, { isRead: true});
        res.status(200).json({
            alert: "Marked all as read"
        });
    } catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const MessageController = {
    addMessage,
    showMessage,
    markAllAsRead
}
module.exports = MessageController;