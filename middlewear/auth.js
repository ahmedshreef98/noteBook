const jwt = require('jsonwebtoken')
const UserModel = require("../models/user.model")
//Middelware Func 
const auth = () => {
    return async (req, res, next) => {

        try {
            const headerToken = req.headers['authorization']
            if (!headerToken ||
                headerToken == null ||
                headerToken == undefined ||
                headerToken.length == 0 ||
                !headerToken.startsWith(`${process.env.bearerToken} `)) {
                res.json({ message: "Invalid Header Token Bearer" })

            } else {
                const token = headerToken.split(' ')[1]
                console.log(token);
                if (!token ||
                    token == null ||
                    token == undefined ||
                    token.length == 0) {
                    res.json({ message: "Invalid Token" })
                } else {
                    const decoded = jwt.verify(token, process.env.tokenSignature)
                    const findUser = await UserModel.findById(decoded._id).select('email name')
                    if (!findUser) {
                        res.json({ message: "USER_ID Didn't Found " })
                    } else {
                        req.user = findUser
                        next()
                    }

                }

            }

        }


        catch (error) {
            res.json({ message: "Error in Verify Token ! ", error })
        }
    }
}

module.exports = { auth } 