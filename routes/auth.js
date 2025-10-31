const express = require("express")
const router = express.Router()
const Users = require("../models/Users")
const { body, validationResult } = require("express-validator")
const bcryptjs=require("bcryptjs")
const jwt = require('jsonwebtoken')

const JWT_SECRET="khushi will be the next best mern stack develper"

// through post the request will be sen for authenication of user into postman
// specifications implied in user auth data

router.post("/createUser", [
  body('name', "enter a valid name").isLength({ min: 3 }),
  body('email', "enter a valid email").isEmail(),
  body('password', "password should be 5 digits and strong").isLength({ min: 5 })
], async (req, res) => {
  // error message will be given if the credentials dont met with the format
  // console.log("running smoothly")
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    //   the data goes in the user module from here 
    // check if the user exists already

    let user = await Users.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "sorry, but this email already exists, enter new one" })
    }

    // salt created(salt is an extra words in password by the adminstrator soo that no one decode the hash)
    const salt = await bcryptjs.genSalt(10)
    // console.log(salt)

    // here hash is genrated for both the actual password and the salt mixed with it
    const secPass= await bcryptjs.hash(req.body.password,salt)
    // console.log(secPass)

    user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    // jwt token genrated
    const data={
      user:{
        id: user.id
      }
    }
    const authJWT=jwt.sign(data,JWT_SECRET)
    res.json({authJWT})
  } catch (error) {
    console.log(error);
  }
})

module.exports = router
