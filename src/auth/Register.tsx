import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [checkpassword, setCheckpassword] = useState('');

    const handleRegister = async () => {
        if (password !== checkpassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            id: id,
            password: password,
        });

        if (response.status === 201) {
            alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center text-center gap-10">
                <div className="flex flex-col justify-center align-center ml-auto mr-auto text-center gap-10 w-[50%] border-1 p-5 rounded-lg">
                    <div className="text-3xl">아이디</div>
                    <input className="border-1 rounded-lg" type="text" value={id} onChange={e => setId(e.target.value)}></input>
                    <div className="text-3xl">비밀번호</div>
                    <input className="border-1 rounded-lg" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <div className="text-3xl">비밀번호 확인</div>
                    <input className="border-1 rounded-lg" type="password" value={checkpassword} onChange={e => setCheckpassword(e.target.value)}></input>
                    {password !== checkpassword && checkpassword.length !== 0 && <div className="text-red-500">비밀번호가 일치하지 않습니다.</div>}
                    <button className="border-1 rounded-lg p-2 text-3xl mt-5" onClick={handleRegister}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default Register;