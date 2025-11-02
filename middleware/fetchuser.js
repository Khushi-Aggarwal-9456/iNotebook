const jwt=require("jsonwebtoken")
const JWT_SECRET= "khushi will be the next best mern stack develper"

const fetchUser=(req, res, next)=>{
    console.log('middleware ');
    // get the usre from jwt token and get the id from it
    const token=req.header("authToken")
    if(!token){
        res.status(401).JSON({error:"please authenticate using avalid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next();
    } catch (error) {
        res.status(401).JSON({error:"please authenticate using avalid token"})
        
    }
}

module.exports={fetchUser}