import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { LuLogIn } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const { signUpWithGoogleProvider } = useSignup();
  const { login } = useLogin();

  const email = useRef();
  const password = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.current.value, password.current.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen grid place-items-center relative">
      <video
        className="w-full h-screen object-cover"
        src="sm.mp4"
        autoPlay
        loop
        muted
      />
      <div className="bg-slate-300 font-sofia bg-opacity-40 py-10 px-10 rounded-lg absolute max-w-md w-full mx-5 ">
        <h1 className="text-5xl text-white font-serif font-bold mb-8 text-center ">
          L O G I N
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-black mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={email}
              type="email"
              placeholder="Type your email"
              id="email"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-black mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="*******"
              className="input input-bordered input-primary w-full pr-10"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-9"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5 text-gray-600" />
              ) : (
                <FaEye className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="btn btn-primary w-full font-serif text-lg">
              <LuLogIn className="w-6 h-6" />
              Login
            </button>
            <button
              type="button"
              onClick={signUpWithGoogleProvider}
              className="btn btn-accent font-mono w-full text-lg"
            >
              <FcGoogle className="w-6 h-6" /> Login with Google
            </button>
            <NavLink
              className="text-center text-black hover:scale-105 transition-transform duration-300 font-extrabold hover:text-white"
              to="/signup"
            >
              Don't have an account?{" "}
              <span className="text-white hover:text-black">Sign up</span>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
