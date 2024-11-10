import { hash } from 'bcrypt'
import { insertUser } from "../models/User.js"
import { ApiError } from '../helpers/ApiError.js'

const postRegistration = async(req,res,next) => {
  try {
    if (!req.body.email || req.body.email.length === 0) return next(new ApiError('Invalid email for user',400))
    if (!req.body.password || req.body.password.length < 8) return next(new ApiError('Invalid password for user',400))
    const hashedPassword = await hash(req.body.password,10)
    const userFromDb = await insertUser(req.body.email, hashedPassword)
    const user = userFromDb.rows[0]
    return res.status(201).json(createUserObject(user.id,user.email))
  } catch (error) {
    return next(error)
  }
}

const createUserObject = (id,email,token=undefined) => {
  return {
    'id':id,
    'email':email,
    ...(token !== undefined && {'token':token})
  }
}

export { postRegistration,postLogin }
