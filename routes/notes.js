const express = require("express")
const router = express.Router()

router.use("/",(res,req)=>{
    obj={
        title:"my new cloud notebok project"
    }
    res.json(obj)
})

module.exports=router

