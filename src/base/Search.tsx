import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import NavBar from "../components/NavBar";

interface AnimeItem {
    title: string;
    keyVisual: string;
    genreList: string[];
    releaseYear: number[];
    releaseQuarter: number[];
}

const Search = () => {
    const [data, setData] = useState<AnimeItem[]>([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const limit = 10;
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchGenre, setSearchGenre] = useState("");

    const [searchMethod, searchSetMethod] = useState("title");
    const [searchYear, setSearchYear] = useState("");

    const handleSearchMethod = (method: string) => {
        setData([]);
        if (method === "title") {
            searchSetMethod("title");
        } else if (method === "genre") {
            searchSetMethod("genre");
        } else if (method === "date") {
            searchSetMethod("date");
        }
    }

    const getTargetAnimationInformation = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/findAllByTitle`, {
                params: {
                    title: searchKeyword
                }
            });
            setNumPages(Math.ceil(response.data.length / limit));
            setData(response.data);
            setIsLoaded(true);
        } catch {

        }
    }

    useEffect(() => {
        if (searchKeyword.length !== 0) {
            getTargetAnimationInformation();
        } else {
            setData([]);
        }
    }, [searchKeyword]);

    useEffect(() => {
        if (searchGenre.length !== 0) {
            const getTargetAnimationByGenre = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/findAllByGenre`, {
                        params: {
                            genre: searchGenre
                        }
                    });
                    setNumPages(Math.ceil(response.data.length / limit));
                    setData(response.data);
                    setIsLoaded(true);
                } catch {

                }
            }
            getTargetAnimationByGenre();
        } else {
            setData([]);
        }
    }, [searchGenre]);

    useEffect(() => {
        if (true) {
            const getTargetAnimationByDate = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/findAllByReleaseYear`, {
                        params: {
                            releaseYear: searchYear,
                        }
                    });
                    console.log(response.data)
                    setNumPages(Math.ceil(response.data.length / limit));
                    setData(response.data);
                    setIsLoaded(true);
                } catch {

                }
            }
            getTargetAnimationByDate();
        } else {
        }
    }, [searchYear]);

    useEffect(() => {
        searchSetMethod("title");
    }, [])


    const offset = (page - 1) * limit;
    const currentPageData = data.slice(offset, offset + limit);

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center text-xl font-sub mt-10">
                <div className="mb-5">검색방식</div>
                <div className="flex gap-10">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all cursor-pointer" onClick={() => handleSearchMethod("genre")}>장르</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all cursor-pointer" onClick={() => handleSearchMethod("date")}>상영년도</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all cursor-pointer" onClick={() => handleSearchMethod("title")}>제목</button>
                </div>
            </div>
            {searchMethod === "title" && (
                <div className="text-center mt-10">
                    <div className="text-xl font-sub">제목으로 검색</div>
                    <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="제목" className="w-[500px] mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
            )}
            {searchMethod === "date" && (
                <div className="text-center mt-10">
                    <div className="text-xl font-sub">상영년도로 검색</div>
                    <div className="flex flex-col items-center">
                        <input type="text" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} placeholder="상영년도" className="w-[500px] mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                </div>
            )}
            {searchMethod === "genre" && (
                <div className="text-center mt-10">
                    <div className="text-xl font-sub">장르로 검색</div>
                    <input type="text" value={searchGenre} onChange={(e) => setSearchGenre(e.target.value)} placeholder="장르" className="w-[500px] mt-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
            )}

            < main className="flex-grow p-10 max-w-6xl mx-auto w-full">
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
            {
                isLoaded && data.length > 0 && (
                    <Pagination
                        page={page}
                        numPages={numPages}
                        setPage={setPage}
                    />
                )
            }
        </div >
    );
};

export default Search;