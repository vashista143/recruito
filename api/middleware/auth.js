import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach recruiter ID to request object
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
