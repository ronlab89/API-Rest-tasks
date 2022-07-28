import { json } from "express";
import { User } from "../models/User.js";

const register = async(req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user) throw {code: 11000};

        user = new User({email: email, password: password});
        await user.save();
        
        return res.status(200).json({ok: true});
    } catch (error) {
        console.log(error);
        console.log(error.code)
        if(error.code === 11000) return res.status(400).json({error: 'Email ya esta registrado'})
    }
}

const login = async(req, res) => {
    console.log(req.body)
    res.json({ok: 'Login'})
}


export {
    login,
    register
}