import React from 'react';
import { ImInfinite } from 'react-icons/im';
import { MdFoodBank } from 'react-icons/md';

const ExtraSection = () => {
    return (
        <div className='px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-32'>
            {/* section-1: How It Works */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-success bg-accent/20 p-4 rounded-2xl">
                    How It Works
                </h2>
            </div>

            <section className="py-12 lg:py-16 bg-gradient-to-b from-base-200 to-info/20 border-4 border-base-300 rounded-3xl">
                <p className="text-lg sm:text-xl lg:text-2xl font-black text-success text-center max-w-4xl mx-auto mb-12 bg-accent/10 px-6 py-3 rounded-2xl">
                    Turn your extra food into someone's blessing in just 3 simple steps
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Step 1 - Post Food */}
                    <div className="text-center group">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 mx-auto bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    1
                                </div>
                            </div>
                            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
                                <div className="bg-success text-white px-3 sm:px-4 py-2 rounded-full text-sm font-bold shadow-xl whitespace-nowrap">
                                    Post Food
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black bg-accent/20 p-4 rounded-2xl text-success border-2 border-accent mb-3">
                            Share Your Extra Food
                        </h3>
                        <p className="text-neutral leading-relaxed bg-info/10 p-5 border-2 border-info rounded-2xl text-sm sm:text-base font-semibold h-40 flex items-center justify-center">
                            Have extra biryani, iftar items, or cooked meals? Just snap a photo, add details,
                            and post it in minutes. Your surplus becomes someone's suhur or dinner!
                        </p>
                    </div>

                    {/* Step 2 - Find Food */}
                    <div className="text-center group">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 mx-auto bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    2
                                </div>
                            </div>
                            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
                                <div className="bg-success text-white px-3 sm:px-4 py-2 rounded-full text-sm font-bold shadow-xl whitespace-nowrap">
                                    Find Food
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black bg-accent/20 p-4 rounded-2xl text-success border-2 border-accent mb-3">
                            Browse & Request
                        </h3>
                        <p className="text-neutral leading-relaxed bg-info/10 p-5 border-2 border-info rounded-2xl text-sm sm:text-base font-semibold h-40 flex items-center justify-center">
                            Hungry or know someone in need? Browse fresh donations near you.
                            Request with one tap — no money, just respect and gratitude.
                        </p>
                    </div>

                    {/* Step 3 - Collect Food */}
                    <div className="text-center group">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 mx-auto bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    3
                                </div>
                            </div>
                            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
                                <div className="bg-success text-white px-3 sm:px-4 py-2 rounded-full text-sm font-bold shadow-xl whitespace-nowrap">
                                    Collect Food
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black bg-accent/20 p-4 rounded-2xl text-success border-2 border-accent mb-3">
                            Pickup with Smile
                        </h3>
                        <p className="text-neutral leading-relaxed bg-info/10 p-5 border-2 border-info rounded-2xl text-sm sm:text-base font-semibold h-40 flex items-center justify-center">
                            Chat with the donor, agree on time, and collect fresh food from their location.
                            Zero waste. Full hearts. That's the magic of sharing.
                        </p>
                    </div>
                </div>
            </section>

            {/* section-2: Our Mission */}
            <section className="mt-16 lg:mt-20 py-12 lg:py-20 bg-gradient-to-b from-accent/10 to-info/10 border-4 border-base-300 rounded-3xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-success/20 rounded-full blur-3xl scale-125 -z-10"></div>
                                <div className="bg-accent/20 p-8 sm:p-12 rounded-full">
                                    <MdFoodBank className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 text-success" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-success bg-accent/20 p-4 rounded-2xl mb-6 inline-block">
                                Our Mission
                            </h2>

                            <p className="text-lg sm:text-xl text-neutral mb-6 leading-relaxed">
                                In a world where millions go to bed hungry while tons of good food are wasted every day,
                                we believe that <span className="font-black text-success">No meal should ever be thrown away</span>.
                            </p>

                            <p className="text-base sm:text-lg text-neutral leading-relaxed">
                                We are building a caring community in Bangladesh where surplus food from homes, events,
                                restaurants, and bakeries finds its way to those who need it most — families, students,
                                daily workers, and anyone with an empty plate and a hopeful heart.
                                <br /><br />
                                <span className="text-[#575f43] font-black text-xl">One plate at a time, we are fighting hunger and waste — Together.</span>
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 mt-10">
                                <div className="text-center bg-accent/20 px-6 sm:px-8 py-5 rounded-2xl min-w-32">
                                    <h3 className="text-4xl font-bold text-[#75805c]">100%</h3>
                                    <p className="text-sm font-bold text-[#75805c] mt-1">Free for Everyone</p>
                                </div>
                                <div className="text-center bg-accent/20 px-6 sm:px-8 py-5 rounded-2xl min-w-32">
                                    <h3 className="text-4xl font-bold text-[#75805c]">0</h3>
                                    <p className="text-sm font-bold text-[#75805c] mt-1">Food Waste Goal</p>
                                </div>
                                <div className="text-center bg-accent/20 px-6 sm:px-8 py-5 rounded-2xl min-w-32">
                                    <h3 className="text-4xl font-black text-[#75805c]">
                                        <ImInfinite className="w-12 h-12 mx-auto" />
                                    </h3>
                                    <p className="text-sm font-bold text-[#75805c] mt-1">Acts of Kindness</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtraSection;