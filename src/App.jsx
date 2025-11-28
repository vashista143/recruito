import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import RecruiterLoginPage from './pages/LoginPage';
import RecruiterHomePage from './pages/HomePage';
import RecruiterEditProfile from './pages/Editprofile';
import RecruiterJobPost from './pages/JobPost';
import HomeLoginUser from './pages/HomeLoginUser';
import UserHomePage from './pages/UserHomePage';
import RecommendedJobs from './pages/RecommendedJobs';
import ShowJob from './pages/ShowJob';
import EditUserProfile from './pages/EditUserProfile';
import { Toaster } from "react-hot-toast";

function App() {
  const [authuser, setauthuser] = useState(null); 
  const [userauthuser, setuserauthuser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
const [jobs, setalljobs] = useState([]);

useEffect(() => {
  const fetchJobs = async () => {
    const res = await fetch("/api/getjobs");
    const data = await res.json();
    setalljobs(data.jobs || []);
  };
  fetchJobs();
}, []);
 const [appliedjobs, setappliedjobs] = useState([]);
   useEffect(() => {
    if (!jobs || !userauthuser) return;

    const appliedIds = new Set((userauthuser.applied || []).map(id => String(id)));

    const filtered = jobs.filter(job => 
      appliedIds.has(String(job._id))
    );

    setappliedjobs(filtered);
  }, [jobs, userauthuser]);

  useEffect(() => {
    let isMounted = true;

    const getAuthUserFromToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (isMounted) {
          setauthuser(false);
          setuserauthuser(false);
          setAuthChecked(true);
        }
        return;
      }

      try {
        const res = await fetch("/api/recruitercheck", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
          credentials: "include"
        });

        const data = await res.json();

        if (isMounted) {
          if (res.ok) {
            if (data.role === "recruiter") {
              setauthuser(data.recruiter);
            } 
            else if (data.role === "user") {
              setuserauthuser(data.user);
            } 
            else {
              setauthuser(false);
              setuserauthuser(false);
              localStorage.removeItem("token");
            }
          } else {
            setauthuser(false);
            setuserauthuser(false);
            localStorage.removeItem("token");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Auth check failed:", err.message);
          setauthuser(false);
          setuserauthuser(false);
          localStorage.removeItem("token");
        }
      } finally {
        if (isMounted) setAuthChecked(true);
      }
    };

    getAuthUserFromToken();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Checking session...
      </div>
    );
  }
console.log(appliedjobs)
  return (
    <>
      {/* ✅ Toaster MUST be outside Routes */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={!userauthuser ? <HomeLoginUser setuserauthuser={setuserauthuser} /> : <Navigate to="/user/homepage" replace />} />
        <Route path="/user/homepage" element={ userauthuser ? <UserHomePage appliedjobs={appliedjobs} jobs={jobs.filter(job => job.status.toLowerCase() === "open")} userauthuser={userauthuser} /> : <Navigate to="/" replace />} />
        <Route path="/user/recommendedjobs" element={userauthuser ? <RecommendedJobs setappliedjobs={setappliedjobs} appliedjobs={appliedjobs} userauthuser={userauthuser} /> : <Navigate to="/" replace />} />
        <Route path="/user/showjob/:jobId" element={userauthuser ? <ShowJob setappliedjobs={setappliedjobs} appliedjobs={appliedjobs} userauthuser={userauthuser} /> : <Navigate to="/" replace />} />
        <Route path="/user/editprofile" element={userauthuser ? <EditUserProfile setuserauthuser={setuserauthuser} userauthuser={userauthuser} /> : <Navigate to="/" replace />} />

        <Route path="/recruiter/homepage" element={authuser ? <RecruiterHomePage jobsprop={jobs.filter(job => String(job.postedBy) === String(authuser._id))} authuser={authuser} /> : <Navigate to="/recruiter/login" replace />} />
        <Route path="/recruiter/editprofile" element={authuser ? <RecruiterEditProfile authuser={authuser} /> : <Navigate to="/recruiter/login" replace />} />
        <Route path="/jobpost/:jobId" element={authuser ? <RecruiterJobPost jobs={jobs} authuser={authuser} /> : <Navigate to="/recruiter/login" replace />} />

        <Route path="/recruiter/login" element={!authuser ? <RecruiterLoginPage setauthuser={setauthuser} /> : <Navigate to="/recruiter/homepage" replace />} />
      </Routes>
    </>
  );
}

export default App;
