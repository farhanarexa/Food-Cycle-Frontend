import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo.png';


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#75805c] text-white pt-8 pb-6 mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo and Name */}
                    <div className="text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">

                            <img src={logo} alt="Logo" className="w-30 h-30 mb-2 sm:mb-0 sm:mr-3 rounded-2xl object-contain" />
                            <div className="text-center sm:text-left">

                                <h2 className="font-[fredoka] text-2xl sm:text-3xl font-bold mb-2">FoodCycle</h2>
                                <p className="text-[#d1d5db] text-sm mb-3">
                                    Share Food, Feed Hope - Connecting communities to reduce food waste and fight hunger.
                                </p>
                                <div className="flex justify-center sm:justify-start space-x-4">
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebook size={24} />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                        aria-label="Twitter"
                                    >
                                        <FaTwitter size={24} />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram size={24} />
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#a7c58f] text-xl transition-colors duration-300"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin size={24} />
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="text-lg font-bold bg-[#575f43]/40 py-2 rounded-full mb-4">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><a href="/" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300 block ">Home</a></li>
                            <li><a href="/availableFoods" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300 block ">Available Foods</a></li>
                            <li><a href="/addFood" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300 block">Add Food</a></li>
                            <li><a href="/login" className="text-[#d1d5db] hover:underline hover:text-white hover:font-bold transition-colors duration-300 block">Login</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center sm:text-center">
                        <h3 className="text-lg font-bold bg-[#575f43]/40 py-2 rounded-full mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-[#d1d5db] text-sm">
                            <li className="flex items-center justify-center sm:justify-center gap-2 py-1">
                                <span>📧</span>
                                <span>contact@foodcycle.org</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-center gap-2 py-1">
                                <span>📍</span>
                                <span>123 Community St, City, Country</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[#575f43] mt-8 pt-6 text-center">
                    <p className="text-[#d1d5db] text-sm">
                        &copy; {currentYear} FoodCycle. All rights reserved. | Share Food, Feed Hope
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;