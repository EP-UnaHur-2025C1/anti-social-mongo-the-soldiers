# 🌐 Red Anti-Social API

Este proyecto corresponde al desarrollo del backend para una red social llamada **Red Anti-Social**. La API permite la gestión de **usuarios, publicaciones, comentarios, imágenes y etiquetas**, trabajando con una base de datos **MongoDB** y el framework **Express**. Se diseñó siguiendo buenas prácticas de desarrollo web, incluyendo validaciones, relaciones entre entidades y documentación con Swagger.

## 📑 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Ejemplo de Respuesta](#ejemplo-de-respuesta)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Características

- API REST construida con Node.js, Express y MongoDB usando Mongoose.
- CRUD completo para Usuarios, Publicaciones, Comentarios, Imágenes y Etiquetas.
- Validación de datos mediante middlewares personalizados de control de errores y validaciones.
- Configurable mediante archivo .env.
- Documentación con Swagger.
- Colecciones de prueba en JSON

## Tecnologías

- **Node.js** 
- **Express** 
- **MongoDB** 
- **Mongoose** 
- **Joi** 
- **Dotenv**
- **Swagger (OpenAPI 3.0)**
- **Docker**
- **Middlewares personalizados**
- **JavaScript ES6**

## Prerrequisitos

- Node.js (v14.x o superior)
- NPM (v6.x o superior)
- MongoDB 
- Docker 

## Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/EP-UnaHur-2025C1/anti-social-mongo-the-soldiers.git
cd anti-social-mongo-the-soldiers
```

### 2️⃣ Instalar las dependencias

```bash
npm install
```

## Configuración

### Variables de Entorno

Crear archivo .env en la raíz del proyecto:

```env
PORT=puerto
MONGO_URI=mongodb://admin:admin123@localhost:27017/miBase?authSource=admin
MONTHS_COMMENTS=6
```

Levantar MongoDB con Docker

```bash
docker-compose up -d
```

## Uso

Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

Acceder a la API en:

- http://localhost:9001
- Deploy de la api: https://anti-social-mongo-the-soldiers.onrender.com/api-docs/#/

Documentación disponible en Swagger.

## API Endpoints

### 👤 Usuarios (`/users`)

- GET /users/ - Obtener todos los usuarios
- GET /users/:id - Obtener usuario por ID
- POST /users/ - Crear nuevo usuario
- PUT /users/:id - Actualizar usuario por ID
- DELETE /users/:id - Eliminar usuario por ID

### 🏷️ Tags (`/tags`)

- GET /tags/ - Obtener todas las etiquetas
- GET /tags/:id - Obtener etiqueta por ID (validación)
- POST /tags/ - Crear etiqueta (validación Joi)
- PUT /tags/:id - Editar etiqueta por ID (validación Joi)
- DELETE /tags/:id - Eliminar etiqueta por ID

### 📝 Posts (`/posts`)

- POST /posts/ - Crear post
- GET /posts/ - Obtener todos los posts
- GET /posts/:id - Obtener post por ID
- PUT /posts/:id - Editar post por ID
- DELETE /posts/:id - Eliminar post por ID

### 🖼️ Imágenes (`/images`)

- POST /upload - Subir un archivo (campo: archive)
- GET / - Obtener todas las imágenes
- GET /:id - Obtener imagen por ID
- DELETE /:id - Eliminar imagen por ID

### 💬 Comentarios (`/comments`)

- GET /comments/ - Obtener todos los comentarios
- GET /comments/perMonth - Obtener comentarios por lógica de meses
- GET /comments/:id - Obtener comentario por ID (con validación)
- POST /comments/ - Crear comentario (validación Joi)
- PUT /comments/:id - Editar comentario (validación ID + cuerpo)
- DELETE /comments/:id - Eliminar comentario por ID

## Ejemplo de Respuesta

A continuación, se muestra un ejemplo de la respuesta JSON para un post con sus relaciones:

```json
[
  {
    "_id": "68595ac9a546321790349925",
    "description": "string",
    "author": {
      "_id": "685854d24c67a829399eeca0",
      "nickname": "Franco"
    },
    "images": [
      {
        "_id": "685957547ac7cb26bb90eccb",
        "imagenes": "http://localhost:9001/images/archive-1750685524016-399893664.jpeg"
      }
    ],
    "tags": [
      {
        "_id": "685854db4c67a829399eeca2",
        "tag": "Programación"
      }
    ],
    "comments": [],
    "createdAt": "2025-06-23T13:46:49.059Z",
    "updatedAt": "2025-06-23T14:41:54.769Z",
    "__v": 0
  },
  {
    "_id": "685961c3004e2bd630b79ea5",
    "description": "Nuevo texto descriptivo",
    "author": {
      "_id": "685854d24c67a829399eeca0",
      "nickname": "Franco"
    },
    "images": [],
    "tags": [
      {
        "_id": "685854db4c67a829399eeca2",
        "tag": "Programación"
      }
    ],
    "comments": [],
    "createdAt": "2025-06-23T14:16:35.212Z",
    "updatedAt": "2025-06-23T14:18:59.248Z",
    "__v": 0
  }
]
```
