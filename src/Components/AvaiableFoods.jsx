import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CardButton from './Buttons/CardButton';
import { IoLocationSharp } from 'react-icons/io5';
import { MdFoodBank } from 'react-icons/md';

const AvaiableFoods = () => {
    const navigate = useNavigate();
    const isLoggedIn = false;

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    const handleViewDetails = (id) => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        navigate(`/foodDetails/${id}`);
    };

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-25 mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-success text-center bg-accent/20 p-4 rounded-2xl mt-10 mb-4">
                Available Foods
            </h1>
            <p className="text-center text-sm sm:text-base md:text-xl text-[#575f43] mx-auto mb-8 sm:mb-10 mt-4 sm:mt-5 leading-relaxed">
                Fresh, free, and just around the corner. Browse surplus shared by your neighbors—home-cooked dishes, garden harvests, bakery extras, and more. <br /> Claim what you need with a tap, pick up safely, and turn someone's extra into your next warm meal. Every choice fights waste and feeds hope.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 justify-items-center">
                {foods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-base-200 rounded-2xl shadow-lg shadow-base-300 overflow-hidden border-10 border-base-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 w-full max-w-sm group"
                    >
                        <div className="h-50 w-full sm:h-56 md:h-64 lg:h-70 px-2 sm:px-3 py-2 sm:py-3">
                            <img
                                src={food.food_image}
                                alt={food.food_name}
                                className="w-full h-full rounded-xl object-cover border-4 border-base-300 group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-3 sm:p-4 text-center">
                            <div className="flex justify-between items-center gap-2 mx-auto max-w-fit">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-success text-left line-clamp-2">
                                    {food.food_name}
                                </h2>
                            </div>

                            <div className="flex items-center justify-center mt-2">
                                <img
                                    src={food.user_img_url}
                                    alt={food.user_name}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-success"
                                />
                                <span className="text-sm sm:text-sm bg-[#75805c] px-3 py-1 rounded-full text-white font-bold ml-2 sm:max-w-none">
                                    By {food.user_name}
                                </span>
                            </div>

                            <div className="mt-3 text-xs sm:text-sm text-neutral space-y-1 bg-accent/20 p-3 rounded-2xl">
                                <div className="flex items-center justify-center gap-1">
                                    <IoLocationSharp size={18} />
                                    <p className="font-semibold truncate">{food.pickup_location}</p>
                                </div>
                                <div className="flex items-center justify-center gap-1 font-bold">
                                    <MdFoodBank size={18} />
                                    <p>{food.food_quantity}</p>
                                </div>
                                <div className="tooltip mt-2" data-tip={food.expire_date}>
                                    <div>
                                        Available till:
                                    </div>
                                    <span className="badge badge-error text-white font-bold text-xs px-2 py-1">
                                        {new Date(food.expire_date).toDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-5">
                                <button
                                    onClick={() => handleViewDetails(food._id)}
                                    className="w-full flex items-center justify-center text-sm sm:text-base"
                                    aria-label="View food details"
                                >
                                    <CardButton>View Details</CardButton>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvaiableFoods;