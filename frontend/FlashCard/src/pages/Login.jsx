import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authoContext";
import { handleGoogleLogin, handleSubmit } from "../firebase/firebase"; 

export const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (userLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // Handles Google Sign-in
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await handleGoogleLogin(setErrorMessage);
        navigate("/dashboard");
      } catch {
        setIsSigningIn(false); // in case anything fails silently
      }
    }
  };

  // Handles Email/Password login
  const onSubmit = async (e) => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await handleSubmit(e, setErrorMessage);
        navigate("/dashboard");
      } catch {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side – Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Welcome Back</h2>

          {errorMessage && (
            <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>
          )}

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="block mb-1 text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
            >
              {isSigningIn ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Google Sign-In */}
          <button
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
          >
            Continue with Google
          </button>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side – Logo Display */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-slate-900 text-white">
        <h1 className="text-5xl font-extrabold tracking-tight">NeuroNote.</h1>
      </div>
    </div>
  );
};
