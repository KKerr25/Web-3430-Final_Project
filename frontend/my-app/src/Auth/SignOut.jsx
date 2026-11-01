import "../stylesheets/forms/SignOutForm.css";
import { signOut } from "./AuthService.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AuthContext.jsx";

function SignOutForm() {
  const { setProfile, setAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(setProfile, setAuthenticated, navigate);
  };

  return (
    <div className="signout-container">
      <div className="signout-card">
        <h1>Sign Out</h1>

        <p>Are you sure you want to sign out?</p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SignOutForm;
