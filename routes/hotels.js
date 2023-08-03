import express from 'express';
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  countByCity,
} from '../controllers/hotelController.js';

const router = express.Router();

router.post('/', createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', deleteHotel);

router.get('/find/:id', getHotelById);

router.get('/', getAllHotels);

router.get('/countByCity', countByCity);
router.get('/countByType', getAllHotels);

export default router;
