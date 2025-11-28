import React, { useEffect, useRef, useState } from "react";
import { Briefcase, MapPin, Star } from "lucide-react";
import Shortlisting from "./Shortlisting.jsx";
import toast from "react-hot-toast";
const SkillTag = ({ children }) => (
  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
    {children}
  </span>
);

const LeftContent = ({ shortlisteddata, analyseApplicants, generateShortlistedData, appliedusers, setAppliedUsers, setaishortlist, aishortlist, authuser, job, updateJobInState  }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
const descRef = useRef(null);
console.log(shortlisteddata)

const handleEditSubmit = async () => {
  setIsSaving(true);  // start loader

  try {
    const res = await fetch("/api/editjob", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: job._id, ...editFormData }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Job updated successfully!", {
        position: "top-right",
      });

      setShowEditForm(false);

      updateJobInState(data.updatedJob);
    } else {
      toast.error(data.message || "Failed to update job", {
        position: "top-right",
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong", {
      position: "top-right",
    });
  } finally {
    setIsSaving(false);
  }
};


const [editFormData, setEditFormData] = useState({
  title: job.title || "",
  companyName: job.companyName || "",
  location: job.location || "",
  salary: job.salary || "",
  experienceRange: job.experienceRange || "",
  description: job.description || "",
  openings: job.openings || 1,
  roleCategory: job.roleCategory || "",
  department: job.department || "",
  employmentType: job.employmentType || "",
});
useEffect(() => {
  if (descRef.current) {
    descRef.current.style.height = "auto";
    descRef.current.style.height = descRef.current.scrollHeight + "px";
  }
}, [editFormData.description]);

  const [isClosed, setIsClosed] = useState(
    (job?.status || "").toString().toLowerCase() === "closed"
  );
  const [isClosing, setIsClosing] = useState(false);

  const closethis = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (isClosed || isClosing) return;

    setIsClosing(true); 
    try {
      const res = await fetch(`/api/closejob/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId: job._id }),
      });

      if (res.ok) {
        console.log("Job closed successfully");
        setIsClosed(true);
      } else {
        console.log("Failed to close the job", res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsClosing(false);
    }
  };
useEffect(() => {
  setEditFormData({
    title: job.title,
    companyName: job.companyName,
    location: job.location,
    salary: job.salary,
    experienceRange: job.experienceRange,
    description: job.description,
    openings: job.openings,
    roleCategory: job.roleCategory,
    department: job.department,
    employmentType: job.employmentType,
  });
}, [job]);
useEffect(() => {
  if (showEditForm) {
    setTimeout(() => {
      if (descRef.current) {
        descRef.current.style.height = "auto";
        descRef.current.style.height = descRef.current.scrollHeight + "px";
      }
    }, 20);
  }
}, [showEditForm]);

  return (
    <div className="pl-20 pt-10 md:mt-0">
<div className="relative group w-[100%] bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-lg transition-transform duration-150 transform hover:scale-103 hover:shadow-2xl flex-shrink-0">
<button 
  className="
    absolute top-0 right-0 w-15 h-15 pl-8 pb-8 pr-3 pt-3
    bg-gradient-to-bl from-[#D3D3D3]/100 to-[#ffffff00] 
    rounded-bl-[100%] rounded-tr-xl 
    text-gray-700 font-bold z-10
    opacity-0 group-hover:opacity-100 transition-opacity duration-200
  "
       onClick={() => setShowEditForm(true)} >
      <img src="/pencil-edit-button-svgrepo-com.svg" className="h-5 w-5"/>
</button>
        <div className="flex justify-between items-start mb-4">
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
          <div className="flex gap-5">
            <span className="text-xs italic">
              Posted on: {new Date(job.postedAt).toLocaleDateString()}
            </span>
            <span className="text-xs italic">Openings: {job.openings || 1}</span>
            <span className="text-xs italic">Applicants: {job.applicantsCount}</span>
          </div>
          <div>
            <button
              onClick={closethis}
              disabled={isClosed || isClosing}
              className={`px-3 py-1 rounded-md text-white transition-all duration-150 ${
                isClosed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-700 hover:scale-105 cursor-pointer"
              }`}
            >
              {isClosing ? "Closing..." : isClosed ? "Closed" : "Close Job"}
            </button>
          </div>
        </div>
      </div>
      <div  className='mt-5 w-[100%] bg-white border border-gray-200 rounded-xl p-5 md:p-2 shadow-lg transition-transform duration-50 transform hover:scale-103 hover:shadow-2xl flex-shrink-0"'>
        <Shortlisting analyseApplicants={analyseApplicants} generateShortlistedData={generateShortlistedData} appliedusers={appliedusers} setAppliedUsers={setAppliedUsers} setaishortlist={setaishortlist} aishortlist={aishortlist}  authuser={authuser} job={job}/>
      </div>
      <div className="w-[80%] py-5 md:py-6 mt-5">
        <h1 className="font-bold">Job Description:</h1>
        <p className="text-base text-gray-600 mb-4">{job.description || "N/A"}</p>

        <div className="flex gap-2">
          <h1 className="font-bold">Industry Type:</h1>
          <span>{job.roleCategory}</span>
        </div>
        <div className="flex gap-2">
          <h1 className="font-bold">Department:</h1>
          <span>{job.department}</span>
        </div>
        <div className="flex gap-2">
          <h1 className="font-bold">Employment type:</h1>
          <span>{job.employmentType}</span>
        </div>
        <div className="flex gap-2">
          <h1 className="font-bold">Education:</h1>
          <span>{job.education}</span>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <h1 className="font-bold">Key Skills:</h1>
          {job.requiredSkills?.length > 0 ? (
            job.requiredSkills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
      {isSaving && (
  <div className="absolute inset-0 flex justify-center items-center bg-black/20 z-50">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
  </div>
)}

{showEditForm && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

    {/* ✅ SHOW LOADER WHEN SAVING */}
    {isSaving && (
      <div className="absolute inset-0 flex justify-center items-center bg-black/30 z-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
      </div>
    )}

    {/* ✅ MODAL BOX */}
    <div
      className="relative bg-white w-[90%] max-w-3xl p-6 rounded-xl shadow-xl border border-gray-200 
                 max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-xl font-bold mb-4">Edit Job</h2>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          className="border p-2 rounded"
          value={editFormData.title}
          onChange={(e) =>
            setEditFormData({ ...editFormData, title: e.target.value })
          }
        />

        <input
          type="text"
          className="border p-2 rounded"
          value={editFormData.companyName}
          onChange={(e) =>
            setEditFormData({ ...editFormData, companyName: e.target.value })
          }
        />

        <input
          type="text"
          className="border p-2 rounded"
          value={editFormData.location}
          onChange={(e) =>
            setEditFormData({ ...editFormData, location: e.target.value })
          }
        />

        <input
          type="text"
          className="border p-2 rounded"
          value={editFormData.salary}
          onChange={(e) =>
            setEditFormData({ ...editFormData, salary: e.target.value })
          }
        />

        <input
          type="text"
          className="border p-2 rounded"
          value={editFormData.experienceRange}
          onChange={(e) =>
            setEditFormData({
              ...editFormData,
              experienceRange: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="border p-2 rounded"
          value={editFormData.openings}
          onChange={(e) =>
            setEditFormData({ ...editFormData, openings: e.target.value })
          }
        />
      </div>

      {/* ✅ TEXTAREA AUTO RESIZE */}
      <textarea
        ref={descRef}
        className="border p-2 rounded w-full mt-4 overflow-hidden resize-none"
        value={editFormData.description}
        onChange={(e) =>
          setEditFormData({
            ...editFormData,
            description: e.target.value,
          })
        }
      ></textarea>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => setShowEditForm(false)}
          className="px-5 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleEditSubmit}
          disabled={isSaving}
          className={`px-5 py-2 rounded text-white ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default LeftContent;
