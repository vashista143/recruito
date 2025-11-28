import db from "../lib/connectdb.js";
import Job from "../lib/models/job.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await db.connect();
  const { recruiterId } = req.body;

  if (!recruiterId) {
    return res.status(400).json({ message: "Recruiter ID is required" });
  }

  try {
    const jobs = await Job.find({ postedBy: recruiterId});
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching active jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
