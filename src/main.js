const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const conectarDB = require('./config/database');
const { archive, user, tag, comment, post } = require('./routes/main');
require('dotenv').config()

const app = express();

const swaggerDocument = YAML.load('./src/openapi.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 9001;

app.use('/images', express.static('uploads')); // server static files

//Middleware
app.use(express.json());

//Routers
app.use('/api/archives', archive);
app.use('/api/users', user);
app.use('/api/comments', comment)
app.use('/api/tags', tag)
app.use('/api/posts', post);


//Conexion MongoDB
conectarDB();

app.listen(PORT, () => {
    console.log(`Listen in the PORT ${PORT}`)
})