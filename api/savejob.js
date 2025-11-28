import mongoose from "mongoose";
import db from "../lib/connectdb.js";
import User from "../lib/models/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, jobId } = req.body || {};

  if (!id || !jobId) {
    return res.status(400).json({ message: "Missing required fields: id and jobId" });
  }

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid id or jobId format" });
  }

  try {
    await db.connect();

    // use 'new' to construct ObjectId instances
    const userObjectId = new mongoose.Types.ObjectId(id);
    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    const updatedUser = await User.findByIdAndUpdate(
      userObjectId,
      { $addToSet: { saved: jobObjectId } }, // addToSet prevents duplicates
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Job saved successfully", saved: updatedUser.saved });
  } catch (err) {
    console.error("savejob error:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    try { await db.disconnect?.(); } catch (e) { /* ignore */ }
  }
}
