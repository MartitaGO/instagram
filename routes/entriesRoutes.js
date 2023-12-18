import express from 'express'

import {
  authUser,
  userExists,
  newEntry,
  entryExists,
  canEdit,
  addPhoto, 
  lookPhoto, // Buscar fotos
  deletePhoto,
  voteEntry
} from '../middlewares/index.middleware.js'

const router = express.Router()

//Ruta para nueva publicacion
router.post('/entries', authUser, userExists, newEntry)

//Ruta para agregar foto
router.post(
  '/entries/:entryId/photos',
  authUser,
  userExists,
  entryExists,
  canEdit,
  addPhoto
)

//Ruta para eliminar una foto
router.delete(
  '/entries/:entryId/photos/:photoId',
  authUser,
  userExists,
  entryExists,
  canEdit,
  deletePhoto
)

//Ruta para dar Like
router.post(
  '/entries/:entryId/likes',
  authUser,
  userExists,
  entryExists,
  voteEntry
)

//Ruta para obtener listado de Fotos
router.get(
    '/entries/:entryId/photos',
    authUser,
    userExists,
    entryExists,
    lookPhoto
  )

export default router
