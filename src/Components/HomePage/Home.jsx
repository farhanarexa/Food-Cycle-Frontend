import React from 'react';
import HeroSection from './HeroSection';
import FeaturedFood from './FeaturedFood';
import ExtraSection from './ExtraSection';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedFood />
            <ExtraSection />
        </div>
    );
};

export default Home;