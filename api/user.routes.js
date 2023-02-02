const { signup, signin, profile } = require('../services/user.services')
const { auth } = require('../middlewear/auth')
const validation = require('../middlewear/validation')
const { signupValidator, signinValidator } = require('../validation/user.validation')
const { endPoint } = require('../endPoint/user.endPoint')

const router = require('express').Router()

router.post('/signup', validation(signupValidator), signup)
router.post('/signin', validation(signinValidator), signin)
router.get('/profile', auth(endPoint.profile), profile)



module.exports = router

