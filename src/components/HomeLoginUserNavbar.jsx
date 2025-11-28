import React from 'react';
import { useNavigate } from "react-router-dom";

const HomeLoginUserNavbar = ({ setIsLoginFormOpen, isRegisterMode, setIsRegisterMode }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between px-4 sm:px-8">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Logo */}
        <img
          src="/db04adf6-0e20-4085-8e10-b5aa5602043b-removebg-preview.png"
          alt="logo"
          className="h-[10vh] w-[10vh] min-w-[60px] min-h-[60px] object-contain"
        />

        {/* recruito text — HIDDEN ON MOBILE  */}
        <h1 className="hidden sm:block text-white text-2xl sm:text-3xl font-bold tracking-wide">
          recruito
        </h1>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-2 sm:gap-4">

        <button
          onClick={() => setIsLoginFormOpen(true)}
          className="
            text-blue-500 bg-white
            px-3 sm:px-4 py-1 sm:py-2
            rounded-2xl font-semibold
            border border-blue-400
            text-xs sm:text-lg
          "
        >
          login
        </button>

        <button
          onClick={() => {setIsLoginFormOpen(true);
            setIsRegisterMode(true);
          }}
          className="
            bg-[#F05537] text-white
            px-3 sm:px-4 py-1 sm:py-2
            rounded-2xl font-semibold
            text-xs sm:text-lg
          "
        >
          register
        </button>

        <button
          onClick={() => navigate('/recruiter/homepage')}
          className="
            text-white border border-white
            px-3 sm:px-4 py-1 sm:py-2
            rounded-2xl font-medium
            text-xs sm:text-lg
            hover:bg-white hover:text-black transition
          "
        >
          For Recruiter
        </button>

      </div>
    </div>
  );
};

export default HomeLoginUserNavbar;
