import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [checkpassword, setCheckpassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== checkpassword) {
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            id: id,
            password: password,
        });

        if (response.status === 201) {
            navigate('/login');
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center text-center gap-6">
                <div className="flex flex-col justify-center ml-auto mr-auto w-[90%] max-w-[400px] bg-white border border-zinc-200 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-8 text-zinc-800">회원가입</h1>
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
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">비밀번호 확인</label>
                            <input
                                className="w-full mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                type="password"
                                value={checkpassword}
                                onChange={e => setCheckpassword(e.target.value)}
                            />
                        </div>
                        {password !== checkpassword && checkpassword.length > 0 && password.length > 0 && (
                            <div className="text-red-500 text-sm font-bold">비밀번호가 일치하지 않습니다.</div>)}

                        <button
                            className="w-full bg-blue-600 text-white font-semibold rounded-lg p-3 mt-4 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md cursor-pointer"
                            onClick={handleRegister}
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;