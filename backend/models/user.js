import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },  
  password : {
    type : String,
    required : true,
  },
  isVerified : {
    type : Boolean,
    default : false
  },
  resetPasswordToken : String,
  resetPasswordExpiresAt : Date,
  verificationToken : String,
  verificationTokenExpiresAt : Date,
},{timestamps : true});

const User = model('user', userSchema);

export default User;