const mongoose = require('mongoose')


module.exports.dbConnection = () => {
    mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => console.log("DB Connected"))
        .catch((err) => console.log("DB Connection Error ! " + err))
}
