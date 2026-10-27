const express = require("express");
require("dotenv").config();
const connectDB = require("./dbconnect");
const app = express();
app.use(express.json());
const User = require("./user");

connectDB();

// Search user by name or email
app.get("/admin/searchuser", async(req,res)=>{
    try{
        const keyword = req.query.keyword;
        if(typeof keyword !== "string" || !keyword.trim()){
            return res.status(400).json({
                message:"Please provide a keyword to search by name or email"
            });
        }
        const users = await User.find({
            $or:[
                {name: {$regex: keyword, $options:"i"}},
                {email: {$regex: keyword, $options:"i"}}
            ]
        });

        if(users.length === 0){
            return res.status(404).json({
                message:"User not found"
            });
        }
        res.json(users);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

// View all users
app.get("/admin/viewalluser", async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }

});

// Delete user by email
app.delete("/admin/deluser", async(req,res)=>{
    try{
        const email = req.body.email;
        const user = await User.findOneAndDelete({
            email:email
        });

        if(!user){

            return res.status(404).json({
                message:"User not found"
            });
        }

        res.json({
            message:"User deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});


const PORT = process.env.PORT || 5003;
app.listen(PORT,()=>{
    console.log(`Admin Service running on port ${PORT}`);
});
