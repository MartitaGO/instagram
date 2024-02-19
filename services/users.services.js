// Importación de módulos y helpers
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'
import getPool from '../db/getPool.js'
import errors from '../helpers/errors.helper.js'

// Función asincrónica para registrar un nuevo usuario.
const newUserRegister = async (username, password, email, registrationCode) => {
  const pool = await getPool()

  // Verificamos si el nombre de usuario o el correo electrónico ya existen.
  let [users] = await pool.query(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email]
  )

  if (users.length > 0) {
    errors.userAlreadyExists()
  }

  try {
    // Hash de la contraseña y ejecución de la consulta de inserción.
    const sqlQuery =
      'INSERT INTO users (username, password, email, registrationCode) VALUES (?, ?, ?, ?)'

    const hashPassword = await bcrypt.hash(password, 6)

    const values = [username, hashPassword, email, registrationCode]
    const [response] = await pool.query(sqlQuery, values)
    return response
  } catch (err) {
    errors.conflictError(
      'Error al intentar registrar el usuario',
      'USER_REGISTER_ERROR'
    )
  }
}

// Función asincrónica para validar y activar un usuario mediante su código de registro.
const validateUser = async (registrationCode) => {
  const pool = await getPool()

  // Consulta para obtener el usuario con el código de registro dado.
  const [users] = await pool.query(
    'SELECT * FROM users WHERE registrationCode = ?',
    [registrationCode]
  )

  // Verificamos si el usuario con el código de registro existe.
  if (users.length !== 1) {
    errors.entityNotFound('Usuario')
  }

  try {
    // Consulta para activar el usuario y eliminar el código de registro.
    const sqlQuery =
      'UPDATE users SET active = TRUE, registrationCode = null WHERE id = ? '
    const values = [users[0].id]

    const [response] = await pool.query(sqlQuery, values)

    return response
  } catch (err) {
    errors.conflictError(
      'Error al intentar activar el usuario',
      'USER_ACTIVATED_ERROR'
    )
  }
}

// Función asincrónica para obtener un usuario por su correo electrónico o nombre de usuario.
const getUserByEmailOrUsername = async (email) => {
  const pool = await getPool()

  // Consulta para obtener el usuario por correo electrónico o nombre de usuario.
  const [users] = await pool.query(
    'SELECT * FROM users WHERE email = ? OR username = ? ',
    [email, email]
  )
 // Verificamos si el usuario existe.
  if (users.length == 0) {
    errors.entityNotFound('Usuario')
  }

  return users[0]
}

// Función asincrónica para obtener la lista de todos los usuarios.
const getUsers = async () => {
  const pool = await getPool()

  // Consulta para obtener la lista de todos los usuarios.
  const [users] = await pool.query('SELECT * FROM users')

  return users
}

// Función asincrónica para obtener un usuario por su ID
const getUserById = async (userId) => {
  const pool = await getPool()
  const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId])

  // Verificamos si el usuario existe.
  if (users.length < 1) {
    errors.entityNotFound('Usuario')
  }

  return users[0]
}

// Función asincrónica para actualizar el avatar de un usuario.
const updateAvatar = async (userId, avatar) => {
  const pool = await getPool()

  // Consulta para actualizar el avatar del usuario.
  await pool.query('UPDATE users SET avatar = ? WHERE id = ? ', [
    avatar,
    userId
  ])
}

// Función asincrónica para generar un código de recuperación de contraseña y actualizarlo en la base de datos.
const updatePasswordRecover = async (user) => {
  const recoverPassCode = randomstring.generate(10)

  const pool = await getPool()

  // Consulta para actualizar el código de recuperación de contraseña del usuario.
  const [response] = await pool.query(
    'UPDATE users SET recoverPassCode = ? WHERE id = ? ',
    [recoverPassCode, user.id]
  )
  // Verificamos si la actualización fue exitosa.
  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al generar recoverPassCode.',
      'RECOVER_PASS_ERROR'
    )
  }

  return recoverPassCode
}

// Función asincrónica para actualizar la contraseña de un usuario después de la recuperación.
const updateUserPassword = async (user, newPass) => {
  const pool = await getPool()
  const newPassEncrypted = await bcrypt.hash(newPass,5);

  // Consulta para actualizar la contraseña del usuario y eliminar el código de recuperación.
  const [response] = await pool.query(
    'UPDATE users SET password = ?, recoverPassCode = NULL WHERE id = ?',
    [newPassEncrypted, user.id]
  )
  // Verificamos si la actualización fue exitosa.
  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al actualizar la contraseña.',
      'PASSWORD_UPDATE_ERROR'
    )
  }
}

// Exportación de las funciones como un objeto para su uso en otras partes del código.
export default {
  newUserRegister,
  validateUser,
  getUserByEmailOrUsername,
  getUsers,
  getUserById,
  updateAvatar,
  updatePasswordRecover,
  updateUserPassword
}
