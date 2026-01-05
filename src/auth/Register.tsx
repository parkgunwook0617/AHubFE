import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [checkpassword, setCheckpassword] = useState('');
    const [checkIdCondition, setCheckIdCondition] = useState(true);
    const [checkPasswordCondition, setCheckPasswordCondition] = useState(true);
    const [checkMailCondition, setCheckMailCondition] = useState(true);
    const [isMailDuplicated, setIsMailDuplicated] = useState(false);
    const [revealMailDuplicatedAnnouncement, SetRevealMailDuplicatedAnnouncement] = useState(false);
    const [isIdUnique, setIsIdUnique] = useState(false);
    const [revealIdUnique, setRevealIdUnique] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [revealAuthCodeSendSuccess, setRevealAuthCodeSendSuccess] = useState(false);
    const [revealAuthCodeSendFail, setRevealAuthCodeSendFail] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const navigate = useNavigate();
    const timerRef = useRef<number | null>(null);

    const isInvalid = password !== checkpassword || password.length === 0 || checkPasswordCondition === false;

    const handleRegister = async () => {
        if (password !== checkpassword) {
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            id: id,
            password: password,
            email: mail
        });

        if (response.status === 201) {
            navigate('/login');
        }
    }

    const validateId = (id: string) => {
        const regex = /^[a-z0-9]{4,12}$/;

        if (!regex.test(id)) {
            return setCheckIdCondition(false);
        } else {
            return setCheckIdCondition(true);
        }
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

        if (!regex.test(password)) {
            setCheckPasswordCondition(false);
        } else {
            setCheckPasswordCondition(true);
        }
    };

    const validateMail = (mail: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(mail)) {
            setCheckMailCondition(false);
        } else {
            setCheckMailCondition(true);
        }
    };

    const checkMail = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/auth/checkEmail`, {
                params: { email: mail }
            });
            setIsMailDuplicated(true);
            SetRevealMailDuplicatedAnnouncement(false);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setIsMailDuplicated(false);
                    SetRevealMailDuplicatedAnnouncement(true);
                }
            }
        }
    }

    const checkId = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/auth/checkId`, {
                params: { id: id }
            })

            setIsIdUnique(true);
            setRevealIdUnique(false);
        } catch {
            setIsIdUnique(false);
            setRevealIdUnique(true);
        }
    }

    const mailAuth = async () => {
        if (isMailDuplicated === true) {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/mail/${mail}`);

                setTimeLeft(300);
                setIsTimerActive(true);
                setRevealAuthCodeSendSuccess(true);
                setRevealAuthCodeSendFail(false);
                setTimeout(() => {
                    setRevealAuthCodeSendSuccess(false);
                }, 4000)
            } catch {
                setRevealAuthCodeSendSuccess(false);
                setRevealAuthCodeSendFail(true);
            }
        }
    }

    const validateAuthCode = async () => {
        try {
            console.log(mail)
            console.log(authCode)
            await axios.post(`${import.meta.env.VITE_API_URL}/mail/validatemail`,
                null,
                {
                    params: {
                        email: mail,
                        authCode: authCode
                    }
                }
            )

            setIsAuthenticated(true);

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setIsAuthenticated(false);
                }
            }
        }
    }

    useEffect(() => {
        if (authCode.length > 0) {
            validateAuthCode();
        }
    }, [authCode]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isTimerActive, timeLeft]);

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center text-center gap-6">
                <div className="flex flex-col justify-center ml-auto mr-auto w-[90%] max-w-[500px] bg-white border border-zinc-200 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-8 text-zinc-800">회원가입</h1>
                    <div className="flex flex-col gap-4 text-left">
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">이메일</label>
                            <div className="flex gap-5">
                                <input
                                    className={`w-full ${isMailDuplicated ? 'bg-zinc-300' : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'} mt-1 border border-zinc-300 rounded-lg p-3 outline-none transition-all`}
                                    type="text"
                                    value={mail}
                                    readOnly={isMailDuplicated}
                                    onChange={e => { validateMail(e.target.value); setMail(e.target.value); }}
                                />
                                <button className={`w-[120px] ${isMailDuplicated ? 'bg-zinc-300' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} text-white font-semibold rounded-lg p-3 transition-all shadow-md`} onClick={checkMail} disabled={isMailDuplicated || !checkMailCondition || mail.length === 0}>중복확인</button>
                            </div>
                            {isMailDuplicated && (
                                <div className="text-green-600 font-semibold text-sm mt-1 pl-1">
                                    중복 검증되었습니다.
                                </div>
                            )}
                        </div>
                        {(checkMailCondition === false && (mail.length !== 0)) && (<div className="text-red-500 text-sm font-bold">메일 형식이 잘못되었습니다.</div>)}
                        {revealMailDuplicatedAnnouncement == true && (<div className="text-red-500 text-sm font-bold">이미 가입된 메일입니다.</div>)}
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">이메일 인증</label>
                            <div className="flex gap-5">
                                <input
                                    className={`w-full ${((!isMailDuplicated) || isAuthenticated) ? 'bg-zinc-300' : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'} mt-1 border border-zinc-300 rounded-lg p-3 outline-none transition-all`}
                                    type="text"
                                    value={authCode}
                                    readOnly={(!isMailDuplicated) || isAuthenticated}
                                    onChange={e => setAuthCode(e.target.value)}
                                />
                                <button className={`w-[170px] ${((!isMailDuplicated) || isAuthenticated) ? 'bg-zinc-300' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} text-white font-semibold rounded-lg p-3 transition-all shadow-md`} onClick={mailAuth} disabled={!isMailDuplicated || isAuthenticated}>인증번호 받기</button>
                            </div>
                            {revealAuthCodeSendSuccess === true && (
                                <div className="text-green-600 font-semibold text-sm">
                                    인증번호 발신되었습니다.
                                </div>)}
                            {revealAuthCodeSendFail === true && (
                                <div className="text-red-500 font-semibold text-sm">
                                    인증번호 발신실패했습니다.
                                </div>)
                            }
                            {isTimerActive && !isAuthenticated && (
                                <div className="text-red-500 font-medium text-sm">
                                    남은 시간: {formatTime(timeLeft)}
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="text-green-600 font-semibold text-sm mt-1 pl-1">
                                    인증 완료되었습니다.
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">아이디</label>
                            <div className="flex gap-5">
                                <input
                                    className={`w-full mt-1 border border-zinc-300  rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    type="text"
                                    value={id}
                                    onChange={e => { validateId(e.target.value); setId(e.target.value); setIsIdUnique(false); setRevealIdUnique(false); }}
                                />
                                <button className={`w-[120px] ${isIdUnique ? 'bg-zinc-300' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} text-white font-semibold rounded-lg p-3 transition-all shadow-md`} disabled={!checkIdCondition || id.length === 0} onClick={checkId}>중복확인</button>
                            </div>
                            {isIdUnique && (
                                <div className="text-green-600 font-semibold text-sm mt-1 pl-1">
                                    중복 검증되었습니다.
                                </div>
                            )}
                        </div>
                        {(checkIdCondition === false && (id.length !== 0)) && (<div className="text-red-500 text-sm font-bold">아이디는 4자 이상 12자 이하이며 영문소문자 또는 숫자로 구성되어야합니다.</div>)}
                        {revealIdUnique == true && (<div className="text-red-500 text-sm font-bold">이미 가입된 아이디입니다.</div>)}
                        <div>
                            <label className="text-sm font-medium text-zinc-600 ml-1">비밀번호</label>
                            <input
                                className="w-full mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                type="password"
                                value={password}
                                onChange={e => { validatePassword(e.target.value); setPassword(e.target.value) }}
                            />
                        </div>
                        {(checkPasswordCondition === false && (password.length !== 0)) && (<div className="text-red-500 text-sm font-bold">비밀번호는 8자 이상 15자 이하이며 영문, 숫자, 특수문자를 모두 포함해야합니다.</div>)}
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
                            className={`w-full ${(isInvalid || !isIdUnique || !isMailDuplicated || !isAuthenticated) ? 'bg-zinc-300' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-[0.98]'} text-white font-semibold rounded-lg p-3 mt-4 transition-all shadow-md`}
                            onClick={handleRegister}
                            disabled={isInvalid || !isIdUnique || !isMailDuplicated || !isAuthenticated}
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