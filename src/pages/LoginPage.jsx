import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import RecruiterLoginForm from "../components/RecruiterLogin"
import React, { useState } from "react";
import WorkFlowSection from "../components/WorkFlowSection"
const RecruiterLoginPage = ({setauthuser}) => {
    const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState("login");

  const openPanel = (mode) => {
    setPanelMode(mode);
    setIsPanelOpen(true);
  };
const onSubmit = async (formdata) => {
  console.log(formdata);
  try {
    const res = await fetch("/api/recruiterlogin", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });

    if (!res.ok) { 
      const errorText = await res.text(); 
      console.error(`Login failed with status ${res.status}:`, errorText);
      return; 
    }

    const data = await res.json(); 
    if (data.success) {
      localStorage.setItem("token", data.token);
      setauthuser(data.recruiter);
      setTimeout(() => {
  navigate("/recruiter/homepage");
}, 0);
    } else {
      console.error("Login failed:", data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
  return (
    <div className="">
     <div className="bg-[#6E44FA] w-full h-screen px-15">
  <div className="flex justify-between pt-5">
    <Link to="/recruiter/homepage"
      className="text-white text-3xl font-bold flex items-center cursor-pointer">
      <img src="/image-removebg.png" alt="logo" className="w-8 h-12 inline-block mr-2"/>
      recruito
    </Link>

    <div className="flex gap-5">
      <button onClick={() => openPanel("login")} className="bg-black text-white text-[12px] px-5 border-1 border-white rounded-4xl cursor-pointer">Login</button>
      <button onClick={() => openPanel("register")} className="bg-black text-white text-[12px] px-5 border-1 border-[#FE5858] rounded-4xl cursor-pointer">Register</button>
    </div>
  </div>
  <div className="flex justify-between items-center h-[85vh]">
    <div className="pt-10 flex flex-col text-white max-w-xl space-y-6">
      <h1 className="text-[52px] leading-[60px] font-extrabold tracking-tight">
        Next generation <br />
        hiring solution.
      </h1>
      <p className="text-[17px] text-white/90 leading-7 font-medium">
        Powerful, agile, all-in-one hiring tool for your recruiting needs.
        Built with productivity at heart and loaded with features to help 
        you hire more effectively.
      </p>
      <div className="flex items-center bg-white rounded-full p-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Your email address..."
          className="flex-1 px-4 py-2 rounded-full text-gray-700 focus:outline-none text-[15px]"
        />
        <button className="bg-[#3EE263] text-white px-6 py-2 rounded-full text-[15px] font-semibold hover:scale-105 transition">
          Get Started 
        </button>
      </div>
      <div className="flex items-center gap-5 text-[14px] text-white/80 font-medium">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-[#3EE263] rounded-full"></span>
          AI Shortlisting
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-[#3EE263] rounded-full"></span>
          Hiring feasibility
        </div>
      </div>
      <p className="mt-4 text-[14px] text-white/70 font-medium">
        Built by <span className="font-semibold">Vashista</span>
      </p>
    </div>
    <div className="flex-1 flex justify-center items-center">
      <img
      src="/public/recruitment.png"
      className="h-[80%] w-[80%]"
      />
    </div>

  </div>
</div>
{isPanelOpen && (
        <div className="fixed top-0 right-0 w-[40%] min-w-[350px] h-screen bg-white shadow-2xl z-[50] border-l border-gray-200 animate-slide">
          <RecruiterLoginForm
            close={() => setIsPanelOpen(false)}
            setauthuser={setauthuser}
            mode={panelMode}
          />
        </div>
      )}
   <div className="w-full bg-white py-20 font-inter">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-[38px] font-semibold text-gray-900">
          Everything you need to grow your team
        </h1>

        <p className="text-gray-500 text-[15px] mt-2 leading-relaxed">
          Redefining job application process and letting you meet the best <br/>
          candidates in the shortest time
        </p>
      </div>

      {/* 3 Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

        {/* Card 1 */}
        <div className="bg-[#F4ECFF] p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="w-12 h-12 bg-[#B98AFF] text-white rounded-xl flex items-center justify-center mb-4 text-xl font-bold">
            📁
          </div>

          <h3 className="text-lg font-semibold mb-2">Enterprise Job Board</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            You’ll have a branded job board as a <br/>centralized place to display all the open <br/>positions at your organization.
          </p>

          <button className="px-5 py-2 border border-gray-300 text-sm rounded-full font-medium hover:bg-gray-100">
            Learn More
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[#FFF5E5] p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="w-12 h-12 bg-[#FFA94D] text-white rounded-xl flex items-center justify-center mb-4 text-xl font-bold">
            👤
          </div>

          <h3 className="text-lg font-semibold mb-2">Candidate Management</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            As they apply, new candidates <br/>automatically show up in the hiring <br/>dashboard for efficient review.
          </p>

          <button className="px-5 py-2 border border-gray-300 text-sm rounded-full font-medium hover:bg-gray-100">
            Learn More
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#E8FFEE] p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="w-12 h-12 bg-[#4CCF75] text-white rounded-xl flex items-center justify-center mb-4 text-xl font-bold">
            🤝
          </div>

          <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            Hiring is a team sport and Recruito is <br/>set up to support it. Invite unlimited <br/>users to manage candidates together.
          </p>

          <button className="px-5 py-2 border border-gray-300 text-sm rounded-full font-medium hover:bg-gray-100">
            Learn More
          </button>
        </div>

      </div>
    </div>
    <WorkFlowSection/>
      <div className="w-full border-t mt-14 py-8 text-center text-gray-500 text-sm">

    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      <span className="hover:underline cursor-pointer">Career advice</span>
      <span className="hover:underline cursor-pointer">Browse jobs</span>
      <span className="hover:underline cursor-pointer">Browse companies</span>
      <span className="hover:underline cursor-pointer">Salaries</span>
      <span className="hover:underline cursor-pointer">Events</span>
      <span className="hover:underline cursor-pointer">Countries</span>
      <span className="hover:underline cursor-pointer">Help</span>
    </div>

    <p className="mt-6">© 2025 Recruito. All rights reserved.</p>
    <p>built by Vashista</p>
  </div>

</div>
  )
}

export default RecruiterLoginPage
