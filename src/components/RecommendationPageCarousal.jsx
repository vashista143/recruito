import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Bookmark, Star } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
const getLogoSrc = (initials) => {
    const svg = `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#4B5563"/>
        <text x="20" y="27" font-family="Inter, sans-serif" font-size="16" fill="#ffffff" text-anchor="middle" font-weight="bold">${initials}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};
const formatPostedDate = (dateString) => {
  if (!dateString) return "";
  const now = new Date();
  const posted = new Date(dateString);
  const diffTime = now - posted; // difference in ms
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const truncateDescription = (desc, maxLength = 200) => {
  if (!desc) return "";
  return desc.length > maxLength ? desc.slice(0, maxLength) + "..." : desc;
};

const JobCard = ({ job, onSave, onApply, isApplied, issaved }) => {
  const [saved, setSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    if (saveLoading) return;

    setSaveLoading(true);

    try {
      const result = onSave ? onSave() : null;
      if (result && typeof result.then === "function") {
        await result;
      }
      setSaved(true);
    } catch (err) {
      console.error("Save failed", err);
    }

    setSaveLoading(false);
  };

  const handleApplyClick = async (e) => {
    e.stopPropagation();
    if (applyLoading || isApplied) return;

    setApplyLoading(true);

    try {
      if (onApply) await onApply(job);
    } catch (err) {
      console.error(err);
    }

    setApplyLoading(false);
  };

  return (
    <div
      onClick={() =>
        navigate(`/user/showjob/${job._id}`, { state: { job } })
      }
className="w-full bg-white px-3 md:px-6 py-1 md:py-3 mb-4 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-m md:text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
            {job.title}
          </h2>
          <div className="flex items-center space-x-1 md:space-x-2 mt-1 text-sm">
            <span className="text-gray-600 font-semibold">{job.companyName}</span>
            <span className="hidden sm:flex items-center text-xs font-medium bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full">
            <Star size={12} className="mr-1 fill-green-700 text-green-700" />
            {job.rating}
            </span>

            <span className="hidden sm:inline text-gray-500">
            ({job.reviews} Reviews)
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 w-12 h-12 bg-orange-200 text-orange-700 font-bold text-xl rounded-md flex items-center justify-center border-2 border-orange-400">
          {job.companyName?.[0]?.toUpperCase() || "?"}
        </div>
      </div>

      {/* Job Details Section */}
      <div className="space-y-2 text-sm text-gray-600 mb-1 md:mb-4">
        <div className="flex flex-wrap items-center gap-1 md:gap-4">
          <div className="flex items-center">
            <Briefcase size={16} className="text-gray-400 mr-2" />
            {job.experienceRange}
          </div>

          <div className="flex items-center">
            <DollarSign size={16} className="text-gray-400 mr-2" />
            {job.salary}
          </div>

          <div className="flex items-center">
            <MapPin size={16} className="text-gray-400 mr-2" />
            {job.location}
          </div>
        </div>

        <p className="text-gray-500 mt-2">{truncateDescription(job.description)}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-1 md:mb-4">
        {job.requiredSkills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-0 md:pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500 italic">
          {formatPostedDate(job.postedAt)}
        </span>

        <div className="flex space-x-3">
          
          {/* Save Button */}
          <button
            onClick={(e) => handleSaveClick(e)}
            disabled={saveLoading}
            className={`flex items-center gap-1 px-3 py-1 text-l rounded-lg transition-all
              ${issaved || saved
                ? "text-blue-600 font-medium"
                : "text-gray-500 hover:text-blue-600"}
            `}
          >
            {saveLoading ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Bookmark size={18} />
            )}
            {issaved || saved ? "Saved" : "Save"}
          </button>

          {/* Apply Button */}
          <button
            onClick={(e) => handleApplyClick(e)}
            disabled={isApplied || applyLoading}
            className={`px-2 md:px-5 py-1 rounded-xl flex items-center gap-2 text-white text-l transition-all
              ${
                isApplied
                  ? "bg-green-600 cursor-default"
                  : applyLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:scale-103 cursor-pointer"
              }
            `}
          >
            {applyLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : null}
            {isApplied ? "Applied" : applyLoading ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};


const JobsVerticalCarousel = ({setappliedjobs, setSavedJobs, savedjobs, appliedjobs, jobs, userauthuser }) => {
  const jobsData = Array.isArray(jobs) ? jobs : [];
  const id = userauthuser?._id;
console.log(appliedjobs)
console.log(jobs)
const handleSave = async (job) => {
  const jobId = job._id;

  try {
    const res = await fetch("/api/savejob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, id })
    });

    if (!res.ok) {
      console.log("Failed to save the job");
      return Promise.reject(new Error("Save error"));
    }

    // ✅ Update savedjobs state with full job object
    setSavedJobs(prev => {
      const exists = prev.some(j => String(j._id) === String(job._id));
      if (exists) return prev;
      return [...prev, job];
    });

    return true;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const handleApply = async (job) => {
  const jobId = job._id;

  if (!userauthuser?.resumeParsedText || userauthuser.resumeParsedText.trim() === "") {
    alert("Please upload your resume and complete your profile before applying.");
    return;
  }

  try {
    const res = await fetch("/api/applyjob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, userId: userauthuser._id })
    });

    if (!res.ok) {
      console.log("Failed to apply for the job");
      return;
    }

    // ✅ Add job to appliedjobs state
    setappliedjobs((prev) => {
      const exists = prev.some(j => String(j._id) === String(jobId));
      if (exists) return prev;
      return [...prev, job];
    });

    console.log("Applied successfully");

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans antialiased">    
      <div className="w-full md:max-w-[60%]">       
        <div className="space-y-4">
          {jobsData.map((job) => (
           <JobCard 
  key={job._id} 
  job={job} 
  onSave={() => handleSave(job)}
  onApply={() => handleApply(job)}
  isApplied={appliedjobs?.some(j => String(j._id) === String(job._id))}
  issaved={savedjobs?.some(j => String(j._id) === String(job._id))}
/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsVerticalCarousel;
