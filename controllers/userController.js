import User from '../models/UserModel.js';
import HttpError from '../utils/httpError.js'; 



export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    return next(new HttpError(`Could not create task: ${err.message}`, 500));
  }
};