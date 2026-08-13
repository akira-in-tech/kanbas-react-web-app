import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { User } from "../types";
import axios from "axios";

export default function Signin() {
  const [credentials, setCredentials] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    setSubmitting(true);
    setError("");
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (err) {
      setError(
        axios.isAxiosError(err) && !err.response
          ? "The learning service is temporarily unavailable. Please try again."
          : "Invalid username or password."
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form
      id="wd-signin-screen"
      onSubmit={(event) => {
        event.preventDefault();
        void signin();
      }}
    >
      <h1>Sign in</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <label htmlFor="wd-username" className="form-label">
        Username
      </label>
      <input
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
        name="username"
        autoComplete="username"
        required
      />
      <label htmlFor="wd-password" className="form-label">
        Password
      </label>
      <input
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        {" "}
        Sign up{" "}
      </Link>
    </form>
  );
}
