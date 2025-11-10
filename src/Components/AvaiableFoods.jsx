import React from 'react';
import { Link, useNavigate } from 'react-router';
import CardButton from './Buttons/CardButton';
import { IoLocationSharp } from 'react-icons/io5';
import { MdFoodBank, MdOutlineFoodBank } from 'react-icons/md';

const AvaiableFoods = () => {

    const navigate = useNavigate();
    const isLoggedIn = false; 
    const handleViewDetails = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        navigate(`/foodDetails/:id`);
    };

    return (
        <div className="mx-25">
            <h1 className="text-5xl mx-auto font-bold text-success text-center mt-10">
                Available Foods
            </h1>
            <p className="text-center text-xl text-neutral mx-auto mb-10 mt-5">Fresh, free, and just around the corner. Browse surplus shared by your neighbors—home-cooked dishes, garden harvests, bakery extras, and more. <br />Claim what you need with a tap, pick up safely, and turn someone's extra into your next warm meal. Every choice fights waste and feeds hope.</p>
            {/* Food Card */}
            <div className="bg-base-200 rounded-2xl shadow-md overflow-hidden border border-base-200 transition hover:shadow-lg max-w-sm">
                {/* Image */}
                <div className="h-70 px-3 py-3 ">
                    <img
                        src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=70"
                        alt="Homemade Lasagna"
                        className="w-full h-full rounded-xl object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                    <div className="flex justify-between items-center gap-2 mx-auto max-w-fit">
                        <h2 className="text-3xl font-black text-success flex-1 text-left">Homemade Lasagna</h2>
                       
                    </div>

                    {/* Donor */}
                    <div className="flex items-center justify-center mt-2">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                            alt="Maria"
                            className="w-9 h-9 rounded-full object-cover border border-success"
                        />
                        <span className="text-md text-neutral font-bold ml-2">By Maria</span>
                    </div>

                    {/* Pickup & Quantity */}
                    <div className="mt-3 text-sm text-neutral">
                        <div className="flex items-center justify-center">
                            <IoLocationSharp size={22} />
                            <p className='font-semibold' > 123 Oak St, Springfield</p>
                        </div>
                        <div className="flex items-center justify-center font-bold">
                            <MdFoodBank size={22} />
                            <p className="mt-1"> 3 servings available</p>
                        </div>
                        <div className="tooltip mt-3" data-tip="Expires Nov 12, 2025">
                            <span className="badge badge-error text-white font-bold text-xs">Nov 12</span>
                        </div>
                
                    </div>

                    {/* Button */}
                    <div className="mt-5">
                        <button
                            onClick={handleViewDetails}
                            className="w-full flex items-center justify-center"
                            aria-label="View food details"
                        >
                            <CardButton>View Details</CardButton>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AvaiableFoods;