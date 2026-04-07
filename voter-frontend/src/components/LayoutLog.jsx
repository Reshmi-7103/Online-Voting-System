import NavbarLog from "./NavbarLog";
import SidebarLog from "./SidebarLog";
import Footer from "./Footer";

function LayoutLog({ children }) {
  return (
    <>
      <NavbarLog />

      <div className="app-layout">
        <SidebarLog />

        <div className="main-wrapper">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LayoutLog;