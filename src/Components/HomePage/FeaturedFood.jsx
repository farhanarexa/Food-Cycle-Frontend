import { IoLocationSharp } from 'react-icons/io5';
import { MdFoodBank } from 'react-icons/md';
import CardButton from '../Buttons/CardButton';
import { Link, useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FeaturedFoodButton from '../Buttons/FeaturedFoodButton';
import { AuthContext } from '../../Contexts/AuthContext';

const extractQuantityNumber = (quantityStr) => {
    if (!quantityStr) return 0;
    const match = quantityStr.toString().match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
};

const FeaturedFood = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loadingFoods, setLoadingFoods] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then(res => res.json())
            .then(data => {
                const availableFoods = data.filter(food => food.available_status === true);

                const sortedByQuantity = availableFoods.sort((a, b) => {
                    return extractQuantityNumber(b.food_quantity) - extractQuantityNumber(a.food_quantity);
                });

                const top6 = sortedByQuantity.slice(0, 6);
                setFeaturedFoods(top6);
                setLoadingFoods(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingFoods(false);
            });
    }, []);

    const handleViewDetails = (id) => {
        if (!user || loading) {
            navigate('/login');
            return;
        }
        navigate(`/foodDetails/${id}`);
    };

    if (loadingFoods || loading) {
        return (
            <div className="text-center py-20">
                <span className="loading loading-spinner loading-lg text-success"></span>
            </div>
        );
    }

    if (featuredFoods.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-500">No foods available right now. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mx-auto py-12 bg-base-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-success text-center bg-accent/20 p-4 rounded-2xl mb-4">
                Featured Foods
            </h1>
            <p className="text-center text-sm sm:text-base md:text-xl text-[#575f43] mx-auto mb-12 max-w-4xl leading-relaxed">
                From one blessed home to another hungry heart — this is how love travels!
            </p>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                autoplay={{ delay: 2000 }}
                loop={true}
                pagination={{ type: 'fraction' }}
                className="featured-swiper pb-12"
            >
                {featuredFoods.map((food) => (
                    <SwiperSlide key={food._id}>
                        <div className="bg-base-200 rounded-2xl shadow-lg shadow-base-300 overflow-hidden border-10 border-base-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 w-full max-w-sm mx-auto group ">
                            <div className="relative">
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="badge badge-success text-white font-bold px-3 py-2 shadow-lg">
                                        Featured
                                    </span>
                                </div>

                                <div className="h-64 lg:h-72 px-3 py-3">
                                    <img
                                        src={food.food_image || '/placeholder.jpg'}
                                        alt={food.food_name}
                                        className="w-full h-full rounded-xl object-cover border-4 border-base-300 group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            <div className="p-5 text-center">
                                <h2 className="text-2xl md:text-3xl font-black text-success min-h-10">
                                    {food.food_name}
                                </h2>

                                <div className="flex items-center justify-center mt-3 gap-3">
                                    <img
                                        src={food.user_img_url || '/default-avatar.png'}
                                        alt={food.user_name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-success shadow-md"
                                    />
                                    <span className="bg-[#75805c] px-4 py-1.5 rounded-full text-white font-bold text-sm shadow">
                                        By {food.user_name}
                                    </span>
                                </div>

                                <div className="mt-4 text-sm text-neutral space-y-2 bg-accent/20 p-4 rounded-2xl">
                                    <div className="flex items-center justify-center gap-2 font-medium">
                                        <IoLocationSharp size={20} className="text-success" />
                                        <p className="truncate max-w-48">{food.pickup_location}</p>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 font-bold text-success text-lg">
                                        <MdFoodBank size={24} />
                                        <p>{food.food_quantity}</p>
                                    </div>

                                    <div className="tooltip tooltip-bottom" data-tip={new Date(food.expire_date).toLocaleDateString('en-GB')}>
                                        <span className="text-xs block">Available till:</span>
                                        <span className="badge badge-error text-white font-bold text-xs px-3 py-1.5">
                                            {new Date(food.expire_date).toDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 ">
                                    <button 
                                        className="w-full flex justify-center"
                                        onClick={() => handleViewDetails(food._id)}
                                       
                                    >
                                       <CardButton>View Details</CardButton>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Link to="/availableFoods" className="flex justify-center mt-10">
                <FeaturedFoodButton />
            </Link>
        </div>
    );
};

export default FeaturedFood;