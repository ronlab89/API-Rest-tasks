import mongoose from "mongoose";
import bcriptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcriptjs.genSalt(10);
        const hashPassword = await bcriptjs.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        console.log(error);
        throw new Error('Fallo el hash de contraseña');
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcriptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);