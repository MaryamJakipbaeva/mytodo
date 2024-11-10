import { insertUser, selectUserByEmail } from '../models/User.js';
import { ApiError } from '../helpers/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
      throw new ApiError('Invalid email or password', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(email, hashedPassword);
    res.status(201).json({ id: result.rows[0].id, email: result.rows[0].email });
  } catch (error) {
    next(error);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userResult = await selectUserByEmail(email);
    if (userResult.rows.length === 0 || !(await bcrypt.compare(password, userResult.rows[0].password))) {
      throw new ApiError('Invalid email or password', 400);
    }
    const token = jwt.sign({ id: userResult.rows[0].id }, process.env.JWT_SECRET);
    res.status(200).json({ id: userResult.rows[0].id, email: userResult.rows[0].email, token });
  } catch (error) {
    next(error);
  }
}
