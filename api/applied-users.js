import DB from "../lib/connectdb.js";
import Job from "../lib/models/job.js";
import User from "../lib/models/user.js";

export default async function handler(req, res) {
  await DB.connect();

  if (req.method === "GET") {
    return getAppliedUsers(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function getAppliedUsers(req, res) {
  try {
    const { jobId } = req.query; // ✅ serverless uses query params for GET

    if (!jobId) {
      return res.status(400).json({ success: false, message: "Job ID required" });
    }
    const job = await Job.findById(jobId).populate("appliedby");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      users: job.appliedby,
    });
  } catch (error) {
    console.error("Error fetching applied users:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
