const { endPoint } = require('../endPoint/note.endPoint')

const { auth, roles } = require('../middlewear/auth')
const validation = require('../middlewear/validation')
const { addNote, updateNote, deleteNote, getNotes } = require('../services/note.services')
const { addNoteValidator, updateNoteValidator } = require('../validation/note.validation')


const router = require('express').Router()


router.route('/')
    .post(validation(addNoteValidator), auth(endPoint.addNote), addNote)
    .get(getNotes)
    .delete(deleteNote)

router.put('/:id', validation(updateNoteValidator), auth(), updateNote)
module.exports = router

