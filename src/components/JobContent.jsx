import React, { useEffect, useState } from 'react'
import { Briefcase, MapPin, Star } from "lucide-react";

const SkillTag = ({ children }) => (
  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
    {children}
  </span>
);

const JobContent = ({appliedjobs, setappliedjobs, userauthuser, jobProp, jobId }) => {
  const [jobdata, setjobdata] = useState(jobProp || null);
  const [loading, setloading] = useState(!jobProp);
  const [applyloading, setapplyloading] = useState(false);
  const [applied, setapplied] = useState(false);
console.log(applied)
const applyhandle = async () => {
  if (!userauthuser?.resumeParsedText || userauthuser.resumeParsedText.trim() === "") {
    alert("Please upload your resume and complete your profile before applying.");
    return;
  }
  setapplyloading(true);
  try {
    const res = await fetch("/api/applyjob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: jobId, userId: userauthuser._id })
    });
    const data = await res.json();
    if (res.ok) {
      console.log("Applied successfully");
      setapplied(true);
      setappliedjobs(prev => {
    const exists = prev.some(j => String(j._id) === String(jobdata._id));
  if (exists) return prev;
  return [...prev, jobdata];
  });
  setjobdata(prev => ({
  ...prev,
  applicantsCount: (prev.applicantsCount || 0) + 1
}));
    } else {
      console.log("Failed to apply for the job");
    }
  } catch (error) {
    console.log(error);
  }

  setapplyloading(false);
};
useEffect(() => {
  if (!jobId || !userauthuser) return;

  const userAppliedIds = userauthuser.applied?.map(String) || [];

  const alreadyApplied =
    userAppliedIds.includes(String(jobId)) ||
    appliedjobs?.some(j => String(j._id) === String(jobId));

  if (alreadyApplied) {
    setapplied(true);
  }
}, [jobId, userauthuser, appliedjobs]);
  // ✅ Fetch job data and check if user already applied
useEffect(() => {
  if (jobProp) return;

  let mounted = true;

  const fetchData = async () => {
    setloading(true);
    try {
      const res = await fetch(`/api/getjobdata/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });

      const data = await res.json();
      if (mounted && data.success) {
        setjobdata(data.job);

        if (
          data.job.applicants?.includes(userauthuser._id) ||
          userauthuser.applied?.includes(jobId)
        ) {
          setapplied(true);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (mounted) setloading(false);
    }
  };

  fetchData();
  return () => { mounted = false };
}, [jobProp, jobId, userauthuser._id, userauthuser.applied]);

  if (loading) {
    return (
      <div className="pl-20 pt-10 md:mt-0">
        <div>loading...</div>
      </div>
    );
  }

const job = jobdata || {};

  return (
    <div className="pl-auto md:pl-20 md:pt-10 pt-5 md:mt-0">
      <div className="relative w-[100%] bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-lg transition-transform duration-150 transform hover:scale-103 hover:shadow-2xl flex-shrink-0">
        {applyloading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-20 rounded-xl">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex justify-between items-start mb-2 md:mb-4">
          <div className="flex-grow pr-4">
            <h2 className="text-xl font-bold text-gray-800 leading-tight">
              {job.title}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span className="font-medium hover:text-blue-600 cursor-pointer">
                {job.companyName}
              </span>
              <div className="flex items-center text-xs">
                <Star size={14} className="text-green-500 mr-1 fill-green-500" />
                4.5
              </div>
              <span className="text-xs">| 120 Reviews</span>
            </div>
          </div>

          <div className="flex-shrink-0 w-12 h-12 bg-orange-200 text-orange-700 font-bold text-xl rounded-md flex items-center justify-center border-2 border-orange-400">
            {job.companyName?.[0]?.toUpperCase() || "?"}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700 mb-1 border-b border-gray-100">
          <div className="flex items-center">
            <Briefcase size={16} className="text-gray-400 mr-2" />
            {job.experienceRange || "0-2 years"}
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 text-xl mr-2">•</span>
            {job.salary || "Not Disclosed"}
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="text-gray-400 mr-2" />
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
              {job.location || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <div className="flex gap-1 md:gap-5">
            <span className="text-[8px] md:text-xs italic">
              {job.postedAt ? `Posted on: ${new Date(job.postedAt).toLocaleDateString()}` : 'Posted on: N/A'}
            </span>
            <span className="text-[8px] md:text-xs italic">Openings: {job.openings || 1}</span>
            <span className="text-[8px] md:text-xs italic">Applicants: {job.applicantsCount || 0}</span>
          </div>
          <div>
            <button
              onClick={() => applyhandle()}
              disabled={applyloading || applied || !userauthuser?.resumeParsedText}

              className={`px-1 py-1 md:px-4 md:py-2 rounded-xl text-white transition-all hover:cursor-pointer ${
  !userauthuser?.resumeParsedText
    ? "bg-gray-400 cursor-not-allowed"
    : applied
    ? "bg-green-600 cursor-default"
    : "applyloading..."
    ? "bg-blue-400 cursor-not-allowed"
    : "bg-blue-600 hover:scale-103 cursor-pointer"
}`}

            >
              {!userauthuser?.resumeParsedText
  ? "Complete Profile"
  : applied
  ? "Applied"
  : applyloading
  ? "Applying..."
  : "Apply"}
            </button>
          </div>
        </div>
      </div>

     <div className="w-full max-w-[700px] mx-auto px-4 py-5 md:py-6 mt-5">

  <h1 className="font-semibold">Job Description:</h1>
  <p className="text-base text-gray-600 mb-4">{job.description || "N/A"}</p>

  <div className="flex gap-2">
    <h1 className="font-semibold">Industry Type:</h1>
    <span>{job.roleCategory}</span>
  </div>

  <div className="flex gap-2">
    <h1 className="font-semibold">Department:</h1>
    <span>{job.department}</span>
  </div>

  <div className="flex gap-2">
    <h1 className="font-semibold">Employment type:</h1>
    <span>{job.employmentType}</span>
  </div>

  <div className="flex gap-2">
    <h1 className="font-semibold">Education:</h1>
    <span>{job.education}</span>
  </div>

  <div className="flex items-center flex-wrap gap-3 mt-2">
    <h1 className="font-semibold">Key Skills:</h1>
    {job.requiredSkills?.length > 0 ? (
      job.requiredSkills.map((skill, index) => (
        <SkillTag key={index}>{skill}</SkillTag>
      ))
    ) : (
      <span>N/A</span>
    )}
  </div>

</div>

    </div>
  );
};

export default JobContent;
