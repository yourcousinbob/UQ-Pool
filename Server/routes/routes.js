/* Request routes for express app*/

const express = require('express');
import { signup, login, isAuth } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.use('/', (req, res, next) => {
    res.status(404).json({error : "Page not found"});
});

export default router;

