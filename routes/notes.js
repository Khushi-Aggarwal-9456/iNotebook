const express = require("express")
const router = express.Router()
const { fetchUser } = require('../middleware/fetchuser')
const notes = require("../models/Note")
const { body, validationResult } = require("express-validator")


// Route:1 getting notes of the loggedin user using the API: api/notes/getnotes

router.get("/getnotes", fetchUser, async (req, res) => {
    try {
        const notes = await notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error);
    }
})

// ROUTE:2 for making notes of logged in users using api: api/notes/addnote

router.post("/addnote", fetchUser,[
    body('title', "enter the notes title").isLength({ min: 1 }),
    body('description', "enter your description").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const note = new notes({
            title, description, tag ,user:req.user.id
        })
        console.log("notes came to note")
        const saveNotes = await note.save()
        res.json({ saveNotes })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

module.exports = router;

