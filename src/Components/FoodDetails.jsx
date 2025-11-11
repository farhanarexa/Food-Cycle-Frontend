import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const FoodDetails = () => {
    const { id } = useParams();
    const { user, loading } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [loadingFood, setLoadingFood] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        if (!loading) {
            if (!user || !user.email) { // Check if user exists and has an email
                navigate('/login'); // Redirect to login if not logged in
            } else {
                fetchFoodDetails();
            }
        }
    }, [user, loading, navigate]);

    const fetchFoodDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/foods/${id}`);
            setFood(response.data);
        } catch (error) {
            console.error('Error fetching food details:', error);
        } finally {
            setLoadingFood(false);
        }
    };

    const handleRequestFood = async () => {
        if (!user || !user.email) {
            Swal.fire({
                title: 'Not Logged In',
                text: 'Please log in to request food items.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            navigate('/login'); // Redirect to login if not logged in
            return;
        }

        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: 'Request this food?',
                text: `Do you want to request ${food?.food_name}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, request it!'
            });

            if (result.isConfirmed) {
                // Make API call to request the food
                // Note: You'll need to replace this with your actual API endpoint
                await axios.post(`http://localhost:3000/food-requests`, {
                    foodId: food._id,
                    requesterEmail: user.email,
                    requesterName: user.displayName || user.email.split('@')[0],
                    foodName: food.food_name,
                    donatorEmail: food.email
                });
                
                Swal.fire(
                    'Requested!',
                    `Your request for ${food?.food_name} has been sent.`,
                    'success'
                );
            }
        } catch (error) {
            console.error('Error requesting food:', error);
            Swal.fire(
                'Error!',
                'There was an error processing your request.',
                'error'
            );
        }
    };

    if (loadingFood) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error">Food not found</h2>
                    <button 
                        className="btn btn-primary mt-4"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <button 
                    className="btn btn-ghost mb-6"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-4 pt-4">
                        <img 
                            src={food.food_image || 'https://placehold.co/400x300'} 
                            alt={food.food_name} 
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </figure>
                    
                    <div className="card-body">
                        <h2 className="card-title text-3xl">{food.food_name}</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Quantity:</span>
                                    <span>{food.food_quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Expiry Date:</span>
                                    <span>{new Date(food.expire_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Pickup Location:</span>
                                    <span>{food.pickup_location}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Available Status:</span>
                                    <span className={food.available_status ? 'text-success' : 'text-error'}>
                                        {food.available_status ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Added By:</span>
                                    <span>{food.user_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Donator Email:</span>
                                    <span>{food.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Donator Info Section */}
                        <div className="divider"></div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Donator Information</h3>
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={food.user_img_url || 'https://placehold.co/60x60'} 
                                    alt={food.user_name} 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{food.user_name}</p>
                                    <p className="text-sm text-gray-600">{food.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes Section */}
                        <div className="divider"></div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
                            <p className="text-gray-700 bg-base-200 p-4 rounded-lg">
                                {food.additional_notes || 'No additional notes provided.'}
                            </p>
                        </div>

                        {/* Request Food Button */}
                        <div className="card-actions justify-end mt-6">
                            <button 
                                className="btn btn-primary"
                                onClick={handleRequestFood}
                                disabled={!food.available_status}
                            >
                                {food.available_status ? 'Request Food' : 'Not Available'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;