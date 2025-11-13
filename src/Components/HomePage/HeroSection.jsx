import React from 'react';
import { Link } from 'react-router';
import HeroButton from '../Buttons/HeroButton';

const HeroSection = () => {
    return (
        <div
            className="hero min-h-[70vh] md:min-h-[80vh] w-full"
            style={{
                backgroundImage: "url(https://i.postimg.cc/25F6c3Gv/hero-Bg.jpg)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="hero-overlay bg-black/40"></div>
            <div className="hero-content text-neutral-content text-center p-4 sm:p-6 md:p-10">
                <div className="max-w-4xl bg-accent/20 rounded-3xl p-6 sm:p-8 md:p-10">
                    <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-md">
                        Share Food, Feed Hope
                    </h1>
                    <h2 className="mb-5 text-xl sm:text-2xl md:text-3xl font-bold drop-shadow">
                        From Your Table to Theirs
                    </h2>
                    <p className="mb-5 text-base sm:text-lg md:text-xl font-semibold drop-shadow-sm">
                        Because no meal should go to waste, and no neighbor should go hungry.
                        <br className="hidden sm:block" />
                        Share what you have, claim what you need — simple acts that feed bodies, warm hearts, and heal our planet.
                    </p>
                    <div className="flex justify-center mt-8">
                        <Link to="/availableFoods"><HeroButton /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;