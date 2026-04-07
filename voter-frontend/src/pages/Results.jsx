import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import "../styles/results.css";

function Results() {

  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);
  const [maxVotes, setMaxVotes] = useState(1);

  // 🔥 FETCH CANDIDATES
  const fetchCandidates = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin/candidates");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FETCH RESULTS
  const fetchResults = async (candidateList) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/results");
      const data = await res.json();

      const merged = candidateList.map((c, i) => ({
        id: i,
        name: c.name,
        votes: data[c.name] || 0,
        photo: c.photo,
        symbol: c.symbol
      }));

      setResults(merged);

      const max = merged.length > 0
        ? Math.max(...merged.map(c => c.votes), 1)
        : 1;

      setMaxVotes(max);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      fetchResults(candidates);
    }
  }, [candidates]);

  // 🔥 WINNER / TIE
  const maxVote = Math.max(...results.map(c => c.votes), 0);
  const winners = results.filter(c => c.votes === maxVote);

  return (
    <Layout>
      <div className="results-container">

        <h1>Election Results</h1>
        <p>Total Candidates: {results.length}</p>

        {winners.length === 1 ? (
          <h2 className="winner">🏆 Winner: {winners[0].name}</h2>
        ) : (
          <h2 className="winner">⚖️ Tie between: {winners.map(w => w.name).join(", ")}</h2>
        )}

        <div className="results-grid">
          {results.map((c) => (
            <div key={c.id} className="result-card">

              <div className="img-row">
                {c.photo && <img src={c.photo} className="candidate-img" />}
                {c.symbol && <img src={c.symbol} className="symbol-img" />}
              </div>

              <h3>{c.name}</h3>
              <p>{c.votes} Votes</p>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${(c.votes / maxVotes) * 100}%` }}
                ></div>
              </div>

            </div>
          ))}
        </div>

        <h2 className="analysis-title">Voting Analysis</h2>

        <div className="bar-chart">
          {results.map((c) => (
            <div key={c.id} className="bar-item">

              <div
                className="bar"
                style={{ height: `${c.votes * 10}px` }}
              ></div>

              <p>{c.name}</p>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Results;