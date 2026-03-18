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
        if (!currentUser) {
            alert("로그인이 필요합니다");
            navigate("/login");
        } else {
            navigate("/board/create");
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
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
            <div className="absolute inset-0 flex justify-center items-center z-10">
                <button
                    onClick={handleWrite}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-xl rounded-xl shadow-lg transition">
                    글쓰기
                </button>
            </div>
        </div>
    );
};

export default Home;