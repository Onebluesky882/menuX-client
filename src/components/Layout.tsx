import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className=" mx-4 flex flex-col min-h-screen">
      <div>
        <Header />
        {/* <TopBar /> */}
      </div>

      <main className="flex-1 mx-4 mb-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
export default Layout;
