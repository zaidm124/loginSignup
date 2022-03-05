import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/" exact>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
