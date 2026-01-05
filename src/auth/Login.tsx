import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Modal from 'react-modal';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [isLoginFail, setIsLoginFail] = useState(false);
    const navigate = useNavigate();
    const { checkAuth } = useAuthStore();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEmailUnregistered, setIsEmailUnregistered] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signIn`, {
                id: id,
                password: password,
            },
                {
                    withCredentials: true,
                });

            if (response.status === 200) {
                await checkAuth();
                navigate('/mainpage');
            }
        } catch {
            setIsLoginFail(true);
            setTimeout(() => {
                setIsLoginFail(false);
            }, 3000);
        }
    }

    const resetPassword = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/mail/reset-password-request`,
                null,
                {
                    params: {
                        email: mail
                    }
                });
            setIsEmailUnregistered(false);

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setIsEmailUnregistered(true);

                    setTimeout(() => {
                        setIsEmailUnregistered(false);
                    }, 2000);
                }
            }
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center text-center gap-6">
                <div className="flex flex-col justify-center ml-auto mr-auto w-[90%] max-w-[400px] bg-white border border-zinc-200 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-8 text-zinc-800">로그인</h1>
                    {isLoginFail === true && (
                        <div className="text-red-500 text-sm font-bold">아이디 또는 비밀번호가 틀렸습니다.</div>)
                    }
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
                <div className="flex justify-center gap-2 text-sm text-zinc-500">
                    <span>비밀번호를 잊으셨나요?</span>
                    <button className="text-blue-600 font-semibold hover:underline" onClick={() => openModal()}>비밀번호 초기화</button>
                </div>
                <Modal isOpen={modalIsOpen} overlayClassName="fixed inset-0 bg-white flex items-center justify-center" className="p-8 rounded-2xl shadow-xl w-[90%] max-w-[450px] outline-none">
                    <div className="mb-5">
                        <div className="text-3xl font-sub">비밀번호 초기화</div>
                        <div className="text-gray-500 text-xl">초기화할 계정의 이메일을 입력해 주세요.</div>
                        <input
                            className="w-full mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            type="text"
                            value={mail}
                            onChange={e => setMail(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-10">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded font-bold" onClick={() => resetPassword()}>확인</button>
                        <button className="px-4 py-2 bg-red-400 text-white rounded font-bold" onClick={() => closeModal()}>취소</button>
                    </div>
                    {isEmailUnregistered == true && (<div className="text-red-500 text-sm font-bold">가입되지 않은 메일입니다.</div>)}
                </Modal>
            </div>
        </div>
    );
};

export default Login;