import React from "react";
import { GoogleLogin } from "react-google-login";

// Your client ID from the Google Developer Console
const CLIENT_ID = "1069972411513-a6mupevejevbbcdi4560pqhcsda295se.apps.googleusercontent.com";

function LoginScreen({ onLoginSuccess }) {
    const onSuccess = (response) => {
        console.log("Login Success, full response:", response);
        onLoginSuccess(response.profileObj);
      };
      

  const onFailure = (response) => {
    console.error("Login Failed:", response);
  };

  return (
    <div>
      <h2>Login to Timesheet App</h2>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        // isSignedIn={true}
      />
    </div>
  );
}

export default LoginScreen;
