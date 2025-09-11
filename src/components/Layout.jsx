import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <div className="bg-back p-2 pt-14 md:pt-16 ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
