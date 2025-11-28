import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecruiterLoginForm({ close, setauthuser, mode }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (loading) return;

    setLoading(true);

    try {
      if (mode === "login") {
        const res = await fetch("/api/recruiterlogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (data.success) {
          localStorage.setItem("token", data.token);
          setauthuser(data.recruiter);
          navigate("/recruiter/homepage");
        } else {
          alert(data.message || "Login failed");
        }
      }

      if (mode === "register") {
        const res = await fetch("/api/recruiterregister", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (data.success) {
          localStorage.setItem("token", data.token);
          setauthuser(data.recruiter);
          navigate("/recruiter/homepage");
        } else {
          alert(data.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full p-8">
      <button onClick={close} className="cursor-pointer text-gray-500 text-xl float-right">
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6">
        {mode === "login" ? "Recruiter Login" : "Recruiter Registration"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {mode === "register" && (
          <>
            <input
              {...register("name", { required: true })}
              className="w-full border p-3 rounded-lg"
              placeholder="Full name"
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </>
        )}

        <input
          {...register("email", { required: true })}
          className="w-full border p-3 rounded-lg"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">Email required</p>}

        <input
          {...register("password", { required: true })}
          type="password"
          className="w-full border p-3 rounded-lg"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Password required</p>
        )}

        {mode === "register" && (
          <>
            <input
              {...register("companyName", { required: true })}
              className="w-full border p-3 rounded-lg"
              placeholder="Company Name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">Company name required</p>
            )}
          </>
        )}

        <button
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg mt-4 flex items-center justify-center gap-2
            ${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-700"}
          `}
        >
          {loading && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}

          {loading
            ? mode === "login"
              ? "Logging in..."
              : "Registering..."
            : mode === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>
    </div>
  );
}
