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
            alert('로그인에 성공했습니다.');
            navigate('/main');
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
                    <button className="border-1 rounded-lg p-2 text-3xl mt-5" onClick={handleLogin}>로그인</button>
                </div >
                <div>
                    <div className="text-center">계정이 없으신가요?</div>
                    <Link to="/register">회원가입하러 가기</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;