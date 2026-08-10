import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { User } from "../types";

export default function Signin() {
  const [credentials, setCredentials] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />
      <input
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        {" "}
        Sign in{" "}
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        {" "}
        Sign up{" "}
      </Link>
    </div>
  );
}
