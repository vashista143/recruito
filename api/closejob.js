import db from "../lib/connectdb.js";
import Job from "../lib/models/job.js";

export default async function handler(req, res) {
  const isWebRequest = typeof Request !== "undefined" && req instanceof Request;
  if (isWebRequest) {
    try {
      if (req.method !== "PUT") {
        return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
      }

      const url = new URL(req.url);
      const segments = url.pathname.split("/").filter(Boolean);
      const jobId = segments[segments.length - 1] || null;

      const body = await req.json().catch(() => ({}));
      const finalJobId = jobId || body.jobId;

      if (!finalJobId) {
        return new Response(JSON.stringify({ message: "Job ID is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      await db.connect();

      const updatedJob = await Job.findByIdAndUpdate(finalJobId, { status: "closed" }, { new: true });

      if (!updatedJob) {
        return new Response(JSON.stringify({ message: "Job not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({ message: "Job closed successfully", job: updatedJob }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err) {
      console.error("Error closing job (app-router):", err);
      return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
    } finally {
      try { await db.disconnect?.(); } catch (e) { console.warn("DB disconnect failed:", e); }
    }
  } else {
    // pages/api style (req, res)
    try {
      if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
      }

      // support jobId in body or as trailing segment in URL
      let jobId = req.body?.jobId;
      if (!jobId) {
        // try extract from url e.g., /api/closejob/<id>
        const url = req.url || "";
        const segments = url.split("/").filter(Boolean);
        jobId = segments[segments.length - 1] || jobId;
      }

      if (!jobId) {
        return res.status(400).json({ message: "Job ID is required" });
      }

      await db.connect();

      const updatedJob = await Job.findByIdAndUpdate(jobId, { status: "closed" }, { new: true });

      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      return res.status(200).json({ message: "Job closed successfully", job: updatedJob });
    } catch (err) {
      console.error("Error closing job (pages-api):", err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      try { await db.disconnect?.(); } catch (e) { console.warn("DB disconnect failed:", e); }
    }
  }
}
