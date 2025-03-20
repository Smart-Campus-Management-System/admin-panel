import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import axios from "axios";

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            accountType: "Admin",
        };

        try {
            setLoading(true);
            setError(null);
            await axios.post("http://localhost:4000/api/v1/auth/signup", payload);
            setSuccessMessage("Signup successful! Redirecting to home...");
            setTimeout(() => {
                setSuccessMessage(null);
                navigate("/");
            }, 2500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred during signup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}>

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r"
                 style={{ background: "linear-gradient(135deg, #121212, #00bcd4)" }}>
                <div className="w-full max-w-lg bg-richblack-800 p-8 rounded-xl shadow-xl hover:shadow-2xl duration-500 mt-20">
                    <h1 className="text-3xl font-semibold mb-8 text-center text-richblack-5">
                        Admin Registration
                    </h1>

                    {successMessage && (
                        <div className="bg-green-500 text-white p-3 rounded-md mb-4">
                            {successMessage}
                        </div>
                    )}

                    <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
                        <div className="flex gap-x-4">
                            <label className="w-full">
                                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className="text-pink-200">*</sup></p>
                                <input
                                    required
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg p-[14px] border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </label>
                            <label className="w-full">
                                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name <sup className="text-pink-200">*</sup></p>
                                <input
                                    required
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg p-[14px] border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </label>
                        </div>
                        <label className="w-full">
                            <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email <sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg p-[14px] border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            />
                        </label>
                        <label className="w-full">
                            <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">Username <sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full rounded-lg p-[14px] border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            />
                        </label>
                        <label className="w-full">
                            <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg p-[14px] border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            />
                        </label>
                        <label className="w-full">
                            <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg p-[14px] border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            />
                        </label>
                        <button
                            type="submit"
                            className="bg-yellow-400 py-3 px-6 text-black text-lg rounded-lg font-semibold hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all mt-6"
                        >
                            {loading ? "Submitting..." : "Sign Up"}
                        </button>
                        {error && (
                            <div className="bg-red-500 text-white p-3 rounded-md">
                                {error}
                            </div>
                        )}
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-richblack-5">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/")}
                                className="text-yellow-200 font-semibold hover:underline"
                            >
                                Log in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
