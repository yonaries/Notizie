import React, { Component } from "react";
import SignIn from "./features/Auth/pages/signin";
import SignUp from "./features/Auth/pages/signup";
import AuthProvider from "./context/AuthContext";
import Dashboard from "./Dashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    );
  }
}

export default App;
