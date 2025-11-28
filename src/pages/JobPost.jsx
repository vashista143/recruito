import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LeftContent from '../components/LeftContent';
import RightContent from '../components/RightContent';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const RecruiterJobPost = ({ jobs, authuser }) => {
  const { jobId } = useParams();
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [appliedusers, setAppliedUsers] = useState([]);
  const [aishortlist, setaishortlist]= useState(false);
  const [shortlisteddata, setshortlisteddata]=useState();
  const jobFromList = jobs.find(
    (j) => String(j._id) === String(jobId)
  ) || null;
const downloadPDF = () => {
  if (!selectedInfo || selectedInfo.length === 0) {
    alert("No shortlisted applicants to download.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Shortlisted Applicants", 14, 15);

  autoTable(doc, {
    head: [["NAME", "EMAIL", "SCORE"]],
    body: selectedInfo.map(u => [
      u.name || "N A",
      u.email || "N A",
      u.score ? `${u.score}/100` : "N A"
    ]),
    startY: 25
  });

  doc.save("shortlisted-applicants.pdf");
};
  useEffect(() => {
  if (!shortlisteddata || appliedusers.length === 0) return;
  const selected = appliedusers
    .map(user => {
      const match = shortlisteddata.find(s => s.userId === user._id);
      if (match?.selected === true) {
        return {
          name: user.name,
          email: user.email,
          score: match.score
        };
      }
      return null;
    })
    .filter(Boolean);
  setSelectedInfo(selected);
}, [shortlisteddata, appliedusers]);
console.log(selectedInfo);
  const [job, setJob] = useState(jobFromList);
  const [loading, setLoading] = useState(!jobFromList);
const generateShortlistedData = () => {
  if (!shortlisteddata || shortlisteddata.length === 0) {
    const formatted = appliedusers.map(user => ({
      userId: user._id,
      selected: false,
      score: null,
      loading: false
    }));

    // Update state AND return it
    setshortlisteddata(formatted);
    return formatted;
  }

  return shortlisteddata;
};

const analyseApplicants = async (shortlist) => {
  const dataToUse = shortlist || shortlisteddata;

  if (!dataToUse || dataToUse.length === 0) return;

  setshortlisteddata(prev =>
    prev.map(u => ({ ...u, loading: true }))
  );

  try {
    const res = await fetch("/api/analyseApplicant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job,
        applicants: appliedusers.map(u => ({
          userId: u._id,
          resumeParsedText: u.resumeParsedText || ""
        }))
      }),
    });

    const data = await res.json();

    if (data.success) {
      setshortlisteddata(prev =>
        prev.map(item => {
          const match = data.results.find(r => r.userId === item.userId);
          return match
            ? { ...item, loading: false, selected: match.selected, score: match.score }
            : item;
        })
      );
    }
  } catch (err) {
    console.error("Batch analysis error:", err);
  }
};

  useEffect(() => {
    if (jobFromList) {
      setJob(jobFromList);
      setLoading(false);
      return;
    }
    if (!jobs || jobs.length === 0) return;
    const fetchJob = async () => {
      try {
        const res = await fetch("/api/getjobbyid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId }),
        });
        const data = await res.json();
        if (data.success) setJob(data.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId, jobs]);
  if (loading) return <p>Loading job...</p>;
  if (!job) return <p>Job not found</p>;
console.log(job)
console.log(shortlisteddata)

  const isShortlisting = shortlisteddata?.some(u => u.loading) || false;
const getShortlistStatus = (userId) => {
  if (!shortlisteddata) return null;
  return shortlisteddata.find(u => u.userId === userId) || null;
};
  return (
    <div className="p-4">
      <NavBar />
{aishortlist && (
  <div className=" fixed inset-0 flex items-center justify-center bg-white/50 z-50">
    <div className="w-[80%] h-[70%] bg-white rounded-lg shadow-2xl p-6">
      <p className='font-semibold text-[22px]'>AI Powered Applicant Shortlisting</p>

      <div className='h-[35vh] bg-white mt-10'>
        {appliedusers.length === 0 ? (
          <p className="text-gray-500 italic">No applicants yet</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth items-center" style={{ scrollbarWidth: "thin" }}>

            {appliedusers.map((user) => {
              const status = getShortlistStatus(user._id);

              let bgColor = "bg-gray-200";
              if (status?.selected) bgColor = "bg-green-400";
              else if (status?.selected === false) bgColor = "bg-red-400";

              return (
                <div key={user._id} className="flex flex-col items-center min-w-[140px] snap-center">

                  <div
  onClick={() => window.open(user.resumePdfUrl, "_blank")}
  className={`relative w-32 h-40 ${bgColor} border border-gray-300 rounded-md 
              flex items-center justify-center shadow-sm hover:shadow-lg 
              transition cursor-pointer group`}
>

  {status?.loading && (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md z-20">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  )}

  {!status?.loading && status?.selected === true && (
    <img
      src="/select-all-svgrepo-com.svg"
      alt="Selected"
      className="absolute top-1 right-1 w-6 h-6 z-20"
    />
  )}

  {/* Not Selected SVG */}
  {!status?.loading && status?.selected === false && (
    <img
      src="/cancel-circle-svgrepo-com.svg"
      alt="Rejected"
      className="absolute top-1 right-1 w-6 h-6 z-20"
    />
  )}

  {/* Resume Icon */}
  <img
    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
    alt="resume thumbnail"
    className={`w-12 opacity-80 group-hover:opacity-0 transition ${
      status?.loading ? "opacity-0" : ""
    }`}
  />

  {/* Hover Overlay */}
  <div className="absolute inset-0 bg-white/50 rounded-md flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition-opacity">
    <span className="text-black font-semibold text-sm">View Resume</span>
  </div>
</div>



                  {/* Username */}
                  <p className="mt-2 text-sm font-semibold text-gray-700 text-center truncate w-28">
                    {user.name || "Unknown User"}
                  </p>
                </div>
              );
            })}

          </div>
        )}
      </div>

      <div className='flex gap-5 mt-5 justify-end'>
        <button
  onClick={downloadPDF}
  disabled={isShortlisting}
  className={`px-2 py-4 rounded-2xl text-[13px] font-semibold 
    ${isShortlisting 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-green-500 hover:cursor-pointer hover:scale-105'
    }`}
>
  {isShortlisting ? "Shortlisting..." : "Download Shortlisted Data"}
</button>

        <button
          className='bg-red-500 hover:cursor-pointer px-2 py-4 rounded-2xl text-[16px] font-semibold'
          onClick={() => { setaishortlist(false) }}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

      <div className="flex flex-col md:flex-row md:gap-8">

        <div className="w-full md:w-3/5 mb-6 md:mb-0">
          <LeftContent shortlisteddata={shortlisteddata} analyseApplicants={analyseApplicants} generateShortlistedData={generateShortlistedData} appliedusers={appliedusers} setAppliedUsers={setAppliedUsers} setaishortlist={setaishortlist} aishortlist={aishortlist} job={job} authuser={authuser} updateJobInState={setJob} />
        </div>

        <div className="w-full md:w-2/5">
          <RightContent 
            selectedJob={jobId}
            jobs={jobs.filter(
              j => 
                String(j.postedBy) === String(authuser._id) &&
                String(j._id) !== String(jobId)
            )}
          />
        </div>

      </div>
    </div>
  );
};

export default RecruiterJobPost;
