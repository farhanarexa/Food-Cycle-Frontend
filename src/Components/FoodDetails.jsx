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
    const [foodRequests, setFoodRequests] = useState([]);
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
            
            // Also fetch requests for this food if user is the owner
            if (user && user.email === response.data.email) {
                await fetchFoodRequests(id);
            }
        } catch (error) {
            console.error('Error fetching food details:', error);
        } finally {
            setLoadingFood(false);
        }
    };

    const fetchFoodRequests = async (foodId) => {
        try {
            const response = await axios.get(`http://localhost:3000/food-requests-all/${foodId}`);
            setFoodRequests(response.data);
        } catch (error) {
            console.error('Error fetching food requests:', error);
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
            navigate('/login');
            return;
        }

        const { value: formValues } = await Swal.fire({
            title: 'Request Food Details',
            html: `<div class="text-left">
                    <div class="mb-3">
                        <label for="writeLocation" class="block text-sm font-medium mb-1">Pickup Location</label>
                        <input id="writeLocation" class="swal2-input w-full p-2 border rounded" placeholder="Your pickup location" />
                    </div>
                    <div class="mb-3">
                        <label for="whyNeedFood" class="block text-sm font-medium mb-1">Why do you need this food?</label>
                        <textarea id="whyNeedFood" class="swal2-textarea w-full p-2 border rounded h-20" placeholder="Briefly explain your situation"></textarea>
                    </div>
                    <div>
                        <label for="contactNo" class="block text-sm font-medium mb-1">Contact Number</label>
                        <input id="contactNo" class="swal2-input w-full p-2 border rounded" placeholder="Your phone number" />
                    </div>
                   </div>`,
            focusConfirm: false,
            preConfirm: () => {
                const writeLocation = document.getElementById('writeLocation').value;
                const whyNeedFood = document.getElementById('whyNeedFood').value;
                const contactNo = document.getElementById('contactNo').value;
                
                if (!writeLocation || !whyNeedFood || !contactNo) {
                    Swal.showValidationMessage('Please fill in all required fields');
                    return false;
                }
                
                return { writeLocation, whyNeedFood, contactNo };
            },
            showCancelButton: true,
            confirmButtonText: 'Request Food',
            cancelButtonText: 'Cancel'
        });

        if (formValues) {
            try {
                const requestData = {
                    writeLocation: formValues.writeLocation,
                    whyNeedFood: formValues.whyNeedFood,
                    contactNo: formValues.contactNo,
                    userEmail: user.email,
                    name: user.displayName || user.email.split('@')[0] || 'Anonymous',
                    photoURL: user.photoURL || ''
                };
                await axios.post(`http://localhost:3000/foodRequest/${food._id}`, requestData);
                
                Swal.fire(
                    'Requested!',
                    `Your request for ${food?.food_name} has been sent.`,
                    'success'
                );
            } catch (error) {
                console.error('Error requesting food:', error);
                Swal.fire(
                    'Error!',
                    'There was an error processing your request.',
                    'error'
                );
            }
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await axios.patch(`http://localhost:3000/foodRequests/${requestId}`, {
                requestStatus: 'accepted'
            });

            await axios.patch(`http://localhost:3000/foods/${food._id}`, {
                available_status: false
            });

            fetchFoodDetails();
            
            Swal.fire(
                'Accepted!',
                'The request has been accepted and food marked as donated.',
                'success'
            );
        } catch (error) {
            console.error('Error accepting request:', error);
            Swal.fire(
                'Error!',
                'There was an error accepting the request.',
                'error'
            );
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await axios.patch(`http://localhost:3000/foodRequests/${requestId}`, {
                requestStatus: 'rejected'
            });
            fetchFoodDetails();
            
            Swal.fire(
                'Rejected!',
                'The request has been rejected.',
                'success'
            );
        } catch (error) {
            console.error('Error rejecting request:', error);
            Swal.fire(
                'Error!',
                'There was an error rejecting the request.',
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

                        {/* Donator Info */}
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

                        {/* Additional Notes*/}
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

                {/* Food Requests Table*/}
                {user && user.email === food?.email && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Food Requests</h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Why Need</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodRequests && foodRequests.length > 0 ? (
                                        foodRequests.map((request) => (
                                            <tr key={request._id}>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img 
                                                                    src={request.photoURL || 'https://placehold.co/40x40'} 
                                                                    alt={request.name} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{request.name}</div>
                                                            <div className="text-sm opacity-50">{request.userEmail}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{request.writeLocation}</td>
                                                <td className="max-w-xs">{request.whyNeedFood}</td>
                                                <td>{request.contactNo}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        request.requestStatus === 'accepted' ? 'badge-success' :
                                                        request.requestStatus === 'rejected' ? 'badge-error' : 'badge-warning'
                                                    }`}>
                                                        {request.requestStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    {request.requestStatus === 'pending' && (
                                                        <div className="flex space-x-2">
                                                            <button 
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => handleAcceptRequest(request._id)}
                                                            >
                                                                Accept
                                                            </button>
                                                            <button 
                                                                className="btn btn-error btn-sm"
                                                                onClick={() => handleRejectRequest(request._id)}
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                No requests for this food item yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodDetails;