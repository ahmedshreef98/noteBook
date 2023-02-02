const Joi = require("joi")
const { param } = require("../api/user.routes")

//SignUp Vlaidation predictable Schema
const signupValidator = {
    body: Joi.object().required().keys({
        name: Joi.string().min(3).max(30).required().messages({
            'string.empty': 'Please Fill U Name',
            'any.required': 'Name Required Field',
            'string.base': 'This Field Accept  String'
        }),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new
            RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')).required(),
        cPassword: Joi.string().valid(Joi.ref('password')).required(),
        // Ref Can't be required
        phone: Joi.number().required()
    })
}

//SignIn Vlaidation predictable Schema
const signinValidator = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new
            RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')).required(),

    })
}


module.exports = { signupValidator, signinValidator }
