import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

/**
 * @route PUT api/users/id
 * @desc update  users
 *
 */
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password, roles } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'id required!' });
  }
  const user = User.findOne({ username }).exec();
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }
  const updeateUser = await User.findByIdAndUpdate(req.params.id, email);
  res.status(200).json(updeateUser);
});

/**
 * @route DELETE api/users/delete
 * @desc delete  users
 *
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'id required!' });
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `delete userId: ${id}` });
});

/**
 * @route GET api/users/id
 * @desc get  users BY id
 *
 */
const getUesrById = asyncHandler(async (req, res) => {
  const getUesrById = await User.findById(req.params.id);
  if (!getUesrById) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(getUesrById);
});

/**
 * @route GET api/users
 * @desc get All users
 *
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean().exec();
  if (!users?.length) {
    res.status(404).json({ message: 'No users found' });
  }
  res.status(200).json(users);
});

/**
 * @route GET api/users
 * @desc get All users
 *
 */
const getUesrByEmail = asyncHandler(async (req, res) => {});

export { updateUser, deleteUser, getUesrById, getUsers, getUesrByEmail };
