import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

interface AnimeItem {
    title: string;
    keyVisual: string;
    genreList: string[];
    releaseYear: number[];
    releaseQuarter: number[];
}

const MainPage = () => {
    const [data, setData] = useState<AnimeItem[]>([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const limit = 10;

    const getAllAnimeInformation = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/findAll`);
            setNumPages(Math.ceil(response.data.length / limit));
            setData(response.data);
            setIsLoaded(true);
        } catch {

        }
    }

    useEffect(() => {
        getAllAnimeInformation();
    }, []);

    const offset = (page - 1) * limit;
    const currentPageData = data.slice(offset, offset + limit);

    return (
        <div className="h-screen">
            <nav className="p-5 border-b-2">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold font-sub">AHub</div>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Profile</button>
                    </div>
                </div>
            </nav>
            {!isLoaded && (
                <div className="flex justify-center items-center h-96">
                    <div className="text-gray-500">Loading...</div>
                </div>
            )}
            <main className="flex-grow p-10 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-5 gap-6">
                    {currentPageData.map((item, index) => (
                        <Link to={`/detail/${encodeURIComponent(item.title)}`} key={index}>
                            <div key={index} className="aspect-[3/4] bg-white border rounded-lg shadow-md flex items-center justify-center text-center hover:scale-105 transition-transform cursor-pointer">
                                <img src={item.keyVisual} alt={item.title} className="w-full h-full object-contain overflow-hidden" />
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            {isLoaded && (
                <Pagination
                    page={page}
                    numPages={numPages}
                    setPage={setPage}
                />
            )}
        </div>
    );
};

export default MainPage;