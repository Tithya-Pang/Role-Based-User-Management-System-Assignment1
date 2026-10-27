const express = require("express");
const connectDB = require("./dbconnect");
require("dotenv").config();
const app = express();
app.use(express.json());
const User = require("./user");
connectDB();

// GET viewprofile
app.get("/user/viewprofile", async(req,res)=>{
    try{
        const email = req.headers["user-email"];
        const user = await User.findOne({
            email:email
        });

        if(!user){

            return res.status(404).json({
                message:"User not found"
            });
        }

        res.json(user);
    }
    catch(error){

        res.status(500).json({
            message:error.message
        });
    }
});

// PUT updateprofile
app.put("/user/updateprofile", async(req,res)=>{
    try{
        const email = req.headers["user-email"];
        const updatedUser =
        await User.findOneAndUpdate(
            {
                email:email
            },

            {
                name:req.body.name,
                phone:req.body.phone
            },

            {
                new:true
            }
        );

        res.json({
            message:"Profile updated successfully",
            user:updatedUser
        });
    }
    catch(error){

        res.status(500).json({
            message:error.message
        });
    }
});


app.listen(
    process.env.PORT || 5004,
    ()=>{
        console.log(
        "User Service running on port 5004"
        );
    }
);