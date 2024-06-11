import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { TokenValidator } from "../utils/token-validator";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = await verifyToken(token)
  
    if (!result?.success) {
      return res.status(403).json({ error: result.error });
    }

    next();
}

export const generateToken = async (): Promise<string> => {
    const payload = {
        email: "john@gmail.com"
    }
    const secret = 'your-secret-key';
    const options = { expiresIn: '15s' };
    return jwt.sign(payload, secret, options);
}

export const verifyToken = async (token: string) => {
    const secret = 'your-secret-key';
    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const generateRefreshToken = async (): Promise<string> => {
    const payload = {
        email: "john@gmail.com"
      };
      const secret = 'your-refresh-token-secret';
      const options = { expiresIn: '1m' };
    
      return jwt.sign(payload, secret, options);
}

export const verifyRefreshToken = async (token: string) => {
    const secret = 'your-refresh-token-secret';
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
}