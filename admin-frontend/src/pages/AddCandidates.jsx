import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/addCandidates.css";

function AddCandidates() {

  const [form, setForm] = useState({
    name: "",
    party: "",
    region: "",
    qualification: "",
    age: "",
    gender: "",
    photo: "",
    symbol: ""
  });

  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCandidates = async () => {
    const res = await fetch("http://127.0.0.1:5000/admin/candidates");
    const data = await res.json();
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // 🔥 IMAGE TO BASE64
  const handleImage = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, [type]: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleAdd = async () => {

    if (!form.name || !form.party || !form.region || !form.photo || !form.symbol) {
      setMessage("Fill all fields ❌");
      return;
    }

    const res = await fetch("http://127.0.0.1:5000/admin/add-candidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(data.msg);

    fetchCandidates();
  };

  const handleDelete = async (name) => {
    await fetch("http://127.0.0.1:5000/admin/delete-candidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    setMessage("Deleted ❌");
    fetchCandidates();
  };

  return (
    <AdminLayout>

      <div className="add-candidate-container">

        <h2>Add Candidate</h2>
        {message && <p className="msg">{message}</p>}

        <div className="form-box">

          <input placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input placeholder="Party"
            onChange={(e) => setForm({ ...form, party: e.target.value })} />

          <input placeholder="Region"
            onChange={(e) => setForm({ ...form, region: e.target.value })} />

          <input placeholder="Qualification"
            onChange={(e) => setForm({ ...form, qualification: e.target.value })} />

          <input type="number" placeholder="Age"
            onChange={(e) => setForm({ ...form, age: e.target.value })} />

          <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* 🔥 IMAGE UPLOAD */}
          <label>Candidate Photo</label>
          <input type="file" onChange={(e) => handleImage(e, "photo")} />

          <label>Party Symbol</label>
          <input type="file" onChange={(e) => handleImage(e, "symbol")} />

          <button onClick={handleAdd}>Add Candidate</button>

        </div>

        {/* LIST */}
        <div className="candidate-list">
          {candidates.map((c, i) => (
            <div key={i} className="candidate-card">

              <img src={c.photo} width="80" />
              <img src={c.symbol} width="50" />

              <p>{c.name}</p>
              <p>{c.party}</p>

              <button onClick={() => handleDelete(c.name)}>Delete</button>

            </div>
          ))}
        </div>

      </div>

    </AdminLayout>
  );
}

export default AddCandidates;