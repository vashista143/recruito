import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import JobsVerticalCarousel from "../components/RecommendationPageCarousal";
import { useLocation } from "react-router-dom";

const RecommendedJobs = ({setappliedjobs, appliedjobs, userauthuser }) => {
  const { state } = useLocation();
  const jobsFromState = state?.jobs || null;
  const [jobs, setJobs] = useState(jobsFromState || []);
  const [loading, setLoading] = useState(!jobsFromState);
  const [savedjobs, setSavedJobs] = useState([]);
  const [showapplies, setshowapplies] = useState(true);

  useEffect(() => {
    if (jobsFromState) return;

    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/getjobs");
        const data = await res.json();

        const allJobs = Array.isArray(data.jobs) ? data.jobs : [];

        setJobs(allJobs);

        const savedIds = new Set((userauthuser?.saved || []).map(id => String(id)));
        const matchedSaved = allJobs.filter(job =>
          savedIds.has(String(job._id))
        );

        setSavedJobs(matchedSaved);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobsFromState, userauthuser]);

  useEffect(() => {
    if (!jobsFromState) return;

    const savedIds = new Set((userauthuser?.saved || []).map(id => String(id)));
    const matchedSaved = jobsFromState.filter(job =>
      savedIds.has(String(job._id))
    );

    setSavedJobs(matchedSaved);
  }, [jobsFromState, userauthuser]);

  return (
    <div className="">
      <NavBar />
      <div className="mx-5 md:mx-15">
        <h1 className="mt-5 font-semibold text-m md:text-2xl">Recommended Jobs for you</h1>

        <div className="mt-5 flex gap-10 font-semibold text-xl relative">
          <div
            onClick={() => setshowapplies(true)}
            className="cursor-pointer relative pb-2"
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
              Saved
            </span>
            {!showapplies && (
              <div className="absolute left-0 right-0 h-[4px] bg-black rounded-full mt-[3px]" />
            )}
          </div>
        </div>
      </div>

      <div className="mb-10 ml-1 md:ml-15">
        {loading ? (
          <div className="text-center mt-10 text-lg">Loading jobs...</div>
        ) : showapplies ? (
          <JobsVerticalCarousel setSavedJobs={setSavedJobs} setappliedjobs={setappliedjobs} savedjobs={savedjobs} appliedjobs={appliedjobs} jobs={jobs} userauthuser={userauthuser} />
        ) : (
          <JobsVerticalCarousel savedjobs={savedjobs} setappliedjobs={setappliedjobs} appliedjobs={appliedjobs} jobs={savedjobs} userauthuser={userauthuser} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
