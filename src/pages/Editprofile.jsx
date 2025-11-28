import React from 'react';
import NavBar from '../components/NavBar';
import RecruiterOptionalForm from '../components/RecruiterOptional';

const RecruiterEditprofile = ({ authuser }) => {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/recruiter/login";
  };

  return (
    <div className="min-h-screen pt-5 bg-gray-100">
      <NavBar />

      <div className="max-w-5xl mx-auto py-10 px-5">
        <div className="bg-white p-8 rounded-2xl shadow-xl relative">

          {/* 🔥 Logout Button (top right corner) */}
          <button
            onClick={logout}
            className="flex gap-2 items-center absolute top-5 right-5 
                       bg-red-500 hover:bg-red-600 text-white px-4 py-1 
                       rounded-lg text-[15px] font-semibold transition"
          >
            Logout
            <img src="/logout-3-svgrepo-com.svg" className="w-6 h-6 inline-block mt-[3px]" />
          </button>

          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* LEFT PROFILE CARD */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-2xl p-8 w-full md:w-1/3 flex flex-col items-center">
              <div className="w-40 h-40 mb-5">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEGklEQVR4nO2aS2xWRRTHf0hpSyzRPihEIVRXIChEEyJ7DLWJ2OoKH0tSVmChGzbWuBICK3wGwoIVcWmxoguliQEsatAYH4USwksCmCYmyKsPc5L/TSb92ntn5k5bNPyTSb5895w59//NnDPnnPngAf6/eBTYCOwGeoHfgOvALQ37/CvwmWReAh7hPkEN8DpwFBgBxgOH6XwBvKa5Zhy1wHbgsvNSt4FjQA/QAawEGiVbq8+rgFck0w/ccfQvAW9JdkbwInDWeYEfgE6gPmKueun+6Mx3BtjANMJ+qQ8dg2a8NdHcc/QDnXbm3zcd220R8L0M/ANsA+amNgJUAV0KDmZrAGhONXmLltsm/h14ukB+BbAT+AYYEvGbwDngELDOw+ZqYFA2B/UOpVciI3FSDjsVmoCDwGhBpBoD3pV8HpqA7xwyzWV8IttOJ4C6HFkz8ktg6L0HfAI8nDNvnUNmINZnPnK2U95KPAR8G3GGZMN0qwtWZlCy74eSaHMcu8gnXi1BIhvdBTbWOAHAOzTPl5Oa0lYP+d4ERM572Oly/MVri+1wzom5HvH/7wREbDzpEZp/kqyF/0IHvxywhAsTkbCxPmDLXypalTckaNHKB4sTEmn3sDfHSWc25Ql+JaHNnkSaExLxdeItku/LS+BGlMVabeGDBTrgUhBZ7mmzQVnzvanqmXZN+DVhuJCAxGhg+t4vPSvOKrBHD98OJNKXgMjPgTbfkZ5VmhU4oocvB076QQIilqOFoEN6VjZXIEsDLHv1haUnfyYgckVz+WKlkz5V4C89NGfyRUPCqBViNzu/rk32MKuf8xK4iZinfKwsiduBmW2No5eECOqglCVinZQQZETsnZNsLcNzqgBjSZjus4E2m6R7I8/ZfQ+myaJIzDDdUDyV5+x9keE3W+prESSuRmxl9/C2I6MCeyMPxAzdEUSsyReDnrwDMTZFcSPYqQASA6oxYnAsL0VpVCIWkjROxJIAIo9H2mhQtLqb955fBqbxk62KL5HY1eiU/ud5Qm9KyIqXGNQFEMlrL/kUVnYLkBt9slI3pq/7RAARkw1Fm3Qv+kS7LPqcDlz+FnUjfYlY029ZwPxVSvfHdf1QiBqnHeSjsBbYH3m6m84B4HkPO9ulMxhy9rSphLWm2DNTpAhbJ1wDlB32a3dN0ePNGnRjMVs+a5n+4TScrUt+eMJNU+pxF/hUL5+l7GecO5NgzHcayCdUCRZ12lOOUeBjx++Ol7mWW6x7jfFZHkO64iiFpc7SzsY4FxmqJ8VjgaE11TiuXZEUtdqzqRpyeWNMPjmtd++t0+w3Z4EXmCHUKOZfSUjAUqNtkYVWaVTr7xdHFf9DX/6OGg+blDnfF6hXcbZLZbP9gWbYeelhfWfP3lNJHfNviQfgv4B/ARxzhNGFGL+bAAAAAElFTkSuQmCC"
                  alt="user"
                  className="w-full h-full object-cover rounded-full border-4 border-blue-600 shadow-md"
                />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-gray-800">{authuser.name}</h3>
                <p className="text-gray-600 text-sm">{authuser.companyName}</p>
                <p className="text-gray-500 text-xs">
                  {authuser.email.slice(0, 5)}****{authuser.email.slice(-10)}
                </p>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-md">
              <RecruiterOptionalForm authuser={authuser} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterEditprofile;
