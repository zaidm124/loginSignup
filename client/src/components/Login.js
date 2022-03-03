import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import axios from "axios";

export default function Login() {
  

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/users/login",
        {
          username,
          password,
        },
        config
      );
      localStorage.setItem("token", data.responses.accessToken);
      navigate("/");
      console.log(data);
    } catch (err) {
      setError(err.response.data.error);
      window.alert(err.response.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

// function Login() {
//   return (
//     <Router>
//       <Root />
//     </Router>
//   );
// }
