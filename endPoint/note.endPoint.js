const { roles } = require("../middlewear/auth");

const endPoint = {
    addNote: [roles.Admin, roles.User, roles.Hr]
}

module.exports = {
    endPoint
}