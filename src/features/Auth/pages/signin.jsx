import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { SignInWith } from "../functions/signIn-with";
import googleLogo from "../../../assets/icons/google.png";
import "./style.css";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Google = new GoogleAuthProvider();

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const promise = await SignInWith.Email(email, password);
      promise && navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function signinHandler(event, provider) {
    event.preventDefault();
    try {
      await SignInWith.Provider(provider);
    } catch (error) {
      console.log(`At login page: ${error}`);
    }
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="card">
            <div className="card_title">
              <h1>Sign In</h1>
              <span>
                Don't have an account?{" "}
                <p onClick={() => navigate("/signup")}>Sign up</p>
              </span>
            </div>
            <div className="form">
              <form onSubmit={submitHandler}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onSubmit={submitHandler}
                  style={
                    loading ? { opacity: "0.5", pointerEvents: "none" } : {}
                  }
                >
                  {loading ? `Signing in` : "Sign in"}
                </button>
              </form>
              <button
                className="signIn-google"
                onClick={(e) => signinHandler(e, Google)}
              >
                <img src={googleLogo} alt="sign in with google" />
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
