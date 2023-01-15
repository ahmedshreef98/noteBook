const { auth } = require('../middlewear/auth')
const { addNote, updateNote, deleteNote, getNotes } = require('../services/note.services')

const router = require('express').Router()


router.route('/')
    .post(auth(), addNote)
    .get(getNotes)
    .put(updateNote)
    .delete(deleteNote)

module.exports = router

