import DB from "../lib/connectdb.js";
import Job from "../lib/models/job.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await DB.connect();

    const { jobId, ...updates } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    // Find and update job
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updates },
      { new: true } // return updated job
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job updated",
      updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}
