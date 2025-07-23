const express = require('express');
const app = express();
require('dotenv/config');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors());
const corsOption = {
    origin: FRONTEND_URL,
    methods:["GET","POST"],
};
app.use(cors(corsOption));

mongoose.connect(MONGOOSE_URL)
.then(() => {console.log(`Database Connected`)})
.catch((error) => {console.log(error)});

app.listen(PORT,console.log(`server is running - http://localhost:${PORT}`));

const MessageRoute = require('./routes/Message.route');

app.use("/api/message", MessageRoute);