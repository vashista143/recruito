import React from 'react'
import { Briefcase, MapPin, Star } from "lucide-react";
import {Link} from "react-router-dom";
const SkillTag = ({ children }) => (
  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
    {children}
  </span>
);

const JobCard = ({ job }) => {
  const companyInitial = job.companyName?.[0]?.toUpperCase() || "?";
  const skills = job.requiredSkills?.length ? job.requiredSkills : ["N/A"];
  const timeAgo = new Date(job.postedAt).toLocaleDateString();

  return (
    <Link 
  to={`/jobpost/${job._id}`}
>

    <div
  className="min-w-[350px] max-h-[290px] max-w-[400px] bg-white border border-gray-200 rounded-xl p-5 md:p-6 
             shadow-lg transition-transform duration-150 transform hover:scale-103 hover:shadow-2xl flex-shrink-0"
>
  {/* Header */}
  <div className="flex justify-between items-start mb-4">
    <div className="flex-grow pr-4">
      <h2 className="text-xl font-bold text-gray-800 leading-tight">{job.title}</h2>
      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
        <span className="font-medium hover:text-blue-600 cursor-pointer">{job.companyName}</span>
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

  {/* Meta */}
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

  {/* Description */}
  <p className="text-base text-gray-600 mb-4 line-clamp-2">
    <span className="font-semibold text-gray-800">Job Description:</span>{" "}
    {job.description?.substring(0, 100) || "No description available..."}
  </p>

  {/* Skills */}
  <div
    className="flex flex-wrap gap-2 border-b pb-4 border-gray-100 overflow-hidden relative"
    style={{
      maxHeight: "3.5rem",
      WebkitMaskImage: "linear-gradient(180deg, #000 60%, transparent)",
    }}
  >
    {job.requiredSkills?.map((skill, index) => (
      <SkillTag key={index}>{skill}</SkillTag>
    ))}
  </div>

  {/* Footer */}
  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
    <span className="text-xs italic">Posted on: {new Date(job.postedAt).toLocaleDateString()}</span>
  </div>
</div>
</Link>

  );
};

const JobCarousal = ({ authuser, jobs, activejobs, expiredjobs }) => {
  console.log(jobs)
  return (
    <div className="pt-4">
      {/* Active Jobs */}
      <h2 className='ml-5 text-2xl font-bold mb-2'>Active Jobs</h2>
      <div className="w-full overflow-x-auto scrollbar-none">
  <div className="flex space-x-6 p-4">
    {activejobs.length > 0 ? (
      activejobs.map((job) => <JobCard key={job._id} job={job} />)
    ) : (
      <p className="text-gray-400">No active jobs available</p>
    )}
  </div>
</div>


      {/* Closed Jobs */}
      <h2 className='ml-5 text-2xl font-bold mb-2'>Closed Jobs</h2>
      <div className="w-full overflow-x-auto scrollbar-none">
  <div className="flex space-x-6 p-4">
    {expiredjobs.length > 0 ? (
      expiredjobs.map((job) => <JobCard key={job._id} job={job} />)
    ) : (
      <p className="text-gray-400">No active jobs available</p>
    )}
  </div>
</div>

    </div>
  )
}

export default JobCarousal
