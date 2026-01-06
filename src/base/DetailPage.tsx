import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

interface AnimeItem {
    title: string;
    keyVisual: string;
    genreList: string[];
    releaseYear: number[];
    releaseQuarter: number[];
}

const DetailPage = () => {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title || "");
    const [animationObject, setAnimationObject] = useState<AnimeItem>();
    const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);


    const getDetailInformation = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/findSingleAnimation`, {
                params: {
                    title: decodedTitle
                }
            });
            setAnimationObject(response.data);
        } catch (error) {
            alert("애니메이션 정보를 불러오는 중 오류가 발생했습니다.")
        }
    }

    const checkTargetIsFavorite = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getFavorite`, {
                withCredentials: true
            });

            response.data.forEach((item: AnimeItem) => {
                if (item.title === decodedTitle) {
                    setIsAlreadyFavorite(true);
                }
            });
        } catch {
            alert("즐겨찾기 정보를 불러오는 중 오류가 발생했습니다.");
        }
    }

    const addToFavorite = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/user/saveFavorite`,
                {
                    title: decodedTitle
                },
                {
                    withCredentials: true
                }
            );
            setIsAlreadyFavorite(true);
        } catch {
            alert("즐겨찾기 추가 중 오류가 발생했습니다.");
        }
    }

    const removeFromFavorite = async () => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/user/deleteFavorite`,
                {
                    params: {
                        title: decodedTitle
                    },
                    withCredentials: true
                }
            );
            setIsAlreadyFavorite(false);
        } catch {
            alert("즐겨찾기 삭제 중 오류가 발생했습니다.");
        }
    }

    useEffect(() => {
        checkTargetIsFavorite();
        getDetailInformation();
    }, [isAlreadyFavorite]);

    return (
        <div className="h-screen">
            <NavBar />
            <div>
                {animationObject && (
                    <div className="p-10">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold mb-4">{animationObject.title}</h1>
                            {isAlreadyFavorite ? (
                                <button className="px-4 py-2 bg-red-400 text-white rounded mb-4 cursor-pointer" onClick={removeFromFavorite}>등록취소하기</button>
                            ) : (
                                <button className="px-4 py-2 bg-blue-500 text-white rounded mb-4 cursor-pointer" onClick={addToFavorite}>등록하기</button>
                            )}
                        </div>
                        <div className="flex justify-center gap-20">
                            <img src={animationObject.keyVisual} alt={animationObject.title} className="w-full max-w-md mb-4 rounded-xl shadow-lg" />
                            <div className="flex flex-col justify-center">
                                <div className="mb-2">
                                    <span className="font-bold">장르:</span> {animationObject.genreList.join(", ")}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold">상영연도:</span> {animationObject.releaseYear.join(", ") + "년도"}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold">상영분기:</span> {animationObject.releaseQuarter.join(", ") + "분기"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailPage;