import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Auth/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/Users.css";

export default function Users() {
  let { authenticated, users, setUsers, roles, setRoles } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [DBUpdated, setDBUpdated] = useState(false);

  useEffect(() => {
    fetch("api/users", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          navigate("/errorapi");
        } else {
          setUsers(resp);
          setDBUpdated(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/errorapi");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DBUpdated]);

  useEffect(() => {
    fetch("api/roles", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          navigate("/errorapi");
        } else {
          setRoles(resp);
          setDBUpdated(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/errorapi");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DBUpdated]);

  // The following test isn't strictly needed since the API is protected.
  if (!authenticated) {
    document.location = "/signin";
    return <></>;
  }

  const deleteMe = (param) => {
    let url = "api/users/" + param;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        // Since the delete was successful on the backend change the DBUpdated var.
        // Since SetEffect is watching for a change to this var, the change will
        // alert SetEffect to run again.
        if (resp.success === false) {
          navigate("/errorapi");
        } else {
          setDBUpdated("changed");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/errorapi");
      });
  };

  return (
    <div className="react-stuff users-component table-responsive">
      <h1>Users</h1>
      <div className="table-header">
        <Link to="/admin/users/new" state={{ is_new: true }}>
          <button className="btn btn-primary">Create User</button>{" "}
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>_id</td>
            <td>First Name</td>
            <td>Last name</td>
            <td>Username</td>
            <td>Email</td>
            <td>Roles</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.roles.map((role) => (
                  <span key={role._id} className="badge bg-secondary">
                    {role.name}
                  </span>
                ))}
              </td>
              <td>
                <Link
                  to={`/admin/users/${user._id}/edit`}
                  state={{ is_new: false }}
                >
                  <button className="btn btn-sm btn-outline-primary">
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteMe(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
