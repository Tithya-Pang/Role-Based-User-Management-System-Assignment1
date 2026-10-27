// const express = require("express");
// const router = express.Router();

// const bcrypt = require("bcrypt");
// const User = require("./user");

// // POST /register/userregister
// router.post("/userregister", async(req,res)=>{
//     try{
//         const {
//             name,
//             email,
//             password,
//             phone,
//             role
//         } = req.body;

//         // Check email already exists
//         const existingUser = await User.findOne({
//             email: email
//         });
//         if(existingUser){
//             return res.status(400).json({
//                 message:"Email already exists"
//             });
//         }
//         // Hash password
//         const hashedPassword = await bcrypt.hash(
//             password,
//             10
//         );
//         // Create new user
//         const newUser = new User({
//             name:name,
//             email:email,
//             password:hashedPassword,
//             phone:phone,
//             role:role
//         });

//         await newUser.save();
//         res.status(201).json({
//             message:"User registered successfully"
//         });
//     }
//     catch(error){
//         res.status(500).json({
//             message:error.message
//         });
//     }
// });
// module.exports = router;