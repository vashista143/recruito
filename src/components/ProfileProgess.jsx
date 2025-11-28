import React from "react";

const ProfileProgressCircle = ({ percentage, size = 200, stroke = 5 }) => {

  const radius = (size / 2) - stroke; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* ✅ Outer Progress Ring */}
      <svg
        className="absolute top-0 left-0 transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
        />
      </svg>

      <div
        className="rounded-full overflow-hidden border-4 border-white shadow-md"
        style={{
          width: size * 0.9,  
          height: size * 0.9,
        }}
      >
        <img
          src="/profile.png"
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileProgressCircle;
