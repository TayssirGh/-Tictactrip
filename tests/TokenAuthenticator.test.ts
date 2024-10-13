import { authenticateToken } from '../src/controllers/TokenAuthenticator';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('AuthMiddleware - authenticateToken', () => {
    let mockReq: any;
    let mockRes: any;
    let mockNext: any;

    beforeEach(() => {
        mockReq = {
            headers: {
                authorization: null,
            }
        };
        mockRes = {
            sendStatus: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it('Si il y pas de token, on aura un  403 !', () => {
        mockReq.headers.authorization = '';

        authenticateToken(mockReq, mockRes, mockNext);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(403);
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('Si le de token est invalid, on aura un  403 aussi ', () => {
        mockReq.headers.authorization = 'Bearer invalidtoken';

        (jwt.verify as jest.Mock).mockImplementationOnce((token, secret, callback) => {
            callback(new Error('invalid token'), null);
        });

        authenticateToken(mockReq, mockRes, mockNext);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(403);
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('Ça marche ! On passe 😁', () => {
        mockReq.headers.authorization = 'Bearer validtoken';

        (jwt.verify as jest.Mock).mockImplementationOnce((token, secret, callback) => {
            callback(null, { id: 123, name: 'John Doe' });
        });

        authenticateToken(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.sendStatus).not.toHaveBeenCalled();
        expect(mockReq.user).toEqual({ id: 123, name: 'John Doe' });
    });
});
