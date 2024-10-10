import { Router } from 'express';
import { justifyText } from '../controllers/JustifyController';
import { generateToken } from '../controllers/AuthController';
import { authenticateToken } from '../middlewares/AuthMiddleware';
import { rateLimiter } from '../middlewares/RateLimiter';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     TokenRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email de l'utilisateur pour générer le token
 *       example:
 *         email: "utilisateur@exemple.com"
 *     JustifyRequest:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           description: Un exemple de text à justifier
 *       example:
 *         text: "Justifiez ce texte "
 */
/**
 * @swagger
 * /token:
 *   post:
 *     summary: Générer un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenRequest'
 *     responses:
 *       200:
 *         description: Un objet JSON contenant le token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post('/token', generateToken);

/**
 * @swagger
 * /justify:
 *   post:
 *     summary: Justifier le texte fourni
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/JustifyRequest'
 *     responses:
 *       200:
 *         description: Une réponse avec le texte justifié
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: JWT non valide ou manquant
 *       403:
 *         description: Accès refusé - token invalide
 */
router.post('/justify', authenticateToken, rateLimiter, (req, res) => {
    const justifiedText = justifyText(req.body.text);
    res.send(justifiedText);
});

export default router;
