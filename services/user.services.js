const UserModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cryptoJS = require('crypto-js')

// const { use } = require("../api/user.routes")


module.exports.signup = async (req, res) => {
    const { name, email, password, phone } = req.body
    let user = await UserModel.findOne({ email })


    if (user) {
        res.json({ mesage: "Email Already Exists" })
    } else {
        const newUser = new UserModel({ name, email, password, phone })
        const savedUser = await newUser.save()
        // await UserModel.insertMany({ name, email, password })
        res.json({ message: "Success" })

    }

}



module.exports.signin = async (req, res) => {

    const { email, password } = req.body
    let user = await UserModel.findOne({ email })

    if (user) {

        const match = await bcrypt.compare(password, user.password)

        if (match) {
            const token = jwt.sign({ _id: user._id, name: user.name, isLoggIn: true },
                process.env.tokenSignature, { expiresIn: 60 * 60 * 12 })
            res.json({ mesage: "DONE Login ", token })
        } else {
            res.json({ message: "Incorrect password " })
        }
    } else {
        res.json({ message: "Email Don't exist " })
    }

}

module.exports.profile = async (req, res) => {
    try {
        let user = await UserModel.findById(req.user._id)
        user.phone = cryptoJS.AES.decrypt(user.phone, process.env.encryptKey).toString(cryptoJS.enc.Utf8)
        res.json({ message: "Done", user })
    } catch (error) {
        console.log(error);
        res.json({ message: "Catch Error", error })

    }

}



