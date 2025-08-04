import { JWT_SECRET } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const signUp=async(req,res)=>{
    const {userName, email, password}= req.body;
   
    try {
        if(!userName || !email || !password) return res.json("please fill all fields");

        const find=await userModel.findOne({email});

        if(find) return res.json("this email already exist");

        const userData=await userModel.create({
            userName,
            email,
            password
        });

        const payload={id:userData._id, userName: userData.userName, email: userData.email}
        const token=jwt.sign(payload,JWT_SECRET,{ expiresIn: '1h' });

        res.cookie("token",token , {maxAge: 1000 * 60 * 15});

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            userData
        })

    } catch (error) {
        res.json({
            success: "faild",
            message: error.message
        })
    }
}


//for signIN
export const signIn=async(req,res)=>{
    const {email, password}= req.body;
   
    try {
        if(!email || !password) return res.json("please fill all fields");

        const userData=await userModel.findOne({email});

        if(!userData) return res.status(400).json("invaild email/password");

        const checkPassword=await bcrypt.compare(password, userData.password);

        if(!checkPassword) return res.status(400).json("invaild email/password");
        
        const payload={id:userData._id, userName: userData.userName, email: userData.email}
        const token=jwt.sign(payload,JWT_SECRET,{ expiresIn: '1h' });

        res.cookie("token",token , {maxAge: 1000 * 60 * 15});

        res.status(201).json({
            status: "sign In successfully",
            message: "welcome Back",
            userData
        })

    } catch (error) {
        res.json({
            success: "faild",
            message: error.message
        })
    }
}


export const signOut=(req,res)=>{
   try {
      res.clearCookie("token");

      res.send("sign out successfully")
   } catch (error) {
      res.json({
        status: "Error in sign Out",
        message: error.message
      })
   }
}

export const updateProfile=async(req,res)=>{
    const {id}=req.params;
    const body=req.body;


    try {
        //for checking only the selected field get change
        const allowedField=['userName','email'];
        const updatedData={};

        for(let key of allowedField){
            if(body[key] !== undefined){
                updatedData[key]=body[key];
            }
        }

         const findAndUpdate=await userModel.findByIdAndUpdate(
            id, updatedData, {new: true, runValidators: true}
        )
        if(!findAndUpdate){
           return  res.status(400).json({
            status: 'their no such id exist',
            message: error.message
        })
        }

        const payload={id:findAndUpdate._id, userName: findAndUpdate.userName, email: findAndUpdate.email}
        const token=jwt.sign(payload,JWT_SECRET,{ expiresIn: '1h' });

        res.cookie("token",token , {maxAge: 1000 * 60 * 15});

        res.status(201).json({
            status: 'successfuly updated the data',
            findAndUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: 'faild in updating the data',
            message: error.message
        })
    }
}