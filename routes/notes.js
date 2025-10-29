const express = require("express")
const router = express.Router()

router.use("/",(req,res)=>{
    res.send("hey im in notes");
    // obj={
    //     title:"my new cloud notebok project"
    // }
    res.json(obj)
})

module.exports=router

