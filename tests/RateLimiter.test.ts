import { rateLimiter } from '../src/middlewares/RateLimiter';
import { Request, Response, NextFunction } from 'express';

describe('Rate Limiter Middleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            headers: {
                'authorization': 'test-token',
            },
            body: {
                text: "Ceci est un test pour compter les mots."
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it('Autoriser la requête si elle reste dans la limite', () => {
        rateLimiter(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });

    it('Bloquer la requête si le quota est dépassé', () => {
        mockReq.body.text = 'a '.repeat(80001);
        rateLimiter(mockReq as Request, mockRes as Response, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(402);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Payment Required: Daily word limit exceeded' });
    });
});
