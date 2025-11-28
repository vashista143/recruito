import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import ProfileProgressCircle from '../components/ProfileProgess'

const EditUserProfile = ({ userauthuser, setuserauthuser }) => {
  const [edituserform, setedituserform] = useState(false)
  const [loading, setLoading] = useState(false)

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

    fields.forEach(f => {
      if (userauthuser[f]) score += 5;
    });

    return score;
  };
  const logout = () => {
    localStorage.removeItem("token");
    setuserauthuser(null);
    window.location.href = "/";
  };

  const [formState, setFormState] = useState({
    name: "",
    education: "",
    university: "",
    gender: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
    location: ""
  });
  useEffect(() => {
    if (edituserform && userauthuser) {
      setFormState({
        name: userauthuser.name || "",
        education: userauthuser.education || "",
        university: userauthuser.university || "",
        gender: userauthuser.gender || "",
        dateOfBirth: userauthuser.dateOfBirth ? userauthuser.dateOfBirth.split("T")[0] : "",
        mobile: userauthuser.mobile || "",
        email: userauthuser.email || "",
        location: userauthuser.location || ""
      });
    }
  }, [edituserform, userauthuser]);
  const [resumeFile, setResumeFile] = useState(null)
  const handleFileSelect = (file) => {
    if (!file) return
    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed")
      return
    }
    setResumeFile(file)
  }
  const editusersubmit = async () => {
    try {
      setLoading(true)

      const res = await fetch(`/api/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          userid: userauthuser._id,
          ...formState,
          dateOfBirth: formState.dateOfBirth?.slice(0, 10) || ""
        })
      })

      const result = await res.json()

      if (!res.ok) {
        setLoading(false)
        alert("Failed to update")
        return
      }

      if (result.user) {
        setuserauthuser(result.user)
      }

      setLoading(false)
      setedituserform(false)

    } catch (error) {
      console.error(error)
      setLoading(false)
      alert("Error updating user")
    }
  }



  const handleSubmit = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first")
      return
    }

    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("userid", userauthuser?._id)

    try {
      const response = await fetch(`/api/upload-resume`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(result)
        alert("Failed to upload resume")
        return
      }

      alert("Resume uploaded successfully")
      console.log("Upload result:", result)
      setResumeFile(null);
    } catch (error) {
      console.error("Upload error:", error)
      alert("Error uploading resume")
    }
  }


  return (
    <div className=''>

      {edituserform && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">

          <div className="w-[90%] max-w-3xl bg-white p-6 rounded-xl shadow-xl border border-gray-200">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center rounded-xl">
                <div className="animate-spin w-10 h-10 border-4 border-black border-t-transparent rounded-full"></div>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <form className="grid grid-cols-2 gap-6">

              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />

              </div>

              {/* Education */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Highest Education</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.education}
                  onChange={(e) => setFormState({ ...formState, education: e.target.value })}
                />

              </div>

              {/* University */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">University / College</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.university}
                  onChange={(e) => setFormState({ ...formState, university: e.target.value })}
                />

              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Gender</label>
                <select
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.gender}
                  onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

              </div>

              {/* dateOfBirth */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.dateOfBirth}
                  onChange={(e) => setFormState({ ...formState, dateOfBirth: e.target.value })}
                />

              </div>

              {/* Mobile */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Mobile Number</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.mobile}
                  onChange={(e) => setFormState({ ...formState, mobile: e.target.value })}
                />

              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />

              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Current Location</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"

                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                />

              </div>
            </form>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setedituserform(false)}
                disabled={loading}
                className={`px-6 py-2 border rounded-lg text-gray-700 hover:cursor-pointer
    ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
  `}
              >
                Cancel
              </button>

              <button
                onClick={editusersubmit}
                disabled={loading}
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:cursor-pointer
    ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}
  `}
              >
                Save Details
              </button>

            </div>
          </div>

        </div>
      )}

      <NavBar />
      <div className='flex flex-col items-center pt-10 gap-10'>
        <div className="p-2 h-fit w-[90%] border border-blue-600 rounded-lg text-2xl font-semibold md:grid md:grid-cols-[35%_65%]">
          <div className="hidden md:display md:flex flex-col justify-center ml-20">
            <ProfileProgressCircle percentage={calculateProfileScore()} />
            <p className=" mt-3 ml-15 text-xl font-semibold text-gray-700">
              Edit Profile
            </p>
          </div>
          <div className="relative mt-1 mr-1">
            <button onClick={() => { logout() }}
              className="flex gap-0 md:gap-3 items-center absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white px-1 py-0 md:px-4 md:py-1 rounded-lg text-[15px] font-semibold transition"
            >
              Logout
              <img src="/logout-3-svgrepo-com.svg" className="hidden md:display w-6 h-6  mt-1" />
            </button>
            <div className='flex items-center gap-2 pr-20'>
              <p className='font-bold text-[18px] md:text-[27px]'>{userauthuser.name}</p>
              <div onClick={() => setedituserform(!edituserform)}>
                <img
                  src='/pencil-edit-button-svgrepo-com.svg'
                  className='w-8 h-8 md:w-4 md:h-4 transition hover:grayscale hover:opacity-60 hover:cursor-pointer'
                />
              </div>
            </div>

            <p className="text-[17px] text-gray-600 font-medium">
              {userauthuser.education ? userauthuser.education : "Education"}
            </p>

            <p className="text-[17px] text-blue-600 font-semibold">
              {userauthuser.university ? userauthuser.university : "University from"}
            </p>

            <div className="w-[80%] border-b border-gray-200 my-3"></div>

            <div className="flex gap-[5%] md:gap-[20%]">

              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-1 md:gap-3">

                <div className="flex items-center gap-2">
                  <img src="/location-pin-svgrepo-com.svg" className="w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-[11px] md:text-[16px] text-gray-600 font-semibold">
                    {userauthuser.location || "Current Location"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/gender-mark-1-svgrepo-com.svg" className="w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-[11px] md:text-[16px] text-gray-600 font-semibold">
                    {userauthuser.gender || "Gender"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/cake-svgrepo-com.svg" className="w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-[11px] md:text-[16px] text-gray-600 font-semibold">
                    {userauthuser.dateOfBirth
                      ? userauthuser.dateOfBirth.slice(0, 10)
                      : "Date Of Birth"}
                  </p>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-2">
                  <img src="/call-svgrepo-com.svg" className="w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-[11px] md:text-[16px] text-gray-600 font-semibold">
                    {userauthuser.mobile ? "+91 " + userauthuser.mobile : "Mobile Number"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/email-svgrepo-com.svg" className="w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-[11px] md:text-[16px] text-gray-600 font-semibold">
                    {userauthuser.email || "Mail Address"}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      <div className=''>
        <div className="max-w-6xl  mx-auto nt-1 md:mt-4 bg-white p-6 rounded shadow">
          <h2 className="text-m md:text-xl font-semibold mb-2">Uploaded Resume</h2>
          {userauthuser.resumePdfUrl ?
            <div className='border-1 border-gray-300 flex justify-between rounded-xl items-center px-2 md:px-5 py-2 md:py-4 text-[12px] md:text-[3vh]'>
              <div className='flex items-center gap-3'>
                <img src='/pdf-file-svgrepo-com.svg' className='md:w-7 md:h-7 w-5 h-5' />
                {userauthuser.name.replace(/\s+/g, "").toLowerCase()}-resume.pdf </div>
              <a href={userauthuser.resumePdfUrl} target="_blank" rel="noopener noreferrer">
                <button className='bg-blue-500 px-2 py-1 rounded-xl text-white hover:scale-105'>View</button>
              </a>
            </div> : "No Uploaded Resumes Found"}



          <h2 className="text-m md:text-xl font-semibold mb-2">Upload New Resume</h2>
          {/* If file NOT selected show drag box */}
          {!resumeFile ? (
            <label
              htmlFor="resumeUpload"
              className="border border-dashed border-gray-400 rounded-lg p-3 md:p-8 text-center cursor-pointer hover:bg-gray-50 transition block"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                handleFileSelect(e.dataTransfer.files[0])
              }}
            >
              <p className="text-gray-600 font-medium">Drag and drop your resume here</p>
              <p className="text-xs text-gray-500 mb-2">or click to upload</p>

              <div className="w-12 h-12 mx-auto flex items-center justify-center border border-gray-400 rounded-full text-gray-500 text-2xl font-bold">
                +
              </div>

              <p className="text-xs text-gray-400 mt-2">PDF only, max size 2MB</p>

              <input
                type="file"
                id="resumeUpload"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </label>
          ) : (
            // ✅ Show filename when PDF selected
            <div className="flex justify-between items-center border p-3 rounded">
              <span className="text-blue-600 text-sm font-medium">
                {resumeFile.name}
              </span>
              <div className="flex space-x-2">

                <button
                  onClick={() => setResumeFile(null)}
                  className="text-sm px-3 py-1 border rounded text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="mt-5 bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded hover:bg-blue-700"
          >
            Save Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditUserProfile
