import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Check } from 'lucide-react';
import PathfinderSection from "./ReadinessTest";
import JobsCarousal from './JobsCarousal';

const UserMainContent = ({ appliedjobs ,jobs, userauthuser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showapplies, setshowapplies] = useState(true);
  return (
    <div className='w-[100%] h-full md:p-7'>
      <div className='shadow-2xl rounded-3xl px-5 pt-5'>
        <div className='flex justify-between'>
          <h1 className='text-s md:text-xl font-semibold'>Recommended jobs for you</h1>
          <Link
  className="text-blue-600 text-s md:text-xl font-semibold"
  to="/user/recommendedjobs"
  state={{ jobs }}
>
  View all jobs
</Link>

        </div>

        {/* Tabs */}
        <div className="mt-2 md:mt-5 flex gap-10 font-semibold text-xl relative">
          <div
            onClick={() => setshowapplies(true)}
            className="cursor-pointer relative pd-0 md:pb-2"
          >
            <span className={`${showapplies ? "text-black" : "text-gray-600"}`}>
              Applies
            </span>
            {showapplies && (
              <div className="absolute left-0 right-0 h-[4px] bg-black rounded-full mt-[3px]" />
            )}
          </div>

          <div
            onClick={() => setshowapplies(false)}
            className="cursor-pointer relative pb-2"
          >
            <span className={`${!showapplies ? "text-black" : "text-gray-600"}`}>
              Applied
            </span>
            {!showapplies && (
              <div className="absolute left-0 right-0 h-[4px] bg-black rounded-full mt-[3px]" />
            )}
          </div>
        </div>

        {/* Job Carousals */}
        <div>
          {showapplies ? (
            <JobsCarousal loading={loading} jobs={jobs} />
          ) : (
            <JobsCarousal loading={loading} jobs={appliedjobs} />
          )}
        </div>
      </div>

      {/* Pathfinder Section */}
      <PathfinderSection />

      {/* NCAT Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              80% companies hire using an aptitude test! Practice with{" "}
              <span className="text-blue-600">NCAT</span>.
            </h3>

            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Test your skills early</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Assess your strengths</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Understand areas of improvement</span>
              </li>
            </ul>

            <div className="flex space-x-3 pt-2">
              <a href="https://ncat.co.in/">
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                  Take NCAT
                </button>
              </a>
              <a href="https://ncat.co.in/">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Know more
                </button>
              </a>
            </div>

            <p className="text-xs text-gray-500 pt-2">
              <span className="font-semibold">12.9L+</span> students attempted so far
            </p>
          </div>

          {/* Right Image Section */}
          <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1742549586702-c23994895082?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0dWRlbnQlMjBwcmVwYXJpbmclMjBmb3IlMjBuY2F0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
              alt="Student practicing aptitude test"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-10" />
            <span className="absolute top-4 right-4 px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg">
              Qualitative Aptitude
            </span>
            <span className="absolute right-4 top-1/2 transform translate-y-2 translate-x-1/4 px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg rotate-6">
              Verbal Ability
            </span>
            <span className="absolute bottom-4 left-4 px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg -rotate-3">
              Logical Reasoning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMainContent;
