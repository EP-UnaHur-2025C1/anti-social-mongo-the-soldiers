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
    "id": "665fa0b1dbe8b5e8fc0a0033",
    "content": "¿Cómo conectarse a MongoDB desde Node.js?",
    "creationDate": "2025-06-10T12:00:00Z",
    "user": {
      "id": "665fa0b1dbe8b5e8fc0a0011",
      "nickName": "fede_breme",
      "email": "fede@mail.com"
    },
    "comments": [
      {
        "id": "665fa0b1dbe8b5e8fc0a0055",
        "comment": "Muy útil, gracias!",
        "userId": "665fa0b1dbe8b5e8fc0a0011"
      }
    ],
    "tags": [
      {
        "id": "665fa0b1dbe8b5e8fc0a0022",
        "tag": "Programación"
      }
    ],
    "images": [
      {
        "id": "665fa0b1dbe8b5e8fc0a0044",
        "url": "https://cloudinary.com/image/example.png"
      }
    ]
  }
]
```

## Estructura del Proyecto

```
red-anti-social/
├── assets/                    # Recursos estáticos o de diseño (no obligatorio)
├── data/                      # Base de datos
├── src/                       # Carpeta principal del backend
│   ├── config/                # Configuración de base de datos (MongoDB, dotenv)
│   ├── controllers/           # Lógica de control para cada entidad (Tags, Comments, etc.)
│   ├── middleware/            # Middlewares de validación con Joi, errores, etc.
│   ├── mocks/                 # Colecciones de prueba (JSON de ejemplo)
│   ├── models/                # Modelos de Mongoose para cada entidad (Tag, Comment, etc.)
│   ├── routes/                # Definición de rutas para la API (Express Router)
│   ├── main.js                # Punto de entrada principal del servidor Express
│   └── openapi.yml            # Documentación Swagger en formato YAML
├── .env                      # Variables de entorno (puerto, conexión MongoDB, etc.)
├── .gitignore                # Archivos y carpetas ignoradas por git
├── docker-compose.yml        # Configuración para correr MongoDB vía Docker
├── Dockerfile                # Configuración para dockerizar la aplicación (opcional)
├── package.json              # Dependencias y scripts de npm
├── package-lock.json         # Registro de versiones exactas de paquetes
├── README.md                 # Documentación general del proyecto
```
