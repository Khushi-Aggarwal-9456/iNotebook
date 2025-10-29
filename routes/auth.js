const express = require("express")
const router = express.Router()
const Users = require("../models/Users")
// const { ExpressValidator } = require("express-validator")
const {body, validationResult}=require("express-validator")

router.post("/", [
    body('name',"enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "password should be 5 digits and strong").isLength({ min: 5 })
], async(req, res) => {
    
    // through post the request will be sen for authenication of user into postman
    const result = await validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user=>res.json(user))
})

module.exports = router
