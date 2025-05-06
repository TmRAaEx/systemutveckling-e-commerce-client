import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import Text from "@components/UI/styled/Text.tsx";
// @ts-ignore
import Cookies from "js-cookie";
import {Link} from "react-router";
import apiClient from "../utils/ApiClient.ts";

interface SignUpResponse {
    username: string;
    email: string;
    _id: string;
}

export default function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const loggedIn = Cookies.get("user_id");
        if (loggedIn) navigate("/store");
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !confirmPass) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPass) {
            setError("Passwords don't match");
            return
        }

        setError("");

        try {
            const user = await apiClient.post<SignUpResponse>("/users/create", {
                username: `${firstName} ${lastName}`,
                email,
                password,
            });

            if (!user) {
                setError("Registration failed. Please try again.");
                return;
            }

            Cookies.set("user_id", user._id, {expires: 7});
            navigate("/store"); // Redirect to home or dashboard
        } catch (err) {
            setError("An error occurred during registration.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-accent/10 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <Text className="text-2xl font-bold mb-4" color={"text-black"}>Create Account</Text>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>

                    {error && <Text className="text-sm" color={"text-red-500"}>{error}</Text>}

                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        <Text className="text-white font-medium">Sign Up</Text>
                    </button>

                    <div className="text-center mt-2">
                        <Link to="/store">
                            <Text className="underline" color={"text-blue-500"}>Already have an account? Browse our
                                store and
                                login on checkout</Text>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
