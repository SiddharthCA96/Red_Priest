import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//authentication 
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }

  //get thetokenn
  const token = authHeader.split("")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.userid) {
      req.userid = decoded.userid;
      next();
    }
  } catch (err) {
    return res.status(403).json({});
  }
};

