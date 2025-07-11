import jwt from "jsonwebtoken";


// Function to generate a token from user
export const generateToken = (userId)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}