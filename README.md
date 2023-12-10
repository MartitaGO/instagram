# Clon de Instagram

Este ejercicio consiste en crear una API que clone la red social de fotos conocida como Instagram. 

## Entidades 
- User: 
    - id
    - email
    - password
    - createdAt

- Post:
    - id
    - user
    - image
    - texto (opcional)
    - createdAt

> [!IMPORTANT]
>### Endpoints
> **POST /user** Registro de usuario
> **POST /login** Login de usuario (devuelve token) 
> **POST /** Permite crear un post con una imagen (y texto opcional) - tamaño de foto debe tener un min-max y una descripción
> **POST /vote** Permite darle like a una foto
> **GET /** Permite ver las últimas fotos publicadas por otros usuarios
> **GET /user/:profile** Devuelve el perfil del usuario con su galería de fotos
> **GET /search** Permite buscar una publicación de una foto por su texto descriptivo
> **PUT /user** Editar el perfil/registro de un usuario

# Instrucciones de instalación

1. Instalar las dependencias mediante el comando `npm i`.

2. Renombrar el fichero `.env.example` y cubrir los campos.

3. Ejecutar el servidor con el comando `npm run dev`.
