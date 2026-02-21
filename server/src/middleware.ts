import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token verification.


export interface AuthRequest extends Request {
    userId?: string;
}

// Middleware to validate user authentication using a JWT token.
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Extract the "authorization" header from the request.
    const header = req.headers["authorization"];

    if (!header) {
        res.status(403).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        // Verify the JWT token using the secret key.
        const decoded = jwt.verify(header, process.env.JWT_SECRET as string) as { userId: string };

        req.userId = decoded.userId; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    } catch (e) {
        // If the token is invalid, send a 403 Unauthorized response.
        res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
};
