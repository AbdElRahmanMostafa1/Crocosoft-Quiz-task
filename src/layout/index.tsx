import { Footer, Navbar } from "../components/shared";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1 px-3 py-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
