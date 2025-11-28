import jwt from "jsonwebtoken";
import db from "../lib/connectdb.js";
import Recruiter from "../lib/models/recruitor.js";
import Job from "../lib/models/job.js"; 
const JWT_SECRET = "supersecretkey";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or malformed." });
    }  
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const recruiterId = decoded?.id || decoded?.userId || decoded?.sub;
        if (!recruiterId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        await db.connect();

        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            await db.disconnect?.();
            return res.status(401).json({ message: "Unauthorized: Recruiter not found" });
        }

        const {
            companyName,
            jobTitle,
            title,
            companyLogo,
            companyLogoLink,
            location,
            experience,
            experienceRange,
            salary,
            openings,
            mustHaveSkills,
            keySkills,
            requiredSkills,
            niceToHaveSkills,
            department,
            roleCategory,
            education,
            employmentType,
            description,
        } = req.body;

        // minimal required fields
        const finalTitle = (title || jobTitle || "").trim();
        if (!finalTitle || !companyName || !location) {
            await db.disconnect?.();
            return res.status(400).json({ message: "Missing required fields: title/jobTitle, companyName, location" });
        }

        // helper to convert various inputs to string array
        const toArray = (val) => {
            if (!val) return [];
            if (Array.isArray(val)) return val.map(v => String(v).trim()).filter(Boolean);
            if (typeof val === "string") {
                return val.split(",").map(s => s.trim()).filter(Boolean);
            }
            return [String(val).trim()];
        };

        const requiredSkillsArr = toArray(requiredSkills || keySkills || mustHaveSkills);
        const niceToHaveArr = toArray(niceToHaveSkills);
        const educationArr = toArray(education);

        const finalExperienceRange = (experienceRange || experience || "").trim();
        const finalCompanyLogo = recruiter.companyLogoLink || companyLogo || companyLogoLink || "";
        const finalSalary = salary || "Not Disclosed";
        const finalOpenings = openings ? parseInt(openings, 10) || 1 : 1;

        const newJob = {
            title: finalTitle,
            companyName,
            companyLogo: finalCompanyLogo,
            location,
            experienceRange: finalExperienceRange,
            salary: finalSalary,
            openings: finalOpenings,
            employmentType: employmentType || "Full Time",
            roleCategory: roleCategory || "Software Development",
            department: department || "",
            education: educationArr,
            requiredSkills: requiredSkillsArr,
            niceToHaveSkills: niceToHaveArr,
            description: description || "",
            postedBy: recruiterId,
        };

        const createdJob = await Job.create(newJob);

        return res.status(201).json({ message: "Job created", job: createdJob });
    } catch (err) {
        console.error("createnewjob error:", err);
        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        try {
            await db.disconnect?.();
        } catch (e) {
            console.warn("Failed to disconnect DB:", e);
        }
    }
}