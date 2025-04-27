"use client";
import React from "react";
import { useState, useEffect } from "react";
import Particles from "../components/TechParticlesBackground";
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend } from "react-icons/fi";

export default function Contact() {
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const navbar =
      document.querySelector("nav") || document.querySelector("header");
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height > 0 ? height : 80);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In production, replace with actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitMessage("Message sent successfully! I'll get back to you soon.");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  // Define the type for contact info
  interface ContactInfo {
    icon: React.ReactNode;
    label: string;
    value: string;
    link: string;
  }

  const contactInfo: ContactInfo[] = [
    {
      icon: <FiMail />,
      label: "Email",
      value: "kammasaipujitha@gmail.com",
      link: "mailto:kammasaipujitha@gmail.com"
    },
    {
      icon: <FiPhone />,
      label: "Phone",
      value: "+91-8919019251",
      link: "tel:+918919019251"
    },
    {
      icon: <FiLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/saipujitha",
      link: "https://www.linkedin.com/in/kamma-sai-pujitha/"
    },
    {
      icon: <FiGithub />,
      label: "GitHub",
      value: "github.com/sai pujitha",
      link: "https://github.com/kammasaipujitha"
    }
  ];

  // Contact Info Card Component
  const ContactInfoCard = ({ info }: { info: ContactInfo }) => {
    return (
      <a 
        href={info.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center p-4 bg-transparent backdrop-blur-md border border-black transition-all duration-300 hover:shadow-xl animate-[fadeIn_0.8s_ease-in]"
      >
        <div className="mr-4 text-2xl text-black">{info.icon}</div>
        <div>
          <h3 className="text-sm text-gray-600">{info.label}</h3>
          <p className="font-medium text-black">{info.value}</p>
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
          Get In Touch
        </h1>
        <p className="text-lg text-black font-bold mb-10 animate-[fadeIn_0.7s_ease-in]">
          Have a question or want to work together? Feel free to reach out to me.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Section */}
          <div className="lg:col-span-1 animate-[fadeIn_0.8s_ease-in]">
            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} info={info} />
              ))}
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="lg:col-span-2 animate-[fadeIn_0.9s_ease-in]">
            <div className="bg-transparent shadow-md overflow-hidden transition-all duration-300 backdrop-blur-md border border-black">
              {/* Colored border on the left side */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
              
              <div className="p-6">
                <h2 className="text-xl md:text-2xl text-black font-bold mb-6 pl-4">
                  Send Me a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="pl-4 pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-600 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-black/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-600 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-black/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-600 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black/50"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-600 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black/50"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                      <FiSend className="mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                    
                    {submitMessage && (
                      <p className={`text-sm ${submitMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                        {submitMessage}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}