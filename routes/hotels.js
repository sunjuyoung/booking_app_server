import express from 'express';
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
} from '../controllers/hotelController.js';

const router = express.Router();

router.post('/', createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', deleteHotel);

router.get('/:id', getHotelById);

router.get('/', getAllHotels);

export default router;
