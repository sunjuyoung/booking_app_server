import asynceHandler from 'express-async-handler';
import Hotel from '../models/Hotel.js';

/**
 * @route POST api/hotels
 * @desc POST create hotel
 */
const createHotel = asynceHandler(async (req, res) => {
  const newHotel = await Hotel.create(req.body);
  res.status(200).json(newHotel);
});

/**
 * @route DELETE api/hotels/:id
 * @desc DELETE delete hotel
 */
const deleteHotel = asynceHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'id required!' });
  }
  await Hotel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `delete hotelId: ${id}` });
});

/**
 * @route GET api/hotels/:id
 * @desc get hotel
 */
const getHotelById = asynceHandler(async (req, res) => {
  const getHotelById = await Hotel.findById(req.params.id);
  if (!getHotelById) {
    res.status(404).json({ message: 'Hotel not found' });
  }
  res.status(200).json(getHotelById);
});

/**
 * @route GET api/hotels
 * @desc get All hotels
 */
const getAllHotels = asynceHandler(async (req, res) => {
  const hotels = await Hotel.find().exec();
  if (!hotels?.length) {
    res.status(404).json({ message: 'No hotels found' });
  }
  res.status(200).json(hotels);
});

/**
 * @route UPDATE api/hotel/:id
 * @desc update  hotel
 */
const updateHotel = asynceHandler(async (req, res) => {
  const updateHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(updateHotel);
});

export { createHotel, deleteHotel, getHotelById, getAllHotels, updateHotel };
