const UserModel = require('../models/User.model.js');

const signup = async(req,res) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
            alert: "All Fields are required to signup"
            });
        }
        const data = new UserModel({ name, email, password})
        await data.save();
        res.status(200).json({
            alert: "Signup successfull, Now you can Login"
        });
    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
}

const login = async(req,res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                alert: "All Fields are Required"
            });
        }
        const user = await UserModel.findOne({ email, password });
        if(!user){
            return res.status(401).json({
                alert: "Invalid email or password"
            });
        }
        return res.status(200).json({
            alert: "Login successful",
            user: user
        });
    }catch(error){
        return res.status(400).json({
            error: error.message
        });
    }
}

const list = async(req,res) => {
    try{
        const { email } = req.query;
        let filter = {};
        if (email) {
            filter = { email: { $ne: email } };
        }
        const allusers = await UserModel.find(filter);
        res.status(200).json(allusers);
    }catch(error){
        return res.status(400).json({
            error: error.message
        });
    }
}

const UserController = {
    signup,
    login,
    list
};

module.exports = UserController;