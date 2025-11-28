import React, { useState } from 'react'

const CreateNewjob = ({refreshJobs}) => {
  const [newjobform, setnewjobform] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    experience: "",
    salary: "",
    openings: "",
    mustHaveSkills: "",
    niceToHaveSkills: "",
    department: "",
    roleCategory: "",
    education: "",
    employmentType: "",
    description: "",
    keySkills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch("/api/createnewjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        refreshJobs();
        const result = await res.json();
        console.log('Job created', result);
        setnewjobform(false);
        setFormData({
          companyName: "",
          jobTitle: "",
          location: "",
          experience: "",
          salary: "",
          openings: "",
          mustHaveSkills: "",
          niceToHaveSkills: "",
          department: "",
          roleCategory: "",
          education: "",
          employmentType: "",
          description: "",
          keySkills: "",
        });
      } else {
        console.log("Failed to create new job", res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center'>
      {!newjobform && (
        <button
          onClick={() => setnewjobform(true)}
          className="bg-indigo-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition-all"
        >
          Create New Job
        </button>
      )}

      {newjobform && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-5xl border border-indigo-200 relative">

            {/* Header with Close button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-600">
                Post a New Job
              </h2>
              <button
                onClick={() => setnewjobform(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Row 1 */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g., Senior Associate - Developer"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g., ISSQUARED"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Noida"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., 2-5 years"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., Not Disclosed"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Openings</label>
                  <input
                    type="number"
                    name="openings"
                    value={formData.openings}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Employment Type</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Engineering - Software & QA"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Role Category</label>
                  <input
                    type="text"
                    name="roleCategory"
                    value={formData.roleCategory}
                    onChange={handleChange}
                    placeholder="e.g., Software Development"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g., BE/B.Tech/MCA"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Key Skills */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Key Skills</label>
                <textarea
                  name="keySkills"
                  value={formData.keySkills}
                  onChange={handleChange}
                  placeholder="e.g., .NET Core, Angular, PostgresSQL, REST API..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                  rows="2"
                />
              </div>

              <div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nice To Have Skills</label>
                  <input
                    type="text"
                    name="niceToHaveSkills"
                    value={formData.niceToHaveSkills}
                    onChange={handleChange}
                    placeholder="e.g., AWS, TypeScript, GraphQL"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
              </div>


              {/* Description */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe responsibilities, skills required, etc."
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                  rows="3"
                />
              </div>

              {/* Submit */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-8 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition-transform transform hover:scale-105"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateNewjob
