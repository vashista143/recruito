import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileProgressCircle from "./ProfileProgess";

const ProfileCompletionCard = ({ userauthuser }) => {
  const navigate = useNavigate();

  const user = userauthuser || {};

  const calculateProfileScore = () => {
    let score = 0;

    if (userauthuser.name) score += 10;
    if (userauthuser.email) score += 10;
    if (userauthuser.resumeParsedText) score += 50;

    const fields = [
      "gender",
      "dateOfBirth",
      "mobile",
      "location",
      "university",
      "education"
    ];

    fields.forEach((f) => {
      if (userauthuser[f]) score += 5;
    });

    return score;
  };

  const lastUpdated =
    user.updatedAt || user.createdAt
      ? new Date(user.updatedAt || user.createdAt).toLocaleDateString()
      : null;

  return (
    <div className="
      bg-white hover:shadow-2xl border border-gray-100 rounded-xl p-6 
      w-full 
      md:w-[320px]     
    ">
        <div className="md:hidden flex items-center gap-4">

        <ProfileProgressCircle percentage={calculateProfileScore()} size={90} />

        {/* Text Right */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 leading-tight">
            {user.name || "Unnamed User"}
          </h3>

          <p className="text-sm text-gray-600">{user.email}</p>

          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => navigate("/user/editprofile")}
        className="
          md:hidden 
          mt-4 w-full bg-blue-600 text-white py-2 rounded-lg 
          font-semibold shadow-md hover:bg-blue-700
        "
      >
        Complete Profile
      </button>


      {/* DESKTOP: vertical layout */}
      <div className="hidden md:flex flex-col items-center text-center">

        <ProfileProgressCircle 
          percentage={calculateProfileScore()} 
          size={150}
        />

        <h3 className="text-xl font-bold text-gray-800 mt-4 leading-snug">
          {user.name || "Unnamed User"}
        </h3>

        <p className="text-sm text-gray-600 mb-1">{user.email}</p>

        {lastUpdated && (
          <p className="text-xs text-gray-500 mb-4">Last updated: {lastUpdated}</p>
        )}

        <button
          onClick={() => navigate("/user/editprofile")}
          className="
            w-full bg-blue-600 text-white font-semibold py-2 rounded-lg
            hover:bg-blue-700 transition shadow-md
          "
        >
          Complete Profile
        </button>
      </div>

    </div>
  );
};

export default ProfileCompletionCard;
