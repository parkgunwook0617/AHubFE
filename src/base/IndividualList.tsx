import axios from "axios";
import NavBar from "../components/NavBar";
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

const IndividualList = () => {
    const [individualList, setIndividualList] = useState<AnimeItem[]>([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [isLoaded, setIsLoaded] = useState(true);
    const limit = 10;

    const collectIndividualList = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getFavorite`, {
                withCredentials: true
            });
            setIndividualList(response.data);
            setNumPages(Math.ceil(response.data.length / limit));
            setIsLoaded(false);
        } catch {
            alert("개인 리스트를 불러오는 도중 오류가 발생했습니다.");
        }
    }

    const offset = (page - 1) * limit;
    const currentPageData = individualList.slice(offset, offset + limit);

    useEffect(() => {
        collectIndividualList();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            {isLoaded === false ? (
                <div className="flex flex-1 justify-center">
                    {individualList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-10">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-3xl font-bold text-gray-800">등록한 애니메이션이 없습니다.</div>
                                <div className="text-2xl text-gray-500 mt-2">좋아하는 작품을 추가하여 나만의 목록을 만들어보세요!</div>
                            </div>
                            <Link
                                to="/search"
                                className="mt-20 px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
                            >
                                애니메이션 둘러보기
                            </Link>
                        </div>
                    ) :
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
                            <Pagination
                                page={page}
                                numPages={numPages}
                                setPage={setPage}
                            />
                        </main>
                    }
                </div>
            ) : (<div className="flex justify-center items-center h-96">
                <div className="text-gray-500">Loading...</div>
            </div>)}
        </div>
    );
};

export default IndividualList;