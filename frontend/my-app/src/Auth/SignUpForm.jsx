//222 add a SignUpForm component here. you will need a fetch to submit the form
//this fetch  should talk to the backend api:  "api/users/register"
//you can check routes.js on the backend to verify the method for the fetch
//eg get, post, put or delete
//your form needs to perform field validations.  I recommend using react hook form
import "../stylesheets/forms/SignUpForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AuthContext.jsx";
import { signIn } from "./AuthService.jsx";

export function Vhelp({ message, touchedField }) {
  return <p className="help">{message}</p>;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const { setProfile, setAuthenticated } = useContext(AppContext);

  let { uid } = useParams();
  let is_new = uid === undefined;

  let { users, roles } = useContext(AppContext);

  let user = uid ? users.find((u) => u._id === uid) : {};

  //user.roles is an array of objects, this converts to array of role._ids

  const roleids = user.roles?.map((element) => element._id) || [];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      roles: roleids,
    },
  });

  const onSubmit = (data) => {
    const payload = { ...data };

    // Only keep password if the user typed a non-empty one AND actually touched the field
    const userTypedNewPwd =
      dirtyFields?.password &&
      typeof data.password === "string" &&
      data.password.trim().length > 0;

    if (!userTypedNewPwd) {
      delete payload.password; // ← prevents overwriting the existing hash
    } else {
      payload.password = data.password.trim();
    }

    fetch(is_new ? "api/users/register" : `api/users/${user._id}`, {
      method: is_new ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.success === false && response.errorCode === 11000) {
          setError(response.field, {
            type: "manual",
            message: response.message,
          });
        } else if (response.success === false) {
          toast(response.message, {
            autoClose: 5000,
            onClose: () => {
              navigate("/errorapi");
            },
          });
        } else {
          if (is_new) {
            signIn(data, setProfile, setAuthenticated, navigate);
          } else {
            toast(response.message, {
              autoClose: 1000,
              onClose: () => {
                navigate("/admin/users");
              },
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast("User create/edit failed", {
          onClose: () => {
            navigate("/errorapi");
          },
        });
      });
  };

  let title = "Register";

  return (
    <div className="react-stuff form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{title}</h1>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <div className="control">
            <input
              type="text"
              name="firstName"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <Vhelp message={errors.firstName.message} />}
          </div>
        </div>

        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <div className="control">
            <input
              type="text"
              name="lastName"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <Vhelp message={errors.lastName.message} />}
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="control">
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && <Vhelp message={errors.email.message} />}
          </div>
        </div>

        <div className="field">
          <label htmlFor="username">Username</label>
          <div className="control">
            <input
              type="text"
              name="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <Vhelp message={errors.username.message} />}
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="control">
            <input
              type="password"
              name="password"
              {...register("password", {
                required: is_new ? "Password is required" : false,
              })}
              {...register("password", {
                required: is_new ? "Password is required" : false,
                minLength: is_new
                  ? {
                      value: 3,
                      message: "Password must be at least 3 characters",
                    }
                  : undefined,
              })}
            />
            {errors.password && <Vhelp message={errors.password.message} />}
          </div>
        </div>

        <div className="field">
          <label></label>
          <div className="control">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
