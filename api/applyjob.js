import db from "../lib/connectdb.js";
import Job from "../lib/models/job.js";
import User from "../lib/models/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { jobId, userId } = req.body;

  if (!jobId || !userId) {
    return res.status(400).json({ success: false, message: "Missing jobId or userId" });
  }

  await db.connect();

  try {
    const job = await Job.findOneAndUpdate(
      { _id: jobId, appliedby: { $ne: userId } }, 
      {
        $addToSet: { appliedby: userId },
        $inc: { applicantsCount: 1 }
      },
      { new: true }
    );

    // If job is null, user already applied
    if (!job) {
      return res.status(200).json({ success: true, message: "Already applied" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { applied: jobId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, job, user });

  } catch (error) {
    console.error("Error applying to job:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
