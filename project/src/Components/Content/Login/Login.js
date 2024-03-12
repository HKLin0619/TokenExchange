import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./LoginStyle.css";

function LoginSignUpContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    if (savedPassword) {
      setPassword(savedPassword);
    }
    if (savedRememberMe) {
      setRememberMe(savedRememberMe === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const successParam = queryParams.get("success");

    if (successParam === "true") {
      toast.success("Register Successfully !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [location.search]);

  const handleLogin = async () => {
    let ethereumAddress;

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      // Check if MetaMask is connected
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length === 0) {
        // MetaMask is not connected, prompt user to connect
        toast.error("Please connect MetaMask and login to your account.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      // Get the first Ethereum address from MetaMask
      ethereumAddress = accounts[0];
    } catch (err) {
      console.error(err.message);
    }
  } else {
    // MetaMask is not installed
    toast.error("Please install MetaMask and login to your account.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  }

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }), // Send username and password
  });

    const data = await response.json();

    console.log(ethereumAddress);

    if (!username && !password) {
      toast.error("Enter username and password !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      if (data.success) {
        const userData = data.userData;
        localStorage.setItem("userData", JSON.stringify(userData));
        const nextPage = `/${userData.userType}dashboard`;
        navigate(nextPage);
      } else {
        if (data.errorType === "username") {
          toast.error("Your username is incorrect !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setUsername("");
          setPassword("");
        } else if (data.errorType === "password") {
          toast.error("Your password is incorrect !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setPassword("");
        } else {
          toast.error("Login failed !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setUsername("");
          setPassword("");
        }
      }
    }

    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };

  return (
    <div className="login-main">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="login-sub-main">
        <div className="login-title">
          <h1>ERC 20 Token Exchange</h1>
          <div className="login-underline"></div>
        </div>

        <div className="login-inputs">
          <div className="login-input">
            <i className="fa-solid fa-user" />
            <input
              type="text"
              placeholder="Username"
              className="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-input">
            <i className="fa-solid fa-lock" />
            <input
              type="password"
              placeholder="Password"
              className="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="login-forgot-remember">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <a href="/">Forgot password ?</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="sign-in">
          <p>
            Don't have an account ?{" "}
            <a href="/signup" className="sign-up-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpContent;