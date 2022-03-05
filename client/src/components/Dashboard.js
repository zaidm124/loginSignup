import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  let history = useHistory();
  const [detail, setDetail] = useState([]);
  const [error, setError] = useState("");

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
      history.push("/login");
      setError(err.response.data.error);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
        <div>
          <div>Name:{detail?.name}</div>
          <div>Username:{detail?.username}</div>
          <div>Group Name:{detail?.group?.groupName}</div>
        </div>
      </div>
    </div>
  );
}
