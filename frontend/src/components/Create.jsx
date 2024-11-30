import React, { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");

  // console.log(name,email,age);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };
    if (name === '' || email === '' || age <= 0) {
      return alert('Write name email and age correctly')
    }

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge("");
    }
  };

  return (
    <div className=" container mt-5" style={{ maxWidth: "500px" }}>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
