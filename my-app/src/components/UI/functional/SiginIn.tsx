import {FormEvent, useState} from "react";
import Text from "@components/UI/styled/Text.tsx";
import apiClient from "../../../utils/ApiClient.ts";
import {SignInResponse} from "@interfaces/AuthResponse.ts";
// @ts-ignore
import Cookies from "js-cookie"
import {Link} from "react-router";

export default function LoginModal({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        // TODO: Add real authentication logic here
        const response = await apiClient.post<SignInResponse>("/users/signin", {email, password});

        if (!response.user) {
            setError("Invalid credentials.");
            return;
        }
        Cookies.set("user_id", response.user._id, {expires: 7}); // Expires in 7 days

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-accent/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
                    ×
                </button>

                <Text className="text-xl font-semibold mb-4" color={"text-black"}>Sign In</Text>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    {error && <Text className="text-sm" color={"text-red-500"}>{error}</Text>}
                    <Link to={"/signup"}>
                        <Text className={"underline"} color={"text-blue-500"}>No account? Sign Up</Text>
                    </Link>
                    <button
                        type="submit"
                        className="w-full mt-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        <Text className="text-white font-medium">Login</Text>
                    </button>
                </form>
            </div>
        </div>
    );
}
