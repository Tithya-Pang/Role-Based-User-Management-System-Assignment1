// const express = require("express");
// const router = express.Router();
// const User = require("./user");

// // Search user by name or email
// router.get("/searchuser", async(req,res)=>{
//     try{
//         const keyword = req.query.keyword;
//         const users = await User.find({
//             $or:[
//                 {name: {$regex: keyword, $options:"i"}},
//                 {email: {$regex: keyword, $options:"i"}}
//             ]
//         });

//         if(users.length === 0){
//             return res.status(404).json({
//                 message:"User not found"
//             });
//         }
//         res.json(users);
//     }
//     catch(error){
//         res.status(500).json({
//             message:error.message
//         });
//     }
// });

// // View all users
// router.get("/viewalluser", async(req,res)=>{
//     try{
//         const users = await User.find();
//         res.json(users);
//     }
//     catch(error){
//         res.status(500).json({
//             message:error.message
//         });
//     }

// });

// // Delete user by email
// router.delete("/deluser", async(req,res)=>{
//     try{
//         const email = req.body.email;
//         const user = await User.findOneAndDelete({
//             email:email
//         });

//         if(!user){

//             return res.status(404).json({
//                 message:"User not found"
//             });
//         }

//         res.json({
//             message:"User deleted successfully"
//         });
//     }
//     catch(error){
//         res.status(500).json({
//             message:error.message
//         });
//     }
// });

// module.exports = router;