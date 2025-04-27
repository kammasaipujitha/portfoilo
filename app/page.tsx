"use client";
import { useEffect, useRef, useState } from "react";
import Particles from "./components/TechParticlesBackground";

export default function Home() {
  const canvasRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    const navbar =
      document.querySelector("nav") || document.querySelector("header");
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height > 0 ? height : 80);
    }
  }, []);

  return (
    <main
      style={{ paddingTop: `${navbarHeight}px` }}
      className="relative min-h-screen flex items-center justify-center w-full overflow-hidden"
    >
      <Particles />
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-black gap-8 md:gap-10 px-4 sm:px-6 py-8 md:py-12">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 animate-[fadeIn_1s_ease-in]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Hello, I am{" "}
            <span className="inline-block bg-gradient-to-r from-rose-800 via-purple-900 to-gray-900 bg-[length:200%_100%] bg-clip-text text-transparent font-bold animate-shimmer">
              Sai Pujitha ■
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto md:mx-0">
          As a passionate student of Btech, CSE.I am having keen interest in artificial intelligence and machine learning. I am deeply immersed in study of machine learning, data analysis, neural networks and natural language processing. Being skilled in programming language i am actively seeking opportunity in top companies with good annual income as a recommendation system developer, data scientist and AI/ML engineer.
          </p>

          {/* Know More Button with improved hover effect */}
          <div className="pt-2 md:pt-4">
            <a
              href="/about"
              className="inline-block mt-2 md:mt-4 px-6 py-3 border-2 border-black text-black font-bold tracking-wide hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">KNOW MORE</span>
              <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          </div>
        </div>

        {/* Image Section with loading state */}
        <div className="flex-1 flex justify-center md:justify-end animate-[fadeIn_1.2s_ease-in]">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-blue-300 hover:scale-105 transition-transform duration-300 group">
            {/* Image with backdrop glow effect */}
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <img
              src="/profile.jpg"
              alt="Sai Pujitha"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://via.placeholder.com/300?text=SD"; // Fallback image
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator for mobile - shown only on smaller screens */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center sm:hidden animate-bounce">
        <span className="text-gray-400 text-sm mb-2">Scroll</span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </main>
  );
}
