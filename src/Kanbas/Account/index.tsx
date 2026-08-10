import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Users from "./Users";
import { RootState } from "../store";
export default function Account() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={
                      currentUser
                        ? "/Kanbas/Account/Profile"
                        : "/Kanbas/Account/Signin"
                    }
                  />
                }
              />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
              <Route
                path="/Users"
                element={
                  currentUser?.role === "ADMIN" ? (
                    <Users />
                  ) : (
                    <Navigate to="/Kanbas/Account/Profile" />
                  )
                }
              />
              <Route
                path="/Users/:uid"
                element={
                  currentUser?.role === "ADMIN" ? (
                    <Users />
                  ) : (
                    <Navigate to="/Kanbas/Account/Profile" />
                  )
                }
              />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
