import { toast } from "react-toastify";

const signIn = (data, setProfile, setAuthenticated, navigate) => {
  fetch("api/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // following line instructs browser to send the token along with every request:
    credentials: "same-origin",
    body: JSON.stringify(data),
  })
    .then((response) => {
      // if (!response.ok) throw Error('Failed to sign in')
      console.log(response);
      return response.json();
    })
    .then((response) => {
      if (response.success === true) {
        toast(response.message, {
          autoClose: 500,
          onClose: () => {
            setProfile(response.user);
            setAuthenticated(true);
            navigate("/dashboard");
          },
        });
      } else {
        toast(response.message, {
          autoClose: 3000,
        });
      }
    })
    .catch((error) => {
      toast("An unknown error occurred during sign in", {
        onClose: () => {
          navigate("/errorapi");
        },
      });
    });
};

const signOut = (setProfile, setAuthenticated, navigate) => {
  fetch("api/users/signout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((response) => {
      if (!response.ok) throw Error("Failed to sign out");

      toast("Successfully signed out.", {
        autoClose: 500,
        onClose: () => {
          setProfile(null);
          setAuthenticated(false);
          navigate("/");
        },
      });
    })
    .catch((error) => {
      console.error(error);
      toast("An unknown error occurred during sign out", {
        onClose: () => navigate("/errorapi"),
      });
    });
};

export { signIn, signOut };
