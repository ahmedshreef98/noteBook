const dataMethod = ['body', 'params', 'query']

const validation = (schema) => {
    return (req, res, next) => {

        const validationErrArr = []
        dataMethod.forEach(key => {
            if (schema[key]) {
                const validatoinResult = schema[key].validate(req[key], { abortEarly: false })
                if (validatoinResult.error) {
                    validationErrArr.push(validatoinResult.error.details)
                }
            }
        })

        if (validationErrArr.length) {
            res.json({ message: "Validation Errors", err: validationErrArr })
        } else {
            next()
        }

    }
}

module.exports = validation