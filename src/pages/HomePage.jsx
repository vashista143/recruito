import React, { useEffect, useState } from 'react'
import JobCarousal from '../components/JobCarousal'
import RecruiterNavbar from "../components/RecruiterNavbar" 
import CreateNewjob from '../components/CreateNewjob'

const RecruiterHomePage = ({ jobsprop, authuser }) => {

  const [jobs, setJobs] = useState([]);
  const [activejobs, setActiveJobs] = useState([]);
  const [expiredjobs, setExpiredJobs] = useState([]);
  const refreshJobs = async () => {
  try {
    const res = await fetch("/api/getjobs");
    const data = await res.json();

    setJobs(data.jobs || []);
    setActiveJobs(data.jobs.filter(j => j.status.toLowerCase() === "open"));
    setExpiredJobs(data.jobs.filter(j => j.status.toLowerCase() === "closed"));
  } catch (err) {
    console.log("Failed to refresh jobs", err);
  }
};

  useEffect(() => {
    if (!jobsprop) return;

    setJobs(jobsprop);
    setActiveJobs(jobsprop.filter(job => job.status.toLowerCase() === "open"));
    setExpiredJobs(jobsprop.filter(job => job.status.toLowerCase() === "closed"));

  }, [jobsprop]);   // ✅ runs only when jobsprop changes

  return (
    <div className='pt-2 pb-50'>
      <RecruiterNavbar authuser={authuser}/>
      <JobCarousal 
        authuser={authuser} 
        jobs={jobs} 
        activejobs={activejobs} 
        expiredjobs={expiredjobs} 
      />
      <CreateNewjob authuser={authuser} refreshJobs={refreshJobs}/>
    </div>
  );
};

export default RecruiterHomePage;
