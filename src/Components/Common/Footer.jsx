import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-[#75805c] text-white pt-12 pb-6 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Name */}
                    <div className="text-center md:text-left">
                        <h2 className="font-[fredoka] text-5xl font-bold  mb-4">FoodCycle</h2>
                        <p className="text-[#d1d5db] font-semibold mb-4">
                            Share Food, Feed Hope - Connecting communities to reduce food waste and fight hunger.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#a7c58f] hover text-xl transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={30} />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={30} />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={30} />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={30} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="text-lg font-bold bg-[#575f43]/40 py-2 rounded-full mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300">Home</a></li>
                            <li><a href="/availableFoods" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300">Available Foods</a></li>
                            <li><a href="/addFood" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300">Add Food</a></li>
                            <li><a href="/login" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300">Login</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center">
                        <h3 className="text-lg font-bold  bg-[#575f43]/40 py-2 rounded-full mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-[#d1d5db]">
                            <li className="flex items-center justify-center gap-2">
                                <span>📧</span>
                                <span>contact@foodcycle.org</span>
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span>📍</span>
                                <span>123 Community St, City, Country</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[#575f43] mt-10 pt-6 text-center">
                    <p className="text-[#d1d5db]">
                        &copy; {currentYear} FoodCycle. All rights reserved. | Share Food, Feed Hope
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;