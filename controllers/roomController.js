import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import asyncHandler from 'express-async-handler';
import path from 'path';

/**
 * @route POST api/rooms
 * @desc create room
 */
const createRoom = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  const { title, price, desc, maxPeople, rommNumbers } = req.body;

  if (!hotelId) {
    res.status(404).json({ message: 'hotelId required!' });
  }

  let img = req.body.img;
  if (!req.body.img || req.body.img.length < 1) {
    img = path.resolve().toString() + '\\public\\images\\hotel1.jpg';
  }

  const room = await Room.create({
    title,
    price,
    desc,
    img,
    maxPeople,
    rommNumbers,
  });

  if (!room) {
    res.status(400).json({ message: 'Invalid room data' });
  }

  const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
    $push: { rooms: room._id },
  }).exec();
  if (!updatedHotel) {
    res.status(404).json({ message: 'fail hotel update' });
  }

  res.status(201).json({
    _id: room._id,
    title: room.title,
  });
});

/**
 * @route PUT api/rooms
 * @desc update room
 */
const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'id required!' });
  }

  const updatedRoom = await Room.findByIdAndupdate(id, { $set: req.body }, { new: true }).exec();
  if (!updatedRoom) {
    res.status(404).json({ message: 'Room not found' });
  }
  res.status(200).json(updatedRoom);
});

/**
 * @route DELETE api/rooms/id
 * @desc delete room
 */
const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'id required!' });
  }
  const deletedRomm = await Room.findByIdAndDelete(req.params.id);
  if (!deletedRomm) {
    res.status(404).json({ message: 'Room not found' });
  }
  res.status(200).json({ message: `delete roomId: ${id}` });
});

/**
 * @route get api/rooms/id
 * @desc get room By id
 */
const getRoomById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'id required!' });
  }
  const room = await Room.findById(id);
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

/**
 * @route GET api/rooms
 * @desc get all room
 */
const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find().lean().exec();
  if (!rooms?.length) {
    res.status(404).json({ message: 'No rooms found' });
  }
  res.json(rooms);
});

export { createRoom, getRooms, getRoomById, updateRoom, deleteRoom };
