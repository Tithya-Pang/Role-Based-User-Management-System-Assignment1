// const express = require("express");
// const router = express.Router();

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const User = require("./user");

// router.post("/login", async(req,res)=>{
//     const {
//         email,
//         password,
//         role
//     } = req.body;

//     try{
//         const user = await User.findOne({
//             email: email,
//             role: role
//         });
//         if(!user){
//             return res.status(401).json({
//                 message:"Invalid email or role"
//             });
//         }
//         const passwordMatch =
//         await bcrypt.compare(
//             password,
//             user.password
//         );
//         if(!passwordMatch){
//             return res.status(401).json({
//                 message:"Invalid password"
//             });
//         }
//         const token = jwt.sign(
//             {
//                 id:user._id,
//                 email:user.email,
//                 role:user.role
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn:"1h"
//             }
//         );

//         res.json({

//             message:"Login successful",
//             token:token

//         });
//     }
//     catch(error){

//         res.status(500).json({
//             message:error.message
//         });
//     }

// });

// module.exports = router;