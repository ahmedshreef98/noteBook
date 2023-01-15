const NoteModel = require("../models/note.model")


module.exports.addNote = async (req, res) => {
    const { title, desc } = req.body
    await NoteModel.insertMany({ title, desc, userId: req.user._id })
    res.json({ message: "Success Adding Note " })


}


module.exports.updateNote = async (req, res) => {
    const { noteId, title, desc } = req.body
    await NoteModel.updateOne({ _id: noteId }, { title, desc })
    res.json({ message: "Success Updating Note " })

}



module.exports.deleteNote = async (req, res) => {
    const { noteId } = req.body
    await NoteModel.deleteOne({ noteId })
    res.json({ message: "Success Delet ing Note " })


}

module.exports.getNotes = async (req, res) => {
    let page = req.query.page
    if (page == undefined || page <= 0) {
        page = 1
    }
    let PAGE_LIMIT = 5
    let Skip = (page - 1) * PAGE_LIMIT
    let data = await NoteModel.find().skip(Skip).limit(PAGE_LIMIT)
    // .populate('userId', 'name ')
    res.json({ data })

}




