import {Router} from 'express';
import {generateToken} from '../controllers/AuthController';

const router = Router();


router.post('/token', generateToken);

export default router;
