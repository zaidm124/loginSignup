import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const { data } = await axios.get("/api/v1/profile", config);
      console.log(data);
      history.push("/");
    } catch (err) {
      setError(err.response.data.error);
    }
  }, []);

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
      console.log(data);
      history.push("/");
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
