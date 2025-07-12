import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);
        
        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex-3 bg-[#6f00c4] flex items-center justify-center overflow-hidden">
                <img src="/login-bg.png" alt="" width={800}/>
            </div>
            <div className="flex-2 font-mono font-bold flex flex-col bg-gray-200 text-black items-center justify-center">
            <h2 className="text-[4vw]">&lt;Register/&gt;</h2>
            <form onSubmit={handleSubmit} className="flex font-mono flex-col gap-3 mt-5">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-4 w-[450px] border rounded text-2xl"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-4 w-[450px] border rounded text-2xl"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-4 w-[450px] border rounded text-2xl"
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-[#8f00ff] text-white text-2xl p-2 text-center rounded-[10px] cursor-pointer flex items-center justify-center gap-2">
                    Register {loading && <Loader size={15} className="animate-spin"/>}
                </button>
                <p>Already have an account? <Link to={'/login'} className="underline">Login</Link></p>
            </form>
            </div>
        </div>
    );
};

export default Register;
