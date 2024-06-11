import jwt from "jsonwebtoken"

export class TokenValidator {

    constructor(){}

    async generateToken(): Promise<string> {
        const payload = {
            email: "john@gmail.com"
        }
        const secret = 'your-secret-key';
        const options = { expiresIn: '15s' };
        return jwt.sign(payload, secret, options);
    }

    async verifyToken(token: string) {
        const secret = 'your-secret-key';
        try {
            const decoded = jwt.verify(token, secret);
            return { success: true, data: decoded };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async generateRefreshToken(): Promise<string> {
        const payload = {
            email: "john@gmail.com"
          };
          const secret = 'your-refresh-token-secret';
          const options = { expiresIn: '7d' };
        
          return jwt.sign(payload, secret, options);
    }

    async verifyRefreshToken(token: string) {
        const secret = 'your-refresh-token-secret';
        try {
          const decoded = jwt.verify(token, secret);
          return { success: true, data: decoded };
        } catch (error) {
          return { success: false, error: error.message };
        }
    }
}