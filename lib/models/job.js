import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    experienceRange: {
      type: String,
      required: true, 
    },
    salary: {
      type: String,
      default: "Not Disclosed",
    },
    openings: {
      type: Number,
      default: 1,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    employmentType: {
      type: String,
      default: "Full Time",
    },
    roleCategory: {
      type: String,
      default: "Software Development",
    },
    department: {
      type: String,
      default: "Engineering - Software & QA",
    },
    education: {
      type: [String],
      default: [],
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["open", "closed", "paused"],
      default: "open",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },
    appliedby:{
      type:[mongoose.Schema.Types.ObjectId],
       ref: "User",
      default:[],
    },
    shortlisted:{
      type:[mongoose.Schema.Types.ObjectId],
       ref: "User",
      default:[],
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
