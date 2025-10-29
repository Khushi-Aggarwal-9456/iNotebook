const express = require("express")
const router = express.Router()
const Users=require("../models/Users")

router.post("/", (req, res) => {
    res.send(req.body)

    // through post the request will be sen for authenication of user into postman
    const user=Users(req.body)
    user.save()
    console.log(req.body)
})

module.exports= router
