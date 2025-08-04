import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=mongoose.Schema({
   userName:{
    type: String,
    required: true,
    trim: true
   },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {    
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    channelName:{
        type: String,
        trim: true,
    },
    subscriber:{
        type: Number
    },
    subscribedChannel:{
        type: Array,
        default: []
    }
},{timestamp: true});

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(this.password,salt);
 

  this.password=hashPassword
  next()
});

const userModel=mongoose.model("users", userSchema);

export default userModel;