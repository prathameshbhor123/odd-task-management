import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInstance";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm();
  const navigate = useNavigate();

  const [hidePassword, setHidePassword] = useState(true);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup", data); // Update the API route as needed
      if (res.data.id) {
        alert("Signup successful");
        navigate("/loginpage");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Error during signup");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage:
          'url("https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png")',
      }}
    >
      <div className="w-full max-w-md bg-purple-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full p-2 border rounded outline-none"
            />
            {errors.name && touchedFields.name && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid name.
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
              className="w-full p-2 border rounded outline-none"
            />
            {errors.email && touchedFields.email && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email.
              </p>
            )}
          </div>

          {/* Uncomment this block if needed */}
          {/* <div>
            <input
              type="text"
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: true,
                pattern: /^((\+91-?)|0)?[0-9]{10}$/
              })}
              className="w-full p-2 border rounded outline-none"
            />
            {errors.mobileNumber && touchedFields.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid mobile number.</p>
            )}
          </div> */}

          <div className="relative">
            <input
              type={hidePassword ? "password" : "text"}
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full p-2 border rounded outline-none pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-sm"
            >
              {hidePassword ? "👁️‍🗨️" : "👁️"}
            </button>
            {errors.password && touchedFields.password && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid password.
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={hidePassword ? "password" : "text"}
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
              className="w-full p-2 border rounded outline-none pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-sm"
            >
              {hidePassword ? "👁️‍🗨️" : "👁️"}
            </button>
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Please confirm your password.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
