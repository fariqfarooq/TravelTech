import express from 'express';
const router = express.Router();

import {googleSignin, signin, signup } from '../controllers/user.js'



router.post('/signup',signup);

router.post('/signin' , signin);

router.post('/googleSignIn',googleSignin);



export default router;