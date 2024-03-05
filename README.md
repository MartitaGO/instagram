# ClonInsta_Back
Backend con Node.js

# Proyecto Instagram API
Este proyecto consiste en la creación de una API que replica algunas funcionalidades básicas de la red social de fotos Instagram. A continuación, se presenta una descripción detallada de las principales funcionalidades, entidades y puntos clave del proyecto.

### Notas de los autores para el profesor
Tras compartir feedback del anterior proyecto, experiencias personales y comentarios del profesor, los alumnos del curso JSB28RT en Hack A Boss: Marta García, Daniela Espinosa, Gonzalo Bonilla y Julen Ortega han sido capaces de llevar a cabo una colaboración bastante mejor organizada. 

#### Repartición de tareas
- Marta García > Funciones de login y registro, Creación de usuarios y posts con postman
- Daniela Espinosa > Creación de tablas en mysql, Función de búsqueda de fotos por su texto descriptivo, Creación de usuarios y posts con postman
- Gonzalo Bonilla > Funciones de hacer una publicación de una foto con descripción y dar like, Creación de usuarios y posts con postman
- Julen Ortega > README, Comentarios descriptivos en cada archivo, Funciones de ver las fotos publicadas por otros usuarios y perfil de un usuario con su galería de fotos
- Todos > Revisión y corrección de errores a medida que se iba creando y probando la API

## ENTIDADES
### Usuarios (Users)
- id: Identificador único del usuario.
- email: Correo electrónico del usuario.
- username: Nombre de usuario único.
- password: Contraseña del usuario.
- avatar: Imagen de perfil del usuario.
- active: Identifica si el usuario está activo
- role: Identifica el rol del usuario (admin o normal)
- registrationCode: Código de registro
- recoverPassCode: Código de recuperación de contraseña
- createdAt: Fecha y hora de creación del usuario.

### Publicaciones (Posts)
- id: Identificador único de la publicación.
- description: Descripción de la publicación.
- userId: Identificador del usuario de la publicación
- photo: Imagen asociada a la publicación.
- createdAt: Fecha y hora de creación de la publicación.

### Likes
- id: Identificador único del like.
- userId: Identificador único del usuario que está dando like
- postId: Identificador único del post al que está dando like
- createdAt: Fecha y hora de creación del like.

## ENDPOINTS DISPONIBLES
### Usuarios
- **POST /users/register:** Registro de nuevos usuarios.
- **GET /users/validate/:registrationCode:** Validación de usuarios mediante código de registro.
- **POST /users/login:** Inicio de sesión de usuarios.
- **GET /users: Obtener** información del usuario autenticado.
- **GET /users/:userId:** Obtener información del perfil de un usuario.
- **PUT /users/avatar:** Actualizar avatar de usuario.
- **POST /users/password/recover:** Iniciar proceso de recuperación de contraseña.
- **PUT /users/password:** Cambiar la contraseña de un usuario.

### Publicaciones
- **POST /posts:** Crear una nueva publicación.
- **POST /posts/:entryId/photos:** Agregar foto a una publicación.
- **DELETE /posts/:entryId/photos/:photoId:** Eliminar una foto de una publicación.
- **POST /posts/:postsId/like:** Dar like a una publicación.
- **GET /posts/:postId/photos:** Obtener listado de fotos de una publicación.
- **GET /posts:** Obtener listado de todas las publicaciones.

## MIDDLEWARES y HELPERS
Se han implementado middlewares para validar la autenticación, la existencia de usuarios, la autorización para editar, entre otros. Además, se han creado esquemas de validación utilizando Joi para garantizar la integridad de los datos.

## INSTRUCCIONES DE INSTALACIÓN
1. Clona el repositorio mediante el comando git clone.
2. Instala las dependencias utilizando el comando npm install.
3. Renombra el archivo .env.example a .env y completa los campos necesarios.
4. Crear la carpeta Uploads.
5. Ejecuta el servidor con el comando npm start.
6. ¡Listo! La API estará disponible para su uso.


## Notas Adicionales
Este proyecto utiliza tecnologías como Node.js, Express, MySQL como base de datos, y diversas librerías para funciones específicas. Asegúrate de tener configurado un entorno de desarrollo adecuado antes de iniciar la aplicación.


## CORREGIR
-que nos aparezcan los likes en la búsqueda de posts 