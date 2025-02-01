import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//authentication 
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({message: "Unauthorized"});
  }

  //get thetokenn
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded.userid);
    
    if (decoded.userid) {
      req.userid = decoded.userid;
      next();
    }
  } catch (err) {
    return res.status(403).json({message:err});
  }
};

