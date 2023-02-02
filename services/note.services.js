const NoteModel = require("../models/note.model")


module.exports.addNote = async (req, res) => {
    const { title, desc } = req.body
    const note = await NoteModel.insertMany({ title, desc, userId: req.user._id })
    res.json({ message: "Success Adding Note", note })


}


module.exports.updateNote = async (req, res) => {
    const { title, desc } = req.body
    const note = await NoteModel.updateOne({ _id: req.params.id, userId: req.user._id }, { title, desc }, { new: true })
    res.json({ message: "Success Updating Note ", note })

}



module.exports.deleteNote = async (req, res) => {
    const { noteId } = req.body
    await NoteModel.deleteOne({ noteId })
    res.json({ message: "Success Deleting Note " })


}

module.exports.getNotes = async (req, res) => {
    let page = req.query.page
    if (page == undefined || page <= 0) {
        page = 1
    }
    let PAGE_LIMIT = 5
    let Skip = (page - 1) * PAGE_LIMIT
    let data = await NoteModel.find().skip(Skip).limit(PAGE_LIMIT)

    res.json({ data })

}




