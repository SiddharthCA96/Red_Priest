import express from "express"
// const express = require('express')
import cors from "cors";
import allRoutes from "./routes/route.js";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server=http.createServer(app);
const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["get","post"],
  }
})
// Middleware
app.use(cors());
app.use(express.json());

// middlewares
app.use("/api/auth", allRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

export {io};