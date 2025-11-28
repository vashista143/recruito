import React, { useState } from 'react';
import HomeLoginUserNavbar from '../components/HomeLoginUserNavbar';
import UserLoginForm from '../components/UserLoginForm';
import WorkFlowSection from "../components/WorkFlowSection"
const HomeLoginUser = ({ setdarkmode, darkmode, setuserauthuser }) => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const closeLoginForm = () => setIsLoginFormOpen(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const handleLoginSubmit = (data) => {
    console.log("Login submit:", data);
  };
  const handleRegisterSubmit = (data) => {
    console.log("Register submit:", data);
  };

  return (
    <div className="bg-[#6E44FA] w-full h-screen">
      <div className='relative min-h-screen pt-2 md:pt-5  z-40'>
        <HomeLoginUserNavbar setIsLoginFormOpen={setIsLoginFormOpen} isRegisterMode={isRegisterMode} setIsRegisterMode={setIsRegisterMode} />
        <div className="w-full flex flex-col items-center justify-center py-3 md:py-20 ">

          <img
            src="/db04adf6-0e20-4085-8e10-b5aa5602043b-removebg-preview.png"
            alt="logo"
            className="h-25 w-30 mb-2 md:mb-4"
          />

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">
            Your next job starts here
          </h2>

          {/* Subtitle */}
          <p className="text-white text-center mt-2 text-base">
            Create an account or sign in to see your personalised job recommendations.
          </p>

          {/* Get Started Button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white mt-4 px-4 py-2 md:mt-6 md:px-8 md:py-3 rounded-lg font-semibold text-lg transition"
            onClick={() => { setIsLoginFormOpen(true) }}>
            Get Started →
          </button>

          {/* Post Resume */}
          <p className="mt-3 md:mt-6 text-white text-base">
            <span className="text-white cursor-pointer underline" onClick={() => { setIsLoginFormOpen(true) }}>
              Post your resume
            </span>{" "}
            <br />
            - It only takes a few seconds
          </p>


          {/* Dropdown text */}
          <button className="mt-6 text-white text-base font-medium flex items-center gap-1">
            What's trending on Recruito
            <span className="text-xl">&gt;</span>
          </button>
          <p className='display md:hidden mt-15 text-white font-bold'>V</p>

          <div className="w-full pt-15 md:pt-50 py-5 md:py-20 font-inter">

            {/* Heading */}
            <div className="text-center mb-14">
              <h1 className="text-[17px] md:text-[38px] font-semibold text-gray-900">
                Everything you need to join your team
              </h1>

              <p className="text-gray-500 text-[11px] md:text-[15px] mt-2 leading-relaxed">
                Redefining job application process and letting you meet the best <br />
                job roles in the shortest time
              </p>
            </div>

            {/* 3 Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-2 md:px-6">

              {/* Card 1 */}
              <div className="bg-[#F4ECFF] p-3 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#B98AFF] text-white rounded-xl flex items-center justify-center md-1 md:mb-4 text-xl font-bold">
                  📁
                </div>

                <h3 className="text-lg font-semibold mb-1 md:mb-2">Enterprise Job Board</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2 md:mb-5">
                  You’ll have a branded job board as a <br />centralized place to display all the open <br />positions at an organization.
                </p>

                <button className="px-5 py-2 border border-gray-300 text-sm rounded-full font-medium hover:bg-gray-100">
                  Learn More
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FFF5E5] p-3 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#FFA94D] text-white rounded-xl flex items-center justify-center mb-1 md:mb-4 text-xl font-bold">
                  👤
                </div>

                <h3 className="text-lg font-semibold mb-1 md:mb-2">Candidate Management</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2 md:mb-5">
                  As you apply, new candidates <br />automatically show up in the hiring <br />dashboard for efficient review.
                </p>

                <button className="px-5 py-2 border border-gray-300 text-sm rounded-full font-medium hover:bg-gray-100">
                  Learn More
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-[#E8FFEE] p-3 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#4CCF75] text-white rounded-xl flex items-center justify-center mb-1 md:mb-4 text-xl font-bold">
                  🤝
                </div>

                <h3 className="text-lg font-semibold mb-1 md:mb-2">Team Collaboration</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2 md:mb-5">
                  Hiring is a team sport and Recruito is <br />set up to support it. Invite unlimited <br />users to manage candidates together.
                </p>

                <button className="px-5 py-2 border border-gray-300 text-sm rounded-full font-medium hover:bg-gray-100">
                  Learn More
                </button>
              </div>

            </div>
          </div>
          <WorkFlowSection />

          {/* Footer */}
          <div className="w-full border-t mt-5 md:mt-14 py-2 md:py-8 text-center text-gray-500 text-sm">

            <div className="flex flex-wrap justify-center gap-2 md:gap-8">
              <span className="hover:underline cursor-pointer">Career advice</span>
              <span className="hover:underline cursor-pointer">Browse jobs</span>
              <span className="hover:underline cursor-pointer">Browse companies</span>
              <span className="hover:underline cursor-pointer">Salaries</span>
              <span className="hover:underline cursor-pointer">Events</span>
              <span className="hover:underline cursor-pointer">Countries</span>
              <span className="hover:underline cursor-pointer">Help</span>
            </div>

            <p className="mt-2 md:mt-6">© 2025 Recruito. All rights reserved.</p>
          </div>
        </div>

        {isLoginFormOpen && (
          <div className='rounded-l-3xl bg-white shadow-2xl h-full w-[90%] md:w-[40%]  fixed right-0 top-0 z-[50]  min-h-screen border-l border-gray-200'>
            <UserLoginForm
              isRegisterMode={isRegisterMode}
              setIsRegisterMode={setIsRegisterMode}
              setuserauthuser={setuserauthuser}
              closeForm={closeLoginForm}
              onLoginSubmit={handleLoginSubmit}
              onRegisterSubmit={handleRegisterSubmit}
            />
          </div>
        )}


      </div>
    </div>
  );
}

export default HomeLoginUser;