import jwt from 'jsonwebtoken';

export const generateToken = (user_id) => {
    return jwt.sign({ token:  user_id}, process.env.JWT_SECRET, { expiresIn: '8h' });
};