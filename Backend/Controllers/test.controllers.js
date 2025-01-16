import jwt from 'jsonwebtoken'

const user = async(req,res)=>{

    const token = req.cookies.token

    if(!token) return res.status(401).json({
        message:"Not authenticated"
    })

    jwt.verify(token,process.env.JWT_SECRET_KEY, async (error,payload) =>{
        if(error) return res.status(403).json({
            message:"Token is not valid "
        })

        res.status(200).json({
            message:"You are authenticated"
        })
    })
    
}

const admin = async(req,res)=>{
    const token = req.cookies.token

    if(!token) return res.status(401).json({
        message:"Not authenticated"
    })

    jwt.verify(token,process.env.JWT_SECRET_KEY, async (error,payload) =>{
        if(error) return res.status(403).json({
            message:"Token is not valid "
        })

        if(! payload.isAdmin){
            return res.status(403).json({
                message:"Not authorized  "
            })
        }

        res.status(200).json({
            message:"You are authenticated"
        })
    })
}

module.exports = {
    user,admin
}
