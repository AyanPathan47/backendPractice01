import bcrypt from 'bcrypt'
import userModel from "../models/user.model.js";
import { generateToken } from '../utils/tokenGenerator.js';

export const signup = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });

        if (user) return res.status(400).json({ message: "User Already Exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            phone,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res);
            const savedUSer = await newUser.save();

            res.status(200).json(savedUSer)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).json({message: "User not found"})
        }

        const ispasswordMatch = await bcrypt.compare(password , user.password);
        if(!ispasswordMatch){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({ message: "Login Successful", userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


    const user = await userModel.findOne({ email });


}