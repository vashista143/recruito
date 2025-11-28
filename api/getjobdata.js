import db from "../lib/connectdb.js";
import Job from "../lib/models/job.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { jobId } = req.body;
  console.log("Received jobId:", jobId);

  await db.connect();

  try {
    const job = await Job.findById(jobId);
    console.log("Queried job:", job);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
