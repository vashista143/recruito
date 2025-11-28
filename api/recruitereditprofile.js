import db from '../lib/connectdb.js';
import Recruiter from '../lib/models/recruitor.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export default async function handler(req, res) {
  if (req.method !== 'POST') 
    return res.status(405).json({ message: 'Method not allowed' });

  await db.connect();
  console.log("connectedto db")
  
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const recruiterId = decoded.id;

    if (!recruiterId) return res.status(401).json({ message: 'Unauthorized: Invalid token' });

    const { companyWebsite, companyLogoLink, department, location } = req.body;

    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      recruiterId,
      { $set: { companyWebsite, companyLogoLink, department, location } },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) return res.status(404).json({ message: 'Recruiter not found' });

    return res.status(200).json({ message: 'Profile updated', recruiter: updatedRecruiter });
  } catch (err) {
    console.error("Error updating recruiter profile:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
