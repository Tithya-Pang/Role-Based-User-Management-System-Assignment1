const express = require("express");
const connectDB = require("./dbconnect");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const bcrypt = require("bcrypt");
const User = require("./user");

const app = express();
app.use(express.json());

connectDB();

// POST /register/userregister
app.post("/register/userregister", async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            phone,
            role
        } = req.body;

        // Check email already exists
        const existingUser = await User.findOne({
            email: email
        });
        if(existingUser){
            return res.status(400).json({
                message:"Email already exists"
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );
        // Create new user
        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone,
            role:role
        });

        await newUser.save();
        res.status(201).json({
            message:"User registered successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
