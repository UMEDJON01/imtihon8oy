import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Create, Login, Signup, Recipe, Store, Chart } from "./pages";
import RootLayout from "./layout/RootLayout";
import { useSelector, useDispatch } from "react-redux";
import { isAuthReady, login } from "./features/user/userSlice";
import { auth } from "./firebase/firebaseConfig";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./components/Loader"; // Import Loader

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((state) => state.currentUser);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "recipe/:id",
          element: <Recipe />,
        },
        {
          path: "/store",
          element: <Store />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(login(user));
      }
      dispatch(isAuthReady(true));
    });
  }, [dispatch]);

  if (!authReady) {
    return <Loader />; // Show loader until auth is ready
  }

  return <RouterProvider router={routes} />;
}

export default App;
