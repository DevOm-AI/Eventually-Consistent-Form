import { useState } from "react";

function mockAPI() {
  const random = Math.random();

  return new Promise((resolve, reject) => {
    if (random < 0.4) {
      resolve({ status: 200 });
    } else if (random < 0.7) {
      reject({ status: 503 });
    } else {
      setTimeout(() => resolve({ status: 200 }), 7000);
    }
  });
}

export default function App() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle");
  const [retryCount, setRetryCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "pending") return;

    setStatus("pending");

    try {
      await mockAPI();
      setStatus("success");
      setRetryCount(0);
    } catch (err) {
      if (retryCount < 3) {
        setStatus("retrying");
        setTimeout(() => {
          setRetryCount((c) => c + 1);
          handleSubmit(e);
        }, 2000);
      } else {
        setStatus("failed");
      }
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Eventually Consistent Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <br /><br />

        <button disabled={status === "pending"}>
          Submit
        </button>
      </form>

      <p>Status: {status}</p>
    </div>
  );
}