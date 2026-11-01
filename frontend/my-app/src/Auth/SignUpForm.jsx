//222 add a SignUpForm component here. you will need a fetch to submit the form
//this fetch  should talk to the backend api:  "api/users/register"
//you can check routes.js on the backend to verify the method for the fetch
//eg get, post, put or delete
//your form needs to perform field validations.  I recommend using react hook form
import "../stylesheets/forms/SignUpForm.css";
import Dev from "../Dev.jsx";
import { AppContext } from "./AuthContext.jsx";

export default function SignUpForm() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Sign Up</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>{" "}
      </div>
    </div>
  );
}
