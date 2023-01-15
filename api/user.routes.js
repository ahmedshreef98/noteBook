const { signup, signin, profile } = require('../services/user.services')
const { signupValidation } = require('../validation/signup.validation')
const { auth } = require('../middlewear/auth')
const router = require('express').Router()

router.post('/signup', signupValidation, signup)
router.post('/signin', signin)
router.get('/profile', auth(), profile)


// router.route('/')
//     .post('/', createUser)
//     .get('/', getUsers)
//     .put('/', updateUser)
//     .delete('/', deleteUser)


module.exports = router

