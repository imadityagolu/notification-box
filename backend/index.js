const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');

app.use(express.json());

const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: FRONTEND_URL,
        methods: ["GET","POST"]
    }
});

const cors = require('cors');
app.use(cors());
const corsOption = {
    origin: FRONTEND_URL,
    methods:["GET","POST"],
};
app.use(cors(corsOption));

mongoose.connect(MONGOOSE_URL)
.then(() => {console.log(`Database Connected`)})
.catch((error) => {console.log(error)});

http.listen(PORT,console.log(`server is running - http://localhost:${PORT}`));

module.exports = { io };

const MessageRoute = require('./routes/Message.route');

app.use("/api/message", MessageRoute);