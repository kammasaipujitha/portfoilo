"use client";
import React from "react";
import { useState, useEffect } from "react";
import Particles from "../components/TechParticlesBackground";
import { FiDownload, FiBookOpen, FiAward, FiCode } from "react-icons/fi";
import Image from "next/image";

// Define interfaces for data structures
interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  grade: string;
  logo: string;
}

interface Training {
  title: string;
  organization: string;
  duration: string;
  points: string[];
  logo: string;
}

interface DownloadOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  file: string;
}

export default function Resume() {
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const navbar =
      document.querySelector("nav") || document.querySelector("header");
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height > 0 ? height : 80);
    }
  }, []);

  const education: Education[] = [
    {
      institution: "Lovely Professional University",
      degree: "Computer Science and Engineering",
      duration: "2022 – Current",
      location: "Jalandhar, Punjab",
      grade: "CGPA: 6.97",
      logo: "/logos/LPU.jpeg"  // Add your LPU logo here
    },
    {
      institution: "Bhashyam Junior College",
      degree: "12th MPC-Math, Physics, Chemistry",
      duration: "2020 – 2022",
      location: "Guntur, Andhra Pradesh",
      grade: "Percentage: 91.09%",
      logo: "/logos/bs.png"  // Add your Narayana logo here
    },
    {
      institution: "Bhashyam High School",
      degree: "State Board",
      duration: "2019 – 2020",
      location: "Guntur, Andhra Pradesh",
      grade: "CGPA: 10",
      logo: "/logos/bs.png"  // Add your Narayana logo here
    }
  ];

  const trainings: Training[] = [
    {
      title: "Master DSA with C++",
      organization: "GeeksForGeeks",
      duration: "June 2024 - July 2024",
      points: [
        "Implemented core data structures (arrays, stacks, trees) in C++.",
        "Solved algorithmic problems with sorting, searching, and graph techniques.",
        "Optimized algorithms using Big-O analysis.",
        "Applied DSA concepts to real-world problem-solving."
      ],
      logo: "/logos/gff.jpg"  // Add your GeeksForGeeks logo here
    },
    
  ];

  const downloadOptions: DownloadOption[] = [
    {
      title: "General CV",
      description: "Complete professional profile with all skills and experiences",
      icon: <FiDownload />,
      file: "/CV/sai pujitha.pdf"
    },
    
    {
      title: "Machine Learning CV",
      description: "Focused on Machine Learning expertise",
      icon: <FiAward />,
      file: "/CV/sai pujitha.pdf"
    }
  ];

  // Card component for sections
  interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    icon: React.ReactNode;
  }

  const SectionCard: React.FC<SectionCardProps> = ({ title, children, icon }) => {
    return (
      <div className="bg-transparent shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl backdrop-blur-md border border-black mb-8 animate-[fadeIn_0.8s_ease-in]">
        {/* Colored border on the left side */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
        
        {/* Header */}
        <div className="flex items-center border-b border-black p-6">
          <div className="mr-4 text-2xl text-black">{icon}</div>
          <h2 className="text-xl md:text-2xl text-black font-bold">
            {title}
          </h2>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };

  // Education item component with logo
  interface EducationItemProps {
    education: Education;
  }

  const EducationItem: React.FC<EducationItemProps> = ({ education }) => {
    return (
      <div className="mb-6 last:mb-0 pl-4">
        <div className="flex items-start mb-2">
          {/* Logo */}
          <div className="mr-4 flex-shrink-0">
            <div className="w-12 h-12 relative bg-white rounded-md shadow-sm overflow-hidden">
              <img 
                src={education.logo} 
                alt={`${education.institution} logo`} 
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <h3 className="text-lg font-semibold text-black">{education.institution}</h3>
              <span className="text-gray-600">{education.duration}</span>
            </div>
            <p className="text-black mb-1">{education.degree}</p>
            <div className="flex flex-col md:flex-row md:justify-between text-gray-600">
              <span>{education.location}</span>
              <span className="font-medium">{education.grade}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Training item component with logo
  interface TrainingItemProps {
    training: Training;
  }

  const TrainingItem: React.FC<TrainingItemProps> = ({ training }) => {
    return (
      <div className="mb-6 last:mb-0 pl-4">
        <div className="flex items-start mb-2">
          {/* Logo */}
          <div className="mr-4 flex-shrink-0">
            <div className="w-12 h-12 relative bg-white rounded-md shadow-sm overflow-hidden">
              <img 
                src={training.logo} 
                alt={`${training.organization} logo`} 
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <h3 className="text-lg font-semibold text-black">{training.title}</h3>
              <span className="text-gray-600">{training.duration}</span>
            </div>
            <p className="text-black mb-2">{training.organization}</p>
            <ul className="list-disc pl-5 text-gray-800 space-y-1">
              {training.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Download card component
  interface DownloadCardProps {
    option: DownloadOption;
  }

  const DownloadCard: React.FC<DownloadCardProps> = ({ option }) => {
    return (
      <a 
        href={option.file} 
        download
        className="bg-transparent shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl backdrop-blur-md border border-black flex flex-col animate-[fadeIn_0.8s_ease-in]"
      >
        {/* Colored border on the left side */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
        
        <div className="p-6 flex-grow">
          <div className="flex items-center mb-4">
            <div className="text-2xl text-black mr-3">{option.icon}</div>
            <h3 className="text-lg font-semibold text-black">{option.title}</h3>
          </div>
          <p className="text-gray-600 mb-4">{option.description}</p>
        </div>
        
        <div className="p-4 bg-black text-white flex items-center justify-center">
          <FiDownload className="mr-2" />
          <span>Download CV</span>
        </div>
      </a>
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
          Resume
        </h1>
        <p className="text-lg text-black font-bold mb-10 animate-[fadeIn_0.7s_ease-in]">
          My educational background, professional training, and experience.
        </p>
        
        {/* Education Section */}
        <SectionCard title="Education" icon={<FiBookOpen />}>
          {education.map((edu, index) => (
            <EducationItem key={index} education={edu} />
          ))}
        </SectionCard>
        
        {/* Training Section */}
        <SectionCard title="Professional Training" icon={<FiAward />}>
          {trainings.map((training, index) => (
            <TrainingItem key={index} training={training} />
          ))}
        </SectionCard>
        
        {/* Download CV Section */}
        <h2 className="text-2xl font-bold mb-6 text-black animate-[fadeIn_0.8s_ease-in]">
          Download Resume
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.9s_ease-in]">
          {downloadOptions.map((option, index) => (
            <DownloadCard key={index} option={option} />
          ))}
        </div>
      </div>
    </main>
  );
}