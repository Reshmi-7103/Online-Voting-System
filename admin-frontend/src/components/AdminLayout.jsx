import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "../styles/adminLayout.css";

function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />

      <div className="admin-layout">

        <AdminSidebar />

        <div className="admin-main">
          {children}
        </div>

      </div>
    </>
  );
}

export default AdminLayout;