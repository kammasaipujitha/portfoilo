"use client";
import React from "react";
import { useState, useEffect } from "react";
import Particles from "../components/TechParticlesBackground";
import { SiGithub } from "react-icons/si";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { motion } from 'framer-motion';

// Define interface for project structure
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  color: string;
  github: string;
  image: string;
}

// Define props for ProjectCard component
interface ProjectCardProps {
  project: Project;
}

export default function Projects() {
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const navbar =
      document.querySelector("nav") || document.querySelector("header");
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height > 0 ? height : 80);
    }
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Twitter Sentiment Analysis",
      description: "Developed a Twitter sentiment analysis model using Logistic Regression, Random Forest, XGBoost, Naive Bayes, and neural networks, achieving 99% accuracy .The project helps businesses understand customer behavior by accurately classifying tweets as positive or negative",
      technologies: ["Python", "ML", "NLP", "Deep Learning"],
      type: "ML",
      color: "bg-black",
      github: "https://github.com/kammasaipujitha/-twitter-sentiment-analysis",
      image: "/projects/twi.png"
    },
    {
      id: 2,
      title: "Algorithm Simulator",
      description: "Engineered an engaging interactive simulator to demonstrate various searching and sorting algorithms.Encompasses the implementation of Bubble Sort, Insertion Sort, Selection Sort, BinarySearchand Linear search methodologies",
      technologies: ["CPP", "DSA"],
      type: "DSA",
      color: "bg-black",
      github: "https://github.com/kammasaipujitha/algorithm-simulator",
      image: "/projects/dsaal.jpg"
    },
    {
      id: 3,
      title: "Fake News Prediction Model",
      description: "Developed a machine learning based system for the binary classification of news articles as real or fake. The project aimed to address the increasing prevalence of misinformation in digital media by leveraging natural language processing techniques to identify linguistic indicators of fake news.Employed Logistic Regression and Naive Bayes algorithms for their effectiveness in classification tasks",
      technologies: ["Python", "NLP", "ML"],
      type: "ML",
      color: "bg-black",
      github: "https://github.com/kammasaipujitha/fake-news-analysis",
      image: "/projects/fake.png"
    },
    // You can add more projects here
  ];

  // Get unique project types for the filter dropdown
  const projectTypes: string[] = ["all", ...Array.from(new Set(projects.map(project => project.type)))];

  // Filter projects based on search term and project type
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = projectTypeFilter === "all" || project.type === projectTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Project card component without hover animation
  const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
      <motion.div 
        className="bg-white shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Color accent and image container */}
        <div className="relative">
          {/* Colored accent on top */}
          <div className={`h-2 w-full ${project.color}`}></div>
          
          {/* Project image with overlay gradient */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.image} 
              alt={`${project.title} screenshot`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
            
            {/* Project type badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-xs font-medium bg-white/90 text-gray-800 px-3 py-1 rounded-full shadow-sm">
                {project.type}
              </span>
            </div>
            
            {/* GitHub link */}
            <div className="absolute top-4 right-4 z-10">
              <a 
                href={project.github || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-8 w-8 bg-white/90 rounded-full text-gray-800 transition-colors hover:bg-gray-200"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <SiGithub className="text-lg" />
              </a>
            </div>
            
            {/* Project title overlay */}
            <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white z-10">
              {project.title}
            </h2>
          </div>
        </div>
        
        {/* Project content */}
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-gray-700 mb-6 flex-grow">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies && project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Custom dropdown component matching the theme
  const CustomDropdown = () => {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-transparent text-black backdrop-blur-md border border-black shadow-md transition-all hover:shadow-lg"
        >
          <span>
            {projectTypeFilter === "all" ? "All Project Types" : projectTypeFilter}
          </span>
          <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-full bg-white/90 text-black backdrop-blur-md border border-black shadow-md z-30">
            {projectTypes.map((type) => (
              <button
                key={type}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setProjectTypeFilter(type);
                  setIsDropdownOpen(false);
                }}
              >
                {type === "all" ? "All Project Types" : type}
              </button>
            ))}
          </div>
        )}
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
        <h1 className="text-3xl font-bold mb-6 text-black animate-[fadeIn_0.6s_ease-in]">Projects</h1>
        <p className="text-lg text-black font-bold mb-6 animate-[fadeIn_0.7s_ease-in]">
          Explore my Projects of  Machine Learning.
        </p>
        
        {/* Search and Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 animate-[fadeIn_0.8s_ease-in]">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search projects by title, description or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent backdrop-blur-md border text-black border-black shadow-md focus:outline-none focus:shadow-lg transition-all"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-700" />
          </div>
          <div className="md:w-48">
            <CustomDropdown />
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-black animate-[fadeIn_0.8s_ease-in]">
            <p className="text-xl">No projects match your search criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setProjectTypeFilter("all");
              }}
              className="mt-4 px-4 py-2 bg-transparent backdrop-blur-md border border-black shadow-md hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}