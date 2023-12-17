import express from 'express';
const router = express.Router();

import {getTours,createTour, getTour, getToursByUser, deleteTour, updateTour} from '../controllers/tour.js';
import { auth } from '../middlewares/auth.js';

router.post('/', auth, createTour);
router.get('/',getTours);
router.get('/:id',getTour);
router.delete('/:id',auth,deleteTour);
router.patch('/:id',auth,updateTour);
router.get('/userTours/:id',auth,getToursByUser);



export default router;
