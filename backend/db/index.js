import mongoose from "mongoose";
import dotenv from "dotenv";
import { string } from "zod";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;


//connnect to mongodb

mongoose
  .connect(
    MONGO_URI
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));


//define the schema

//user schema
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30,
    },
});
//schema for the userDetails about coding profiles

const ProfilesSchema=new mongoose.Schema({
    leetcodeId:{
        type:String,
    },
    codeforcesId:{
        type:String,
    },
    gfgId:{
        type:String,
    },
    githubId:{
        type:String,
    },
});
//create the  models

//user model
export const User=mongoose.model('User',UserSchema);

export const UserProfiles=mongoose.model('UserProfiles',ProfilesSchema);
