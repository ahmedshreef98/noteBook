const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./config/dbConfig')
const app = express()

app.use(express.json())
app.use(cors())
require('dotenv').config({ path: './config/.env' })
const port = process.env.PORT

app.use('/api/v1/users/', require('./api/user.routes'))
app.use('/api/v1/notes/', require('./api/note.routes'))

app.get('/', (req, res) => {
    res.send("Welcome ")
})


dbConnection()


app.listen(port, () => console.log(`App now Running On Port ${process.env.PORT}`))