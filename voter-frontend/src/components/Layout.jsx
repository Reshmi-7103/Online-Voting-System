import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <div className="main-wrapper">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;