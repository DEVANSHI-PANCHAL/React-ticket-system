import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import UserModal from "../models/user.js";
import user from "../models/user.js";


const secret = process.env.TOKEN_SECRET;

export const signin = async (req, res) => {
  
  const { email, password } = req.body;


  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
   
    
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id, firstName: oldUser.firstName, lastName: oldUser.lastName }, secret, { expiresIn: "1h" });
   
    res.status(200).json({ result: {firstName: oldUser.firstName, lastName: oldUser.lastName, email: oldUser.email,id:oldUser._id}, token });

  } catch (err) {
    
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {

  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName, username: email });
 
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    
    res.status(201).json({ result, token });
  } catch (error) {
    
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const User = await user.find().sort({Date:-1});
    console.log(User)
    res.status(200).json(User);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
