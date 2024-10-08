import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

export const authenticateToken = (req : any, res : any, next : any) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, secret, (err : any, user : any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
