import mongoose from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false, 
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyWebsite: {
    type: String,
    trim: true
  },
  companyLogoLink: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  totalJobsPosted: {
    type: Number,
    default: 0
  },
  activeJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'recruiters' });

// Use mongoose.models to prevent re-compilation in serverless environments
const Recruiter = mongoose.models.Recruiter || mongoose.model('Recruiter', RecruiterSchema);

export default Recruiter;
