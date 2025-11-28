import React, { useEffect, useState } from "react";

const Shortlisting = ({
  analyseApplicants,
  generateShortlistedData,
  appliedusers,
  setAppliedUsers,
  setaishortlist,
  aishortlist,
  job,
  authuser
}) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/applied-users?jobId=${job._id}`);
        const data = await res.json();

        if (data.success) {
          setAppliedUsers(data.users);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [job._id, setAppliedUsers]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Shortlisting</p>

        <div className="flex gap-5">
          {/* <button className='bg-green-700 rounded-xl px-4 py-2 font-semibold hover:cursor-pointer hover:scale-103'>Manual shortlist</button> */}
          <button
            className="bg-amber-400 rounded-xl px-4 py-2 font-semibold hover:cursor-pointer hover:scale-103"
            onClick={() => {
  setaishortlist(true);

  const baseShortlist = generateShortlistedData();

  // Pass the freshly generated data directly
  analyseApplicants(baseShortlist);
}}


          >
            AI Shortlist
          </button>
        </div>
      </div>

      {/* Applicants */}
      <div className="mt-5 bg-white border border-gray-200 rounded-xl p-4">

        {/* Loader */}
        {loading ? (
          <div className="w-full flex justify-center py-5">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : appliedusers.length === 0 ? (
          <p className="text-gray-500 italic">No applicants yet</p>
        ) : (
          <div
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "thin" }}
          >
            {appliedusers.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center min-w-[140px] snap-center"
              >
                {/* Resume thumbnail */}
                <div
                  className="relative w-28 h-36 bg-gray-200 border border-gray-300 rounded-md  
                             flex items-center justify-center shadow-sm hover:shadow-lg 
                             transition cursor-pointer group"
                  onClick={() => window.open(user.resumePdfUrl, "_blank")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    alt="resume thumbnail"
                    className="w-12 opacity-80 group-hover:opacity-0 transition"
                  />

                  <div
                    className="absolute inset-0 bg-white/50 rounded-md flex items-center justify-center 
                               opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-black font-semibold text-sm">View Resume</span>
                  </div>
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-700 text-center truncate w-28">
                  {user.name || "Unknown User"}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shortlisting;
