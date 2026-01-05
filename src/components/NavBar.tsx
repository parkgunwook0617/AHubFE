import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="p-5 border-b-2">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold font-sub" onClick={() => navigate('/mainpage')}>AHub</div>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/search')}>Search</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/profile')}>Profile</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;