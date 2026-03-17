import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const images = [img1, img2, img3];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // 👉 3초마다 변경 (더 자연스럽게)

        return () => clearInterval(interval);
    }, []);

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
        </div>
    );
};

export default Home;