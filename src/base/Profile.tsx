import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Modal from 'react-modal';
import { useState } from "react";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [isResigning, setIsResigning] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const openPasswordModal = () => {
        setPasswordModalIsOpen(true);
    }

    const closePasswordModal = () => {
        setPasswordModalIsOpen(false);
    }


    const resignUser = async () => {
        try {
            setIsResigning(true);
            await axios.delete(`${import.meta.env.VITE_API_URL}/auth/resignUser`, {
                withCredentials: true
            });
            setIsResigning(false);
            navigate("/");
        } catch {
            setIsResigning(false);
            alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
        }
    }

    const checkUser = async (password: string) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/checkUser`,
                {
                    password: password
                },
                {
                    withCredentials: true
                }
            );

            setIsChecked(true);
        } catch {
            alert("유저 인증에 실패했습니다.");
        }
    }

    const changePassword = async (newpassword: string) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/auth/chagePassword`,
                {
                    password: newpassword
                },
                {
                    withCredentials: true
                });

            closePasswordModal();
        } catch {
            alert("비밀번호 변경에 실패했습니다.");
        }
    }

    return (
        <div className="flex flex-col h-screen">
            {isResigning ? (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">회원탈퇴 중...</div>) :
                (<div>
                    <NavBar />
                    <div className="flex flex-1 flex-col justify-center items-center gap-10 text-3xl h-screen">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/individuallist")}>등록 애니메이션 보기</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={openPasswordModal}>비밀번호 재설정</button>
                        <button className="px-4 py-2 bg-red-400 text-white rounded" onClick={openModal}>회원탈퇴</button>
                    </div>
                    <Modal isOpen={modalIsOpen} overlayClassName="fixed inset-0 bg-white flex items-center justify-center" className="p-8 rounded-2xl shadow-xl w-[90%] max-w-[400px] outline-none">
                        <div className="mb-5">
                            <div className="text-3xl font-sub">회원탈퇴</div>
                            <div className="text-gray-500 text-xl">정말로 탈퇴하시겠습니까?</div>
                        </div>
                        <div className="flex gap-10">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded font-bold" onClick={() => resignUser()}>확인</button>
                            <button className="px-4 py-2 bg-red-400 text-white rounded font-bold" onClick={() => closeModal()}>취소</button>
                        </div>
                    </Modal>
                    <Modal isOpen={passwordModalIsOpen} overlayClassName="fixed inset-0 bg-white flex items-center justify-center" className="p-8 rounded-2xl shadow-xl w-[90%] max-w-[400px] outline-none">
                        <div className="mb-5">
                            <div className="text-3xl font-sub">비밀번호 변경</div>
                            {isChecked ?
                                <div>
                                    <div className="text-gray-500 text-xl">새 비밀번호를 입력해주세요.</div>
                                    <input
                                        className="w-full mt-5 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                    <div className="text-gray-500 text-xl mt-5">비밀번호 확인</div>
                                    <input
                                        className="w-full mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        type="password"
                                        value={checkPassword}
                                        onChange={e => setCheckPassword(e.target.value)}
                                    />
                                    {newPassword !== checkPassword && newPassword.length > 0 && checkPassword.length > 0 && (
                                        <div className="text-red-500 text-sm font-bold mt-1">
                                            비밀번호가 일치하지 않습니다.
                                        </div>
                                    )}
                                    <div className="flex gap-10 mt-5">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded font-bold" onClick={() => changePassword(newPassword)}>확인</button>
                                        <button className="px-4 py-2 bg-red-400 text-white rounded font-bold" onClick={() => { setIsChecked(false); setNewPassword(""); setCheckPassword(""); closePasswordModal() }}>취소</button>
                                    </div>
                                </div>
                                : <div>
                                    <div className="text-gray-500 text-xl">현재 비밀번호를 입력해주세요.</div>
                                    <input
                                        className="w-full mt-5 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        type="password"
                                        onChange={e => setOldPassword(e.target.value)}
                                    />
                                    <div className="flex gap-10 mt-5">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded font-bold" onClick={() => checkUser(oldPassword)}>확인</button>
                                        <button className="px-4 py-2 bg-red-400 text-white rounded font-bold" onClick={() => closePasswordModal()}>취소</button>
                                    </div>
                                </div>}
                        </div>
                    </Modal>
                </div>)
            }
        </div>
    );
};

export default Profile;