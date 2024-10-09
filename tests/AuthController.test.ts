import { generateToken } from '../src/controllers/AuthController';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('AuthController', () => {
    let mockReq: any;
    let mockRes: any;

    beforeEach(() => {
        mockReq = {
            body: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('retourner 400 si l\'email est absent', () => {
        generateToken(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Email required' });
    });

    it('générer un token et le retourner lorsque l\'e-mail est fourni', () => {
        const mockToken = 'mockToken';
        const email = 'user@example.com';
        mockReq.body.email = email;

        (jwt.sign as jest.Mock).mockReturnValue(mockToken);

        generateToken(mockReq, mockRes);

        expect(jwt.sign).toHaveBeenCalledWith({ email }, 'your-secret-key', { expiresIn: '1d' });
        expect(mockRes.json).toHaveBeenCalledWith({ token: mockToken });
    });
});
