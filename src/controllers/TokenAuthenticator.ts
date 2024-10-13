import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

export const authenticateToken = (req : any, res : any, next : any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, secret, (err : any, user : any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};