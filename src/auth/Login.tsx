import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signIn`, {
            id: id,
            password: password,
        });

        if (response.status === 200) {
            navigate('/mainpage');
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center text-center gap-6">
                <div className="flex flex-col justify-center ml-auto mr-auto w-[90%] max-w-[400px] bg-white border border-zinc-200 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-8 text-zinc-800">로그인</h1>
                    <div className="flex flex-col gap-4 text-left">
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">아이디</label>
                            <input
                                className="w-full mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                type="text"
                                value={id}
                                onChange={e => setId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">비밀번호</label>
                            <input
                                className="w-full mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white font-semibold rounded-lg p-3 mt-4 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md cursor-pointer"
                            onClick={handleLogin}
                        >
                            로그인
                        </button>
                    </div>
                </div>
                <div className="flex justify-center gap-2 text-sm text-zinc-500">
                    <span>계정이 없으신가요?</span>
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;