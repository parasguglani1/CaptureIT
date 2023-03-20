
import express from 'express';

import {signin,singup} from '../controllers/users.js';

const router = express.Router();

router.post('/signin',singin);
router.post('/signup',singup);


export default router;
