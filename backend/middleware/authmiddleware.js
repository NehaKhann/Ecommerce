import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized invalid token");
    }
  }
  // console.log(req.headers.authorization)
  if(!token) {
    res.status(401);
    throw new Error("Not authorized no token");
  }
};
export default protect;
