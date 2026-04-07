import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/verifyUsers.css";

function VerifyUsers() {

  const [users, setUsers] = useState([]);

  // 🔥 FETCH USERS FROM BACKEND
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 VERIFY USER
  const handleVerify = async (email) => {
    try {
      await fetch("http://127.0.0.1:5000/admin/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      alert("User Verified ✅");

      fetchUsers(); // 🔥 refresh data

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 REJECT USER
  const handleReject = async (email) => {
    try {
      await fetch("http://127.0.0.1:5000/admin/reject-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      alert("User Rejected ❌");

      fetchUsers(); // 🔥 refresh

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>

      <div className="verify-users-container">

        <h2>Verify Users</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Aadhar</th>
              <th>Voter ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.aadhar}</td>
                <td>{user.voter_id}</td>

                <td>
                  {user.is_verified ? "✅ Verified" : "❌ Not Verified"}
                </td>

                <td>
                  {!user.is_verified && (
                    <>
                      <button
                        className="approve"
                        onClick={() => handleVerify(user.email)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject"
                        onClick={() => handleReject(user.email)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default VerifyUsers;