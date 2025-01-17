const prisma = require("../lib/prisma")


const getPosts = async (req,res)=>{
    try {

        const posts = await prisma.post.findMany()
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({
            message:"Fialed to get posts"
        })
    }
}


const getPost = async (req,res)=>{
    const id =req.params.id
    try {
        const post = await prisma.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        username:true,
                        avatar:true 
                    }
                }
            }
        })
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({
            message:"Fialed to get posts"
        })
    }
}


const addPosts = async (req,res)=>{
    const body = req.body
    const tokenUserId = req.userId
    try {
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId:tokenUserId,
                postDetails:{
                    create:body.postDetail
                }
            }
        })
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json({
            message:"Fialed to add posts"
        })
    }
}


const updatePosts = async (req,res)=>{
    try {
        res.status(200).json()
    } catch (error) {
        res.status(500).json({
            message:"Fialed to update posts"
        })
    }
}


const deletePosts = async (req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId

        try {
            const post = await prisma.post.findUnique({
                where:{id}
            })
            if(post.userId !== tokenUserId){
                return res.status(403).json({
                    message:"Not authorized"
                })
            }

            await prisma.post.delete({
                where:{id}
            })
        res.status(200).json({
            message:"Post deleted"
        })
    } catch (error) {
        res.status(500).json({
            message:"Fialed to delete posts"
        })
    }
}

module.exports ={
    getPosts,
    getPost,
    addPosts,
    updatePosts,
    deletePosts
}