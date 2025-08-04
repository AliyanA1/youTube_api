import express from "express";
import { signIn, signOut, signUp, updateProfile } from "../Controllers/user.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const userRoute=express.Router();

userRoute.post("/signUp",signUp);

userRoute.post("/signIn",signIn );

userRoute.get("/signOut",userMiddleware,signOut );


userRoute.post("/update-profile/:id",userMiddleware,updateProfile );


export default userRoute;