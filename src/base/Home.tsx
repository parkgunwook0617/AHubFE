import { Link } from 'react-router-dom';
import LogoLoop from '../components/LogoLoop';

const Home = () => {

    const imageLogos = [
        {
            src: "images/r9LjwJJVHt9nU6DTb4MYfGbVV9eHaR3oDSnGUJ1esuc9RHpv4eHgHglzQ1G2kuWNj1I2Op-6YesWkl2oSI34rXzTu10vNm34gBq41elVRzVMyaQ_W3q2xNTF0ydg6aARdHE_y47YV0f1Jrwq81mkvA.webp",
            alt: "샘플 이미지1",
        },
        {
            src: "images/qkZLsjRR6kDX3R36NaoFjeuw7mKuQKBdsTMa6rz2BLIVguOE9jzQVj1gfV-hbbs_Zy0GvLt0nL5eZWCqKVT7rvyGdlE9UUqO1ugpIB-PTjE6Vr9uUJhj6Q6ezxSWOK-gFqqctHpQuiXi65givXFhlw.webp",
            alt: "샘플 이미지2",
        },
        {
            src: "images/yEYJBUJHfRo0MI3npJQtRSXcNM3_IUWNS0-fCiPjCykCnvZoAQmrkpYfgJvAO_1swnr1iU37qD08vxFhIc5ZQ_Z-1BqTwm1GDcQxVPvO2sMaGYpuka9QIDAh26W-BzZGGLXuTHfqyuD8_FOyA6Dm8Q.webp",
            alt: "샘플 이미지3",
        },
        {
            src: "images/VNoC1_sHXFIKJFOmNG_wZ8kezqhGP8XR2HHtboSBIJOPRMKx7qgqane1UgWPN4_e8fiDdu7IVgSMkDnPqgNJxrCJGjxZmG5MZUyLhuWl6yrnujHWZVscB8um5aE7VCCvdlHkch081HHz_E_Lq75j5A.webp",
            alt: "샘플 이미지4",
        },
        {
            src: "images/zjzFVrf0uWcY2HvKcniqBQXQdj5mI8mANnZTRwuf-B5fMUnb5mSTLPBcdyADuIddIwNSq6zyvyFodU1LA4Ck1btwdhn1Mg8SmVDjHZCXlR38Rxzx9wMqhjU2eO68M6oA3x5h_mhC1Wy4iHropWBWtA.webp",
            alt: "샘플 이미지5",
        },
        {
            src: "images/zJqUCCXgk0tYHbbBZSMz_NdeHYHgPuGaMyficOOG5fVl4KfVfTpMFA6oFAXu3S47QtqJbqFkKtql76VZpS8ggGZVtyzNoeKeTBosdRGNXxMRE0qAdNw556BrXlp9Y-pPakMOUeaSlYqddvzjfsZqYw.webp",
            alt: "샘플 이미지6",
        },
        {
            src: "images/WTeZutAwK67FwPKAy3n4jw-NKrI2-ybWC5kQu-XOMbILLHdjGvrI7L3CjRO-dc8rnDL5dYVRvtwOSOknEftkHA85f701nJhrB2BIMO5ee6kh2Cc3x2c4hNPL5PglE0bAj1e5UNp-mYIiwAYR5h_iOA.webp",
            alt: "샘플 이미지7",
        },
        {
            src: "images/TF3OpHlmiXDGNBIvQ_A9KboXn3GeVRNnOXcoJ0aE4ffxlJkbLNJjbVtJwOw1Cog3JzeXafaX_fPrns9ULF2afsPog4JXV6mULwkvRvkGHXVwjCLgTBj9kEhbyVF5CT_bTRjf69rrn1_X6mITXj8pzQ.webp",
            alt: "샘플 이미지8",
        },
        {
            src: "images/4MVNsF--NgERIo27zOu-My3ej0hYZ-AQM_644YpRT_fDUSriyhNnqNW7cVjljQ5XUKgCT5WHBsm4VX23M0HqulnA_L3REkTOTm0K76MiV7SILcpo6U3UjYUxRxOKWNkWNG5SzWFScpqSqxPisvN30Q.webp",
            alt: "샘플 이미지9",
        },
        {
            src: "images/z7WZD76WkmkZeR7c8QAx8laNZxOxohzT7QuygEBzApyDc67IniYZTw2Rxm3M3496kyqDPO6cjOes_31OzvxL1GgN35kBm6wNfKO-7yKubvzo6OmtVPxTqWOLtHuYy3Axg2mzyJlk17Gt2YIcEzKioA.webp",
            alt: "샘플 이미지10",
        },
        {
            src: "images/vJfLWSbAE5UoP7FPov14rRCXB_pN6pFo6mDiNapVARF9S8Bvmb-gR3Yxm_cTaJmOsjBKZahxVOr-wD2UYHPsKJ0CLwluahYV2OZs9nQF3cxob9L9l9jCLLjuD_aQTpwHdYNINVxojG6feWK_Ndjgog.webp",
            alt: "샘플 이미지11",
        },
        {
            src: "images/VZXerXJE0nFomyXb9wigJSWM_2XKOnD0NgzgccIZTzUhPQzY0fZ0RVVKMegjFVlN85BbrTn-nQV5W_giX9sGfiueE7D5DQ1-VHUOD1W8jaRvlfMOIQ9tAlFTvuOrtAv2XZ0U9LNsPqHfK6ofZxo7BQ.webp",
            alt: "샘플 이미지12",
        },
        {
            src: "images/KdszL1mxGQZJMMAAfvj2QfNeykYeB5YeTR-sWMrgGWQADXYo7-NVEDKCQBssXUP7AyCyp4ysECn6jxxiAc5N8uoYTsEoY6BLhBDnuSg_3j1D7NfDbK4i0noiH2nw0nkmCVTvXx7nlz2co3BAC1g8Nw.webp",
            alt: "샘플 이미지13",
        },
        {
            src: "images/Be6ZC7dj-YVw2GziKxPuNE5PMdpQmqmyF-JCgMHe2Vmc7gOrBv0ooYIwrK6pD9uPMEO1W3zCVtSLqmt3pHNOl3FYzJGJBMVXhcHw7QLBrlwen1I54DM7gsP7g9_WFvp0CGw0VjZ6GRFuFfA2of-vsQ.webp",
            alt: "샘플 이미지14",
        },
        {
            src: "images/pL7J7VfRS8S7_wjNnYNM-5ecE4F8qi0_FTIQuz8fWkK3IT4nK1NTTBzbP6M2VCR4j0DUdx8X8ckLku2y88BVGCGdihutbair1R1Ny25PXmMtBlQEWklwgISF5tskz98tKb7YPuibnpKXfiQ7gTYcFQ.webp",
            alt: "샘플 이미지15",
        },
        {
            src: "images/8YWFBfksFqP3CHxD6F3n3zJZyOqfcVDAXj0r4cufwcpHRAR076zGUjmbcGYmcQ4qvzlqk9l_1sGFxd_ryclojYBL_W_0UG0jYjnDfOK20p5bPGJJ3sEaHrcxsskYmJOkdlD-ipnazIQ_W5mBhNaFbg.webp",
            alt: "샘플 이미지16",
        },
        {
            src: "images/TRvQd7Bpaaz_uTN9MqtP33xI0Np7y24DnKCe6VOoJk-KXzOTCYn2_nL6cFR9-SauwukbTu_KFU6rKmQJD6HFGjuOGTRpoh-gTdmnzyIw0ICVjHrgQPQ_2kdGqtR8UdEkkGNhmTwI7yPvfKjqA6gSLA.webp",
            alt: "샘플 이미지17",
        },

    ]

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10 bg-zinc-200">
            <div className="text-7xl font-bold"><span className="text-sky-400">A</span>Hub</div>
            <div className="text-5xl font-sub">당신의 시간을 채웠던 수많은 장면들, 이제는 잊히지 않게.</div>
            <Link to="/login" className="text-3xl text-white p-5 rounded-[30px] bg-sky-400 shadow-xl active:scale-[0.95] hover:bg-blue-500 transition-all">시작하러 가기</Link>
            <LogoLoop logos={imageLogos} logoHeight={240} speed={60} />
        </div>
    );
};

export default Home;