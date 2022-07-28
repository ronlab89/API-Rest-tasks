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
        
        res.status(500).json({error: "Error de servidor"});
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) return res.status(403).json({error: 'Este email no esta registrado'});

        const isPasswordOK = await user.comparePassword(password);
        if(!isPasswordOK) return res.status(403).json({error: 'Contraseña incorrecta'})

        res.json({ok: 'Login'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor"});
    }
}


export {
    login,
    register
}