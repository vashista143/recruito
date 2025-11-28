import React, { useState, useEffect } from "react";
import { MapPin, Star, Clock } from 'lucide-react'; // Added Clock icon
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const RemainingJobCard = ({ job }) => {
  const initial = job.companyName?.charAt(0).toUpperCase() || "?"
  const navigate=useNavigate();
  return (
      <div onClick={() =>
        navigate(`/jobpost/${job._id}`, { state: { job }})
      } className="flex justify-between items-start border-b border-gray-200 py-4 first:pt-0 last:border-b-0 hover:scale-101 cursor-pointer transition-transform">
        
        <div className="flex-1 pr-3">
          <p className="text-base font-semibold text-gray-800 hover:scale-101">
            {job.title}
          </p>
          <p className="text-sm text-gray-600 mt-0.5">
            {job.companyName}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
            <span className="flex items-center font-medium">
              <Star size={12} className="text-yellow-500 mr-1 fill-yellow-500" />
              {job.rating || "4.2"}
            </span>
            <span className="text-xs">| {job.reviews || "120"} Reviews</span>
          </div>

          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin size={12} className="text-gray-400 mr-1" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-end flex-shrink-0 pt-1">
          <div className="w-10 h-10 font-bold text-lg rounded-md flex items-center justify-center border-2 bg-gray-100 text-gray-800">
            {initial}
          </div>
        </div>

      </div>
  );
};



const RightContent = ({ jobs, selectedJob }) => {

  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-lg h-fit sticky top-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
          Similar Jobs
        </h3>
        <p className="text-sm text-gray-500">
          No other jobs posted by you.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 mt-10 bg-white border border-gray-200 rounded-2xl shadow-xl h-fit">
      <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
        More jobs you posted
      </h3>

      <div className="divide-y divide-gray-100">
        {jobs.map((job) => (
          <RemainingJobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};



export default RightContent;
