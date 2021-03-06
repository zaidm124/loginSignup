import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import App from "../../App";
import { Router } from "react-router-dom";

describe("App", () => {
  test("renders App component without crashing", () => {
    render(<App />);
  });
});
describe("Login", () => {
  test("renders Login component without crashing", () => {
    render(<Login />);
  });
});
describe("Sign Up", () => {
  test("renders Sign Up component without crashing", () => {
    render(<Register />);
  });
});
describe("Dashboard", () => {
  test("renders Dashboard component without crashing", () => {
    render(<Dashboard />);
  });
});
