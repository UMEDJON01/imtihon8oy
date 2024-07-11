import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { VscSignIn } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignup } from "../hooks/useSignup";
import toast from "react-hot-toast";

function Signup() {
  const displayName = useRef();
  const email = useRef();
  const password = useRef();
  const photoUrl = useRef();
  const { signUpWithGoogleProvider, signup } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signUpWithGoogleProvider();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Error holatini tekshirish
    const newErrors = {};
    if (!displayName.current.value) newErrors.displayName = true;
    if (!email.current.value) newErrors.email = true;
    if (!password.current.value) newErrors.password = true;
    if (!photoUrl.current.value) newErrors.photoUrl = true;

    setErrors(newErrors);

    // Agar biror input to'ldirilmagan bo'lsa, hot-toast orqali xabar chiqaring
    if (Object.keys(newErrors).length > 0) {
      toast.error("Inputlarni to'ldiring");
      return;
    }

    // Agar hammasi to'g'ri bo'lsa, ro'yxatdan o'tish
    signup(
      displayName.current.value,
      email.current.value,
      password.current.value,
      photoUrl.current.value
    );
  };

  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="bg-cover h-screen absolute -z-10 object-cover w-full"
        src="sd.mp4"
      ></video>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center font-sofia justify-center gap-5 card bg-slate-50 bg-opacity-40 py-10 px-16 shadow-xl rounded-lg">
          <h1 className=" text-white font-mono font-extrabold text-3xl uppercase tracking-widest">
            R e g i s t e r
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col w-80 space-y-5"
          >
            <div className="w-full">
              <label className="block text-white " htmlFor="username">
                Name
              </label>
              <input
                ref={displayName}
                type="text"
                placeholder="Type your username"
                id="username"
                className={`input input-bordered w-full ${
                  errors.displayName
                    ? "input-error border-red-500"
                    : "input-primary"
                }`}
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-white mb-1" htmlFor="photoUrl">
                Photo URL
              </label>
              <input
                ref={photoUrl}
                type="url"
                id="photoUrl"
                placeholder="Type your URL"
                className={`input input-bordered w-full ${
                  errors.photoUrl
                    ? "input-error border-red-500"
                    : "input-primary"
                }`}
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-white mb-1" htmlFor="email">
                Email
              </label>
              <input
                ref={email}
                type="email"
                placeholder="Type your email"
                id="email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error border-red-500" : "input-primary"
                }`}
                required
              />
            </div>
            <div className="relative w-full">
              <label className="block text-white mb-1" htmlFor="password">
                Password
              </label>
              <input
                ref={password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Type your password"
                className={`input input-bordered w-full ${
                  errors.password
                    ? "input-error border-red-500"
                    : "input-primary"
                }`}
                required
              />
              <div
                className="absolute inset-y-0 right-0 mt-8 pr-5 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiFillEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button className="btn btn-primary btn-sm md:btn-md flex items-center justify-center gap-2 hover:bg-blue-600 hover:scale-105 transition-transform duration-300">
                <VscSignIn className="w-6 h-6" /> Sign Up
              </button>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-sm md:btn-md btn-error text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <FcGoogle className="w-6 h-6" /> Sign Up with Google
              </button>
            </div>
          </form>
          <p className="text-center text-black hover:scale-105 transition-transform duration-300 ">
            Do you have an account?{" "}
            <Link
              className="link text-white font-extrabold hover:text-white "
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
