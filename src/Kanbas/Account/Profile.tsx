import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import { RootState } from "../store";
import { User } from "../types";

export default function Profile() {
  const [profile, setProfile] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile as User);
      dispatch(setCurrentUser(updatedProfile));
    } catch (err) {
      console.error(err);
      setError("Unable to update profile. Please try again.");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    } catch (err) {
      console.error(err);
      setError("Unable to sign out. Please try again.");
    }
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="wd-profile-screen" className="ms-5 mt-4">
      <h1>Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {profile && (
        <div>
          <input
            value={profile.username || ""}
            id="wd-username"
            className="form-control mb-2"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            value={profile.password || ""}
            id="wd-password"
            className="form-control mb-2"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            value={profile.firstName || ""}
            id="wd-firstname"
            className="form-control mb-2"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            value={profile.lastName || ""}
            id="wd-lastname"
            className="form-control mb-2"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            value={profile.dob || ""}
            id="wd-dob"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <input
            value={profile.email || ""}
            id="wd-email"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            value={profile.role || "USER"}
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value as User["role"] })
            }
            className="form-control mb-2"
            id="wd-role"
          >
            <option value="USER">User</option>{" "}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            {" "}
            Update{" "}
          </button>

          <button
            onClick={signout}
            className="btn btn-danger w-100 mb-2"
            id="wd-signout-btn"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
