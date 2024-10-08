import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

export const generateToken = (req : any, res : any) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const token = jwt.sign({ email }, secret, { expiresIn: '1d' });
    res.json({ token });
};
