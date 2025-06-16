const express = require('express');
require('dotenv').config()
const conectarDB = require("./config/database")
const routerComments = require("./routes/commentsRoutes")
const tagRoutes = require("./routes/tagRoutes")

const app = express();

app.use(express.json())

const PORT = process.env.PORT;

app.use(`/comments`, routerComments)
app.use(`/tags`, tagRoutes)

conectarDB()

app.listen(PORT, () => {
    console.log(`Listen in the PORT ${PORT}`)
})