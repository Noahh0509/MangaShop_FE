import React, { useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/Featuredsection';
import NewReleasesSection from '../components/home/Newreleasessection';

export default function HomePage() {

    return (
        <div className="min-h-screen flex flex-col bg-[#0e0e0e] text-[#e8e2d9]">
            

            <Header />

            <main className="flex-1">
                <HeroSection />
                <FeaturedSection />
                <NewReleasesSection />
            </main>

            <Footer />
        </div>
    );
}