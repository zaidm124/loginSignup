import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [detail, setDetail] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const { data } = await axios.get("/api/v1/profile", config);
      setDetail(data.user);
      console.log(data);
    } catch (err) {
      setError(err.response.data.error);
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
        <div>
          <div>Name:{detail.name}</div>
          <div>Username:{detail.username}</div>
          <div>UserType:{detail.userType}</div>
        </div>
      </div>
    </div>
  );
}
