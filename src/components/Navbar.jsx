import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast"; // Ensure toast is imported correctly
import Weather from "./Weather";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

function themeFormLocalStorage() {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme in themes ? storedTheme : themes.winter;
}

function Navbar() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [currentTheme, setCurrentTheme] = useState(themeFormLocalStorage());
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === themes.dracula);

  const handleMode = () => {
    setCurrentTheme((prev) => {
      const newTheme = prev === themes.winter ? themes.dracula : themes.winter;
      setIsDarkMode(newTheme === themes.dracula);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signout successfully");
        location.reload();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div className="navbar bg-gray-200 text-orange-400 font-semibold border-b">
      <div className="max-container py-3">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl m-0">
            <h1 className="font-mono">My Kitchen</h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Weather />
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"
              checked={isDarkMode}
              onChange={handleMode}
            />
            <MdOutlineLightMode className="swap-off fill-current w-7 h-7 text-yellow-200 bg-white rounded-3xl" />
            <MdOutlineDarkMode className="swap-on text-white bg-slate-500 rounded-3xl fill-current w-7 h-7" />
          </label>

          <Link to="/store">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle "
            >
              <div className="indicator">
                <AiOutlineShoppingCart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">
                  {product.totalQuantity}
                </span>
              </div>
            </div>
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">
                  <AiOutlineHome className="inline mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/chart">
                  <AiOutlineHome className="inline mr-2" /> Chart
                </Link>
              </li>
              <li>
                <Link to="/create">
                  <AiOutlinePlus className="inline mr-2" /> Create recipe
                </Link>
              </li>
              <li>
                <button onClick={logout}>
                  {isMobile ? (
                    <AiOutlineHome className="inline mr-2" />
                  ) : (
                    <BiLogOut className="inline mr-2" />
                  )}
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
