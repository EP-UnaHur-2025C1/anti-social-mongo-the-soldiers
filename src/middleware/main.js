module.exports = {
    commentValidation: require("./commentsValidation.middleware"),
    archiveValidation: require("./archiveValidation.middleware"),
    tagValidation: require("./tagValidation.middleware"),
    userValidation: require("./userValidation.middleware"),
    postValidation: require("./postValidation.middleware")
};