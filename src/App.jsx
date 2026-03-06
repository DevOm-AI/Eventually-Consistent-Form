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

  const getStatusStyle = () => {
    switch (status) {
      case "pending":
        return { background: "#fff3cd", color: "#856404" };
      case "retrying":
        return { background: "#ffeeba", color: "#856404" };
      case "success":
        return { background: "#d4edda", color: "#155724" };
      case "failed":
        return { background: "#f8d7da", color: "#721c24" };
      default:
        return { background: "#e2e3e5", color: "#383d41" };
    }
  };

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
    <div
      style={{
        padding: 40,
        fontFamily: "Arial",
        maxWidth: 400,
        margin: "auto"
      }}
    >
      <h2>Eventually Consistent Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8 }}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ width: "100%", padding: 8 }}
        />

        <br /><br />

        <button
          disabled={status === "pending"}
          style={{
            padding: "10px 20px",
            cursor: status === "pending" ? "not-allowed" : "pointer"
          }}
        >
          Submit
        </button>
      </form>

      <br />

      <span
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          fontWeight: "bold",
          ...getStatusStyle()
        }}
      >
        Status: {status}
      </span>
    </div>
  );
}