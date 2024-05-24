const asyncHandler = require('express-async-handler');
const User = require("../models/user-schema");
const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken' );

const registerUser = asyncHandler(async(req, res)=>{
    const {email, password, username} = req.body;
    if( !email || !password  || !username ){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const userAvailble = await User.findOne({email: email});
    if(userAvailble){
        res.status(400);
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email: email,
        password: hashedPassword,
        username: username
    });
    if(newUser){
        return res.json({
            error: false,
            message: "User registered successfully",
            data:{_id: newUser._id, username: newUser.username, email: newUser.email}
        });  
    }
    else{
        res.status(400);
        throw new Error("Invalid userData");
    }
  
});


const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email ||!password ){
        res.status(400);
        throw new Error("Please fill all the fields");
    };
    const existingUser= await User.findOne({email: email});
    if(!existingUser){
        res.status(400);
        throw new Error("User not found");
    }
    else if(existingUser && (await bcrypt.compare( password,existingUser.password,))){
        const  token = jwt.sign({id: existingUser._id,email: existingUser.email, username: existingUser.username}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m'} )
        return res.json({
            error: false,
            message: "User logged in successfully",
            data:{id: existingUser._id, username: existingUser.username, email: existingUser.email, token: token}
        });
    }

    else{
        res.status(400);
        throw new Error("Invalid credentials");
    }
    
});




module.exports = {
    registerUser,
    loginUser,
     
};