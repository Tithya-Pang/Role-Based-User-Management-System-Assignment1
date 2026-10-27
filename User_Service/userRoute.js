// const express = require("express");
// const router = express.Router();

// const User = require("./user");

// module.exports = router;

// // GET /user/viewprofile
// router.get("/viewprofile", async(req,res)=>{

//     try{
//         const email = req.headers["user-email"];
//         const user = await User.findOne({
//             email:email
//         });

//         if(!user){

//             return res.status(404).json({
//                 message:"User not found"
//             });
//         }

//         res.json(user);
//     }
//     catch(error){

//         res.status(500).json({
//             message:error.message
//         });

//     }

// });

// // PUT /user/updateprofile
// router.put("/updateprofile", async(req,res)=>{

//     try{

//         const email = req.headers["user-email"];


//         const updatedUser =
//         await User.findOneAndUpdate(

//             {
//                 email:email
//             },

//             {
//                 name:req.body.name,
//                 phone:req.body.phone
//             },

//             {
//                 new:true
//             }

//         );


//         res.json({

//             message:"Profile updated successfully",

//             user:updatedUser

//         });


//     }
//     catch(error){

//         res.status(500).json({
//             message:error.message
//         });

//     }

// });
