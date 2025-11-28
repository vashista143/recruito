import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    mobile: { type: String, match: [/^\+?\d{10,15}$/, "Please enter a valid contact number"] },
    linkedInProfile: { type: String, trim: true },
    
    
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    profilePictureUrl: { type: String }, 
    education: {type: String},
    university: {type: String},
    location: {type: String},
    
    resumePdfUrl: { type: String }, 
    resumeParsedText: { type: String, default: "" },     
    skills: { type: [String], default: [] }, 
    certifications: { type: [String], default: [] }, 
    saved: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    applied: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    
    preferredJobType: { type: [String], default: [] }, 
    availabilityToWork: { type: String }, 
    preferredLocation: { type: [String], default: [] }, 
    
    
    profileSummary: { type: String },
    
    
    role: {
      type: String,
      enum: ["applicant", "recruiter", "admin"],
      default: "applicant",
    },

  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
