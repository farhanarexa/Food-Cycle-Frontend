import React from 'react';
import { Link } from 'react-router';
import HeroButton from '../Buttons/HeroButton';

const HeroSection = () => {
    return (
        <div
            className="hero h-170 "
            style={{
                backgroundImage:
                    "url(https://i.postimg.cc/25F6c3Gv/hero-Bg.jpg)",
            }} >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center bg-accent/20 rounded-3xl p-10">
                <div className="">
                    <h1 className="mb-5 text-5xl font-black text-shadow-lg/50">Share Food, Feed Hope</h1>
                    <h2 className="mb-5 text-3xl font-bold text-shadow-lg/40">From Your Table to Theirs</h2>
                    <p className="mb-5 text-xl font-semibold text-shadow-lg/30">
                        Because no meal should go to waste, and no neighbor should go hungry.
                        <br />
                        Share what you have, claim what you need — simple acts that feed bodies, warm hearts, and heal our planet.
                    </p>
                    <div className="flex justify-center mt-10">
                        <Link to="/availableFoods"><HeroButton /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;