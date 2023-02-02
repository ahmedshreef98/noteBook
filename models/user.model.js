const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cryptoJS = require('crypto-js')


const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, default: 'User' }
}, { timetamps: true })


userSchema.pre('insertMany', async function (next, docs) {
    console.log(docs);
    docs.password = await bcrypt.hash(docs.password, parseInt(process.env.saltRounds))
    console.log(docs);
    next()
})


userSchema.pre('save', async function (next) {
    // console.log(this);
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRounds))
    this.phone = cryptoJS.AES.encrypt(this.phone, process.env.encryptKey)
    // console.log(this);
    next()
})

module.exports = mongoose.model('user', userSchema)
