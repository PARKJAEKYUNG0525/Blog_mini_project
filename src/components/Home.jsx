import img1 from '../img/1.jpg';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';
import { useAuth } from './AuthContextPro';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const images = [img1, img2, img3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const { currentUser } = useAuth();
    const navigate = useNavigate(); 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleWrite = () => {
        navigate("/allBoard");
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* 이미지 슬라이더 영역 */}
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt="slider"
                    className={`
                        absolute top-0 left-0 w-full h-full object-cover
                        transition-opacity duration-1000 ease-in-out
                        ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
                    `}
                />
            ))}

            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4">
                
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-lg">
                    A Space Where Thoughts Bloom <br />
                    and Knowledge Grows.
                </h1>

                <p className="text-gray-200 text-lg md:text-xl mb-10 font-light drop-shadow-md">
                    Archive of studies, daily life, and creative memories.
                </p>
                <button
                    onClick={handleWrite}
                    className="bg-[#1A1F2C] text-white text-sm px-20 py-4 rounded-lg font-semibold shadow-xl 
                               hover:bg-[#321F1F] transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    Explore Posts
                </button>
            </div>
        </div>
    );
};

export default Home;