import express from 'express';
import {
  deleteRoom,
  updateRoom,
  createRoom,
  getRooms,
  getRoomById,
} from '../controllers/roomController.js';

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.put('/:id', updateRoom);
router.post('/:hotelId', createRoom);
router.delete('/:id', deleteRoom);

export default router;
