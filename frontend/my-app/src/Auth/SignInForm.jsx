//111 Create SignInForm Here.  Use React Hook Form For Validations and Form Handling
// Submit form to server as modelled in the Dev component.
import "../stylesheets/forms/SignInForm.css";
import { signIn } from "./AuthService.jsx";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AuthContext.jsx";

function SignInForm({ onSignIn }) {
  const { register, handleSubmit } = useForm();

  const { setProfile, setAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Sign In</h1>
        <form
          onSubmit={handleSubmit((data) => {
            console.log("Form data:", data);
            signIn(data, setProfile, setAuthenticated, navigate);
          })}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...register("username", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", { required: true })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
