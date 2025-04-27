"use client";
import { useEffect, useState } from "react";
import Particles from "../components/TechParticlesBackground";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

export default function Certifications() {
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const navbar =
      document.querySelector("nav") || document.querySelector("header");
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height > 0 ? height : 80);
    }
  }, []);

  const certificates = [
    {
      id: 1,
      title: "Mastering Data Structures and Algorithm",
      issuer: "GeeksForGeeks",
      logo: "/icons/gfg.svg",
      image: "/certificates/gfgf.png",
      date: "July 2024",
      skills: ["DSA", "C++"],
      color: "bg-black",
      url: "https://drive.google.com/file/d/1UoasnCIX5G3y3k2590zjDVXInjOdwjQM/view?usp=drive_link"
    },
    {
      id: 2,
      title: "Social Networks",
      issuer: "Online course",
      logo: "/logos/nptel.jpg",
      image: "/certificates/nptel.png",
      date: "December 2024",
      skills: ["Network Visualization Techniques", "Community Detection", "Network Models"],
      color: "bg-black",
      url: "https://drive.google.com/file/d/1xsU2UVgQitI3Jso6_bXPq7LZt1qcEE0Y/view?usp=drive_link"
    },
  
  ];

  // Define the certificate type
  interface Certificate {
    id: number;
    title: string;
    issuer: string;
    logo: string;
    image: string;
    date: string;
    skills: string[];
    color: string;
    url: string;
  }

  // Certificate card component
  const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    return (
      <div className="bg-transparent shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl backdrop-blur-md border border-black animate-[fadeIn_0.8s_ease-in]">
        {/* Colored border on the left side */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${certificate.color}`}></div>
        
        {/* Certificate image */}
        <div className="relative h-48 w-full overflow-hidden border-b border-black">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            {/* This is a placeholder. In production, you'll load actual certificate images */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center object-contain justify-center text-gray-400">
                <img src={certificate.image} alt="certificate" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate logo */}
        <div className="absolute top-4 left-4 z-10 bg-white/80 p-1 rounded-md backdrop-blur-sm shadow-sm">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <img
              src={certificate.logo}
              alt={certificate.issuer}
              className="max-w-full max-h-full object-contain shadow-md"
            />
          </div>
        </div>
        
        {/* View certificate link */}
        <div className="absolute top-4 right-4 z-20">
          <a 
            href={certificate.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-black p-2 rounded-full transition-colors"
            aria-label={`View ${certificate.title} certificate`}
          >
            <FiExternalLink className="text-lg" />
          </a>
        </div>

        {/* Certificate content */}
        <div className="p-6">
          <h2 className="text-xl md:text-2xl text-black font-bold mb-1 pl-4">
            {certificate.title}
          </h2>
          
          <p className="text-gray-600 mb-4 pl-4">
            {certificate.issuer} • {certificate.date}
          </p>
          
          <div className="pl-4">
            <div className="flex flex-wrap gap-2 mt-4">
              {certificate.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main
      style={{ paddingTop: `${navbarHeight}px` }}
      className="relative min-h-screen w-full"
    >
      <Particles />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold mb-6 text-black animate-[fadeIn_0.6s_ease-in]">
          Certifications
        </h1>
        <p className="text-lg text-black font-bold mb-10 animate-[fadeIn_0.7s_ease-in]">
          Professional certifications and courses I've completed to expand my skills and expertise.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_0.8s_ease-in]">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </div>
    </main>
  );
}