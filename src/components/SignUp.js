import React, { useState } from "react";
import logo from "./logo.svg";
import "./logo.css";
import { Link, useHistory } from "react-router-dom";
const fetch = require("node-fetch");

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" || email !== "" || password !== "" || confirm !== "") {
      if (password !== confirm) {
        setError("Password and Confirm Password are different!");
      } else {
        let body = {
          username: username,
          email: email,
          password: password,
        };
        fetch("http://localhost:5000/signup", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then(function (json) {
            if (json.success === "") {
              setError(json.message);
            } else {
              history.push("/");
            }
          });
      }
    } else {
      setError("Please fill all fields.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center w-full rounded-xl shadow-xl px-6 bg-white dark:bg-gray-700 lg:max-w-full lg:px-16 xl:px-12">
        <div className="w-full h-100">
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="mb-4 mt-3 font-medium text-gray-900 title-font md:mb-0"
            >
              <h2 className="text-lg font-bold  text-black dark:text-gray-100 uppercase transition duration-500 ease-in-out transform hover:text-gray-300">
                <img src={logo} alt="logo" className="logo" />
              </h2>
            </Link>
          </div>
          <h1 className="mt-12 text-2xl font-semibold text-center text-black dark:text-gray-100 tracking-ringtighter sm:text-3xl title-font">
            Create an account
          </h1>
          {error && (
            <div className="text-white px-3 py-3 border-0 rounded relative mb-4 bg-red-500">
              <span>{error}</span>
              <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-6 outline-none focus:outline-none"
                onClick={() => setError("")}
              >
                <span>×</span>
              </button>
            </div>
          )}
          <form className="mt-6">
            <div>
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                User Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="User Name"
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                autoFocus
                autoComplete="true"
                required
                onChange={(e) => setUsername(e.target.value.trim())}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                autoComplete="true"
                required
                onChange={(e) => setMail(e.target.value.trim())}
              />
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap mt-4 mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label className="text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-100">
                    Password
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-gray-500"
                    type="password"
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value.trim())}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label className="text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-100">
                    Confirm
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-gray-500 "
                    type="password"
                    placeholder="Confirm"
                    onChange={(e) => setConfirm(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
            >
              Register
            </button>
          </form>
          <hr className="w-full my-6 border-gray-300" />
          <p className="mt-8 mb-8 text-center dark:text-gray-100">
            Do you have account?
            <Link
              to="/"
              className="font-semibold ml-2 text-blue-500 dark:text-gray-100 rounded-md hover:text-blue-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
