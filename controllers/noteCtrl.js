const Notes = require('../models/noteModel')


const noteCtrl = {
    getNotes: async (req, res) => {
        try {
            const { id } = req.user;
            // res.json(id);
            const notes = await Notes.find({ user_id: id });
            // res.json('ok');
            console.log(notes);
            res.json(notes);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    creatNotes: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            const { id, name } = req.user;
            const newNote = new Notes({
                title: title,
                content: content,
                date: date,
                user_id: id,
                name: name,

            })
            await newNote.save();
            res.json('create successful')

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteNote: async (req, res) => {
        try {
            const note = await Notes.findByIdAndDelete(req.params.id);
            res.status(201).json('Delete successfull')
            // res.json(note);

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            await Notes.findByIdAndUpdate({ _id: req.params.id }, {
                title,
                content,
                date
            });
            res.json('Update successfull')

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await Notes.findOne({ _id: req.params.id });
            console.log(note);
            res.json(note)

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}
module.exports = noteCtrl;