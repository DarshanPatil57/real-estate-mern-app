const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const jwt =require('jsonwebtoken')

const register = async (req,res)=>{
    const {username,password,email} = req.body;

    try {
        // hash password
        const hashPassword = await bcrypt.hash(password,10)

        //new user
        const user = await prisma.user.create({
            data:{
                username,
                email,
                password:hashPassword
            }
        });
        // console.log(user);

        res.status(201).json({
            message:"User created successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Error while creating user"
        })
    }
}


const login = async (req,res)=>{
    const {username,password} = req.body

    try {
        const user = await prisma.user.findUnique({
            where:{username}
        })

        if(!user) return res.status(401).json({
            message:"Invalid credentials"
        })

        // check if password is correct 

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) return res.status(401).json({
            message:"Invalid credentials"
        });

        //generate token and send to user 
        const token = jwt.sign({
            id:user.id
        },process.env.JWT_SECRET_KEY)
        res.cookie("token", token,{
            httpOnly:true,
            // secure:true
        }).status(200).json({
            message:"Login successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to login.",
          });
    }
}


const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({
        message:"Logout successfully"
    })
}

module.exports ={
    register,
    login,
    logout
}