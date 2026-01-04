const MainPage = () => {

    return (
        <div>
            <nav className="p-5 border-b-2">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">AHub</div>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Home</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Profile</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Settings</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MainPage;