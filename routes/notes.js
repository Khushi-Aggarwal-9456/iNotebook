const express = require("express")
const router = express.Router()
const { fetchUser } = require('../middleware/fetchuser')
const notes = require("../models/Note")
const { body, validationResult } = require("express-validator")


// Route:1 getting notes of the loggedin user using the API: api/notes/fetchnotes

router.get("/fetchnotes", fetchUser, async (req, res) => {
    try {
        const note = await notes.find({ user: req.user.id })
        res.json(note)
    } catch (error) {
        console.log(error);
    }
})

// ROUTE:2 for making notes of logged in users using api: api/notes/addnote

router.post("/addnote", fetchUser, [
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
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

// ROUTE:3 Update the note using api: api/notes/updatenotes

router.put("/updatenote/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    // create a new note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // find the note to be updated and update it
    let note = await notes.findById(req.params.id)
    try {
        if (!note) {
            { return res.status(404).send("not found") }
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error)
    }
})

// ROUTE:4 detete a note from the notes using the api: /api/notes/deletenote using DELETE 

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        let note = await notes.findById(req.params.id)
        if (!note) {
            return res.status(401).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await notes.findByIdAndDelete(req.params.id)
        res.json({ "sucess": "note deleted succesfully", note: note })
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;

