import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const UserLoginForm = ({setuserauthuser, closeForm, onLoginSubmit, onRegisterSubmit, isRegisterMode, setIsRegisterMode }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const navigate = useNavigate();

  const fallbackLogin = (data) => { console.log("Login Data:", data); };
  const fallbackRegister = (data) => { console.log("Register Data:", data); };

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
  };

  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(() => setToast((s) => ({ ...s, visible: false })), 4000);
    return () => clearTimeout(t);
  }, [toast.visible]);

const submitLogin = async (data) => {
  setLoading(true);
  setServerError("");
  try {
    const res = await fetch('/api/userlogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok) {
      reset();
      if (result.token) localStorage.setItem("token", result.token);
      setuserauthuser(result.user);
      navigate('/user/homepage');
      showToast("success", result.message || "Login successful");
    } else {
      const msg = result.message || 'Login failed';
      setServerError(msg);
      showToast("error", msg);
    }
  } catch (err) {
    const msg = 'Network error. Please try again.';
    setServerError(msg);
    showToast("error", msg);
  }
  setLoading(false);
};



const submitRegister = async (data) => {
  setLoading(true);
  setServerError("");
  try {
    const res = await fetch('/api/userregister', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok) {
      reset();
      if (result.token) localStorage.setItem("token", result.token);
      setuserauthuser(result.user);
      navigate('/user/homepage');
      showToast("success", result.message || "Registration successful");
      setIsRegisterMode(false);
    } else {
      const msg = result.message || 'Registration failed';
      setServerError(msg);
      showToast("error", msg);
    }
  } catch (err) {
    const msg = 'Network error. Please try again.';
    setServerError(msg);
    showToast("error", msg);
  }
  setLoading(false);
};


  return (
    <div className='z-50 relative overflow-hidden p-8 rounded-l-3xl pt-6 w-full h-full flex flex-col'>
      {/* Toast (fixed) */}
      {toast.visible && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-6 right-6 z-50 min-w-[220px] max-w-sm p-3 rounded-md shadow-lg text-sm border ${
            toast.type === "success"
              ? "bg-green-50 border-green-300 text-green-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex justify-end items-center mb-6">
        <button 
          onClick={()=>{closeForm();setIsRegisterMode(false);}} 
          className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100 absolute top-4 right-4 z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className='flex justify-between items-center mb-6 border-b border-gray-100 pb-3'>
        <h2 className="text-2xl font-bold text-gray-800">{isRegisterMode ? "Register" : "Login"}</h2>
        <button 
          onClick={() => setIsRegisterMode(prev => !prev)} 
          className="text-blue-600 font-semibold hover:underline text-sm"
        >
          {isRegisterMode ? "Have an account? Login" : "Register for free"}
        </button>
      </div>

      <form onSubmit={handleSubmit(isRegisterMode ? submitRegister : submitLogin)} className="flex flex-col space-y-5 flex-grow">
        {/* Register mode: extra fields */}
        {isRegisterMode && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                {...register("name", { required: isRegisterMode ? "Name is required" : false })}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email ID 
          </label>
          <input
            type="text"
            placeholder="Enter your active Email ID "
            className={`w-full px-2 py-1 md:px-4 md:py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full px-2 py-1 md:px-4 md:py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              {...register("password", { required: "Password is required", minLength: isRegisterMode ? { value: 6, message: "Password must be at least 6 characters" } : undefined })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700 font-sm md:font-medium flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1} 
            >
              {showPassword ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
              <p className='hidden md:display'>{showPassword ? "Hide" : "Show"}</p>
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          
          {!isRegisterMode && (
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
            </div>
          )}
        </div>

        <button
  type="submit"
  disabled={loading}
  className={`
    w-full bg-blue-600 text-white font-bold py-1 md:py-3 rounded-lg 
    transition-colors shadow-md mt-2 flex items-center justify-center gap-2
    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}
  `}
>
  {loading && (
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  )}

  {loading
    ? isRegisterMode
      ? "Creating Account..."
      : "Logging in..."
    : isRegisterMode
      ? "Create Account"
      : "Login"}
</button>


        {serverError && (
          <p className="mt-2 text-xs text-red-500">{serverError}</p>
        )}
      </form>
    </div>
  );
};

export default UserLoginForm;