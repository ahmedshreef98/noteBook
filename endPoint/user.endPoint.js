const { roles } = require("../middlewear/auth");

const endPoint = {
    profile: [roles.Admin, roles.User]
}

module.exports = { endPoint }