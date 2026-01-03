import { Link } from 'react-router-dom';
import LogoLoop from '../components/LogoLoop';

const Home = () => {

    const imageLogos = [
        {
            src: "https://i.namu.wiki/i/qkZLsjRR6kDX3R36NaoFjeuw7mKuQKBdsTMa6rz2BLIVguOE9jzQVj1gfV-hbbs_Zy0GvLt0nL5eZWCqKVT7rvyGdlE9UUqO1ugpIB-PTjE6Vr9uUJhj6Q6ezxSWOK-gFqqctHpQuiXi65givXFhlw.webp",
            alt: "샘플 이미지1",
        }
    ]

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10 bg-zinc-200">
            <div className="text-7xl font-bold"><span className="text-sky-400">A</span>Hub</div>
            <div className="text-5xl font-sub">당신의 시간을 채웠던 수많은 장면들, 이제는 잊히지 않게.</div>
            <Link to="/login" className="text-3xl border-1 p-5 rounded-[30px]">시작하러 가기</Link>
            <LogoLoop logos={imageLogos} logoHeight={240} speed={60} />
        </div>
    );
};

export default Home;