import React from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'
import { Check } from 'lucide-react';
import JobContent from '../components/JobContent'
import PathfinderSection from '../components/ReadinessTest'
const ShowJob = ({ appliedjobs, setappliedjobs, userauthuser }) => {
  const { jobId } = useParams();
  const { state } = useLocation();
  const jobFromState = state?.job;

  return (
    <div className="">
      <NavBar />
      <div className="flex flex-col justify-between md:flex-row md:gap-8">
        <div className="w-full md:w-3/5 mb-6 md:mb-0">
          <JobContent appliedjobs={appliedjobs} setappliedjobs={setappliedjobs} userauthuser={userauthuser} jobProp={jobFromState} jobId={jobId} />
        </div>

        <div className="w-full md:w-[30%] mt-5 ">
          <PathfinderSection />
          <div className="bg-white p-3 h-[55vh] rounded-xl shadow-lg border border-gray-100 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

              {/* Left Content Area (Text and Buttons) */}
              <div className="space-y-4">

                {/* Main Title */}
                <h3 className="text-l font-bold text-gray-800">
                  80% companies hire using an aptitude test! Practice with <span className="text-blue-600">NCAT</span>.
                </h3>

                {/* Checklist */}
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

                {/* Buttons */}
                <div className="flex space-x-3 pt-2">
                  <a href="https://ncat.co.in/" >
                    <button
                      className="px-4 py-1 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Take NCAT
                    </button>
                  </a>
                  <a href="https://ncat.co.in/" >
                    <button
                      className="px-4 py-1 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Know more
                    </button></a>
                </div>

                {/* Footer Text */}
                <p className="text-xs text-gray-500 pt-2">
                  <span className="font-semibold">12.9L+</span> students attempted so far
                </p>
              </div>

              {/* Right Content Area (Image with Overlays) */}
              <div className="relative h-40 w-full overflow-hidden rounded-lg shadow-md">
                {/* Background Image Placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1742549586702-c23994895082?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0dWRlbnQlMjBwcmVwYXJpbmclMjBmb3IlMjBuY2F0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
                  alt="Student practicing aptitude test"
                  className="w-full h-full object-cover"
                />

                {/* Overlays (Qualitative Aptitude, Verbal Ability, Logical Reasoning) */}
                <div className="absolute inset-0bg-opacity-10"></div>

                {/* Qualitative Aptitude Badge - Top Right */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg">
                  Qualitative Aptitude
                </span>

                {/* Verbal Ability Badge - Middle Right */}
                <span className="absolute right-4 top-1/2 transform translate-y-2 translate-x-1/4 px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg rotate-6">
                  Verbal Ability
                </span>

                {/* Logical Reasoning Badge - Bottom Left */}
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg -rotate-3">
                  Logical Reasoning
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShowJob
