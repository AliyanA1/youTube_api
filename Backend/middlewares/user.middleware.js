import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const userMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "No token provided, not authenticated, you need to signIn first"
    });
  }

  try {
    const userData = jwt.verify(token, JWT_SECRET);
     
    req.user = userData;
   
    next();
    
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid or expired token"
    });
  }
};
