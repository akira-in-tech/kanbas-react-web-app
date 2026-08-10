import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";
import { User } from "../types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { uid } = useParams();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setUsers(users);
    } catch (err) {
      console.error(err);
      setError("Unable to load users. Please try again.");
    }
  };

  const createUser = async () => {
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers([...users, user]);
    } catch (err) {
      console.error(err);
      setError("Unable to create user. Please try again.");
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    try {
      if (name) {
        const users = await client.findUsersByPartialName(name);
        setUsers(users);
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      setError("Unable to search users. Please try again.");
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    try {
      if (role) {
        const users = await client.findUsersByRole(role);
        setUsers(users);
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      setError("Unable to filter users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);
  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>
      <input
        onChange={(e) => filterUsersByName(e.target.value)}
        value={name}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name"
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>{" "}
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>{" "}
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} />
    </div>
  );
}
