import { Router } from 'express';
import { justifyText } from '../controllers/JustifyController';
import { generateToken } from '../controllers/AuthController';
import { authenticateToken } from '../middlewares/AuthMiddleware';
import { rateLimiter } from '../middlewares/RateLimiter';

const router = Router();

router.post('/token', generateToken);


router.post('/justify', authenticateToken, rateLimiter, (req, res) => {
    const justifiedText = justifyText(req.body.text);
    res.send(justifiedText);
});

export default router;
