const { io } = require('../index');
const MessageModel = require('../models/Message.model');

const addMessage = async(req,res) => {
    try{

        const { email, senderEmail, message } = req.body;
        if(!email || !senderEmail || !message){
            return res.status(400).json({
                alert: "All fields required"
            });
        }

        if (email === "all") {
            const users = await require('../models/User.model').find({ email: { $ne: senderEmail } });
            const messages = users.map(user => ({
                email: user.email,
                senderEmail,
                message
            }));
            await MessageModel.insertMany(messages);
            io.emit('new_message', messages); // Optionally emit all
            return res.status(200).json({
                alert: "Message sent to all users"
            });
        }

        const data = new MessageModel({email, senderEmail, message});
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
        const { email } = req.body;
        await MessageModel.updateMany({ email, isRead: false }, { isRead: true });
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