import mongoose from "mongoose";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;

//connnect to mongodb

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

//define the schema

//user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  userProfiles:{
    leetcodeId: {
      type: String,
      trim: true,
    },
    codeforcesId: {
      type: String,
      trim: true,
    },
    gfgId: {
      type: String,
      trim: true,
    },
    githubId: {
      type: String,
      trim: true,
    },
  },
  inGroups:[{
    type:mongoose.Schema.Types.ObjectId,ref:'Group',
    default:[],
  }]  
});

//attendence subject schema
const SubjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },
  presentDays: {
    type: [String], // Array of dates marked as present (format: "YYYY-MM-DD")
    default: [],
  },
  absentDays: {
    type: [String], // Array of dates marked as absent (format: "YYYY-MM-DD")
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//todo schema
const TodoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minLength:1,
        maxLength:30,
    },
    description:{
        type:String,
        trim:true,
        maxLength:500,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
});

//group Schema
const GroupSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLength:3,
    maxLength:30,
  },
  groupId: {
    type: String,
    default: uuidv4,
    unique: true,    
  },
  admin:{
    type:mongoose.Schema.Types.ObjectId,ref:'User',
    required:true,
  },
  members:[
    {
      type:mongoose.Schema.Types.ObjectId,ref:'User',
      default:[],
    }
  ],
  messages:[{
    sender:{
      type:mongoose.Schema.Types.ObjectId,ref:'User',
      required:true,
    },
    text:{
      type:String,
      required:true,
    },
    timestamp:{
      type:Date,
      default:Date.now,
    },
  }],
})

//create the  models

//user model
export const User = mongoose.model("User", UserSchema);

//attendence trackers subject model
export const SubjectProfiles = mongoose.model("SubjectProfiles", SubjectSchema);

//todo model
export const Todo=mongoose.model("Todo",TodoSchema);

//group model
export const Group=mongoose.model("Group",GroupSchema);