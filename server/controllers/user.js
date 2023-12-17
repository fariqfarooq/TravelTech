import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from '../models/user.js';

const secret ='test';

export const signup = async(req,res)=>{
    const {email ,password ,firstName ,lastName} = req.body;
    try {
        const oldUser = await userModel.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"user already exists "})
        }
        const hashedPassword = await bcrypt.hash(password,12);

        const result = await userModel.create({
            email,
            password : hashedPassword,
            name : `${firstName} ${lastName}`
        });

        const token = jwt.sign({email : result.email , id : result._id},secret,{expiresIn:'1h'})
        
        res.status(201).json({result,token})
        console.log('toke baba' ,{token});
        
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
        console.log(error);
    }
}


export const signin =async (req,res)=>{
    const { email ,password} =req.body;

    try {
        const oldUser = await userModel.findOne({email});
        if(!oldUser){
            return res.status(404).json({message: "user does not exist"});
        }
        const isPasswordIsCorrect = await bcrypt.compare(password,oldUser.password );

        if(!isPasswordIsCorrect) {
            return res.status(404).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({email:oldUser.email ,id:oldUser._id},secret,{expiresIn:"1h"});
       
        
        res.status(200).json({result: oldUser,token});




    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error);
    }
}

export const googleSignin =async(req,res)=>{
    const {email,name,googleId ,credential} =req.body
    try {
        const oldUser = await userModel.findOne({email});
        if(oldUser){
            const result = {_id:oldUser._id.toString(), email,name };
            return res.status(200).json({result,credential})
        }
          
        const result = await userModel.create({
            email,
            name,
            googleId
        });

        res.status(201).json({result,credential})
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error);
    }

}