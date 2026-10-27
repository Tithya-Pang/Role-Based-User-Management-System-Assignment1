const express = require("express");
const connectDB = require("./dbconnect");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user");

connectDB();

app.post("/auth/login", async(req,res)=>{
    const {
        email,
        password,
        role
    } = req.body;

    try{
        const user = await User.findOne({
            email: email
        });
        if(!user){
            return res.status(401).json({
                message:"Invalid email"
            });
        }
        if(user.role !== role){
            return res.status(401).json({
                message:"Invalid role"
            });
        }
        const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        );
        if(!passwordMatch){
            return res.status(401).json({
                message:"Invalid password"
            });
        }
        const token = jwt.sign(
            {
                id:user._id,
                email:user.email,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );

        res.json({

            message:"Login successful",
            token:token

        });
    }
    catch(error){

        res.status(500).json({
            message:error.message
        });
    }

});

const PORT = process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log(`Login Service running on port ${PORT}`);
});
