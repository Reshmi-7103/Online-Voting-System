import Layout from "../components/Layout";
import "../styles/profile.css";

function Profile() {
  return (
    <Layout>
    <div className="profile-container">

      <div className="not-logged">
        <h2>You are not logged in ❌</h2>
        <p>Please login to continue</p>

        <a href="/login">
          <button>Login Now</button>
        </a>
      </div>

    </div>
    </Layout>
  );
}

export default Profile;