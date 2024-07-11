import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
