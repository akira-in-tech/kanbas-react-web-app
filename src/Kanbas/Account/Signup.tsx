import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { User } from "../types";

export default function Signup() {
  const [credentials, setCredentials] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      console.error(err);
      setError("Unable to sign up. That username may already be taken.");
    }
  };

  return (
    <div id="wd-signup-screen" className="ms-5 mt-4">
      <h1>Signup</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        id="wd-username"
        placeholder="username"
        className="form-control mb-2"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        onClick={signup}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        Sign up
      </button>
      <Link
        id="wd-signin-link"
        to="/Kanbas/Account/Signin"
        className="d-block mt-2 text-primary"
      >
        Signin
      </Link>
    </div>
  );
}
