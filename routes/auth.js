const express = require("express")
const router = express.Router()

router.get("/", (res, req) => {
    obj={
        a: "khushi",
        number: 9456040770
    }
    res.json(obj)
})

module.exports= router
