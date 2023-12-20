import express from 'express';
const router = express.Router();

import {getTours,createTour, getTour, getToursByUser, deleteTour, updateTour, getToursBySearch, getToursByTag, getRelativeTours, likeTours} from '../controllers/tour.js';
import { auth } from '../middlewares/auth.js';

router.get('/search',getToursBySearch);
router.get('/',getTours);
router.get('/:id',getTour);
router.get('/tag/:tag',getToursByTag);
router.post('/relatedTours',getRelativeTours);


router.post('/', auth, createTour);
router.delete('/:id',auth,deleteTour);
router.patch('/:id',auth,updateTour);
router.get('/userTours/:id',auth,getToursByUser);
router.patch(`/like/:id`,auth,likeTours)



export default router;
