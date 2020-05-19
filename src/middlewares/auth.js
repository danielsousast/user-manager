import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import jwtConfig from '../config/jwt';
import User from '../models/User';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);

        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        if (user.deleted === true) {
            return res.status(401).json({ error: 'Disabled user' });
        }

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
