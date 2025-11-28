import db from "../lib/connectdb.js";
import Job from "../lib/models/job.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await db.connect();

  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching active jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
