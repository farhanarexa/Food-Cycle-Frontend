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
    const [hasRequested, setHasRequested] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user || !user.email) {
                navigate('/login');
            } else {
                fetchFoodDetails();
            }
        }
    }, [user, loading, navigate]);

    const fetchFoodDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/foods/${id}`);
            setFood(response.data);

            if (user) {
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

            const alreadyRequested = response.data.some(
                (req) => req.userEmail === user?.email
            );
            setHasRequested(alreadyRequested);
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

                await fetchFoodRequests(food._id);
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
        document.getElementById('food_requests_modal')?.close();

        const result = await Swal.fire({
            title: 'Confirm Accept',
            text: "Are you sure you want to accept this request?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                // Use the new endpoint for accepting requests
                const response = await axios.patch(`http://localhost:3000/foodRequestAccept/${requestId}`, {
                    userEmail: user.email
                });

                if (response.data) {
                    fetchFoodDetails();

                    Swal.fire({
                        title: 'Accepted!',
                        text: 'The request has been accepted and food marked as donated.',
                        icon: 'success'
                    });
                } else {
                    throw new Error('Failed to accept request');
                }
            } catch (error) {
                console.error('Error accepting request:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error accepting the request.',
                    icon: 'error'
                });
            }
        }
    };

    const handleRejectRequest = async (requestId) => {
        document.getElementById('food_requests_modal')?.close();
        const result = await Swal.fire({
            title: 'Confirm Reject',
            text: "Are you sure you want to reject this request?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                // Use the new endpoint for rejecting requests
                const response = await axios.patch(`http://localhost:3000/foodRequestReject/${requestId}`);

                if (response.data) {
                    fetchFoodDetails();

                    Swal.fire({
                        title: 'Rejected!',
                        text: 'The request has been rejected.',
                        icon: 'success'
                    });
                } else {
                    throw new Error('Failed to reject request');
                }
            } catch (error) {
                console.error('Error rejecting request:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error rejecting the request.',
                    icon: 'error'
                });
            }
        }
    };

    if (loadingFood) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-success"></span>
                    <p className="mt-4 text-success font-semibold">Loading food details...</p>
                </div>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-xl">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h2 className="text-2xl font-bold text-error mb-4">Food not found</h2>
                    <p className="text-gray-600 mb-6">The food item you're looking for doesn't exist or has been removed.</p>
                    <button
                        className="btn btn-primary bg-success hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl"
                        onClick={() => navigate(-1)}
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-6">
                    <button
                        className="btn btn-ghost text-success "
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Foods
                    </button>
                    <div className="text-sm text-gray-600">
                        {food.available_status ? (
                            <span className="badge badge-success text-white px-3 py-2">Available</span>
                        ) : (
                            <span className="badge badge-error text-white px-3 py-2">Donated</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={food.food_image || 'https://placehold.co/600x400'}
                            alt={food.food_name}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h1 className="text-4xl font-bold text-success mb-2">{food.food_name}</h1>
                        <p className="text-gray-600 mb-6">Shared by {food.user_name}</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-700 font-bold">📦</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Quantity</p>
                                    <p className="font-semibold text-emerald-700">{food.food_quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-700 font-bold">📍</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Pickup Location</p>
                                    <p className="font-semibold text-emerald-700">{food.pickup_location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-700 font-bold">📅</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Expires</p>
                                    <p className="font-semibold text-emerald-700">{new Date(food.expire_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-xl font-bold text-emerald-700 mb-4">Donator Information</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={food.user_img_url || 'https://placehold.co/80x80'}
                                    alt={food.user_name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-emerald-200"
                                />
                                <div>
                                    <p className="font-semibold text-emerald-700">{food.user_name}</p>
                                    <p className="text-gray-600 text-sm">{food.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-success mb-4">Additional Notes</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {food.additional_notes || 'No additional notes provided by the donor.'}
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="card-actions">
                        {user && user.email === food?.email ? (
                            <button
                                className="btn btn-success text-white text-lg font-semibold px-12 py-4 rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                onClick={() => document.getElementById('food_requests_modal').showModal()}
                            >
                                📋 View Food Requests
                            </button>
                        ) : (
                            <button
                                className={`btn text-white text-lg font-semibold px-12 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                                    hasRequested
                                        ? 'btn-success opacity-70 cursor-not-allowed'
                                        : food.available_status
                                            ? 'btn-success hover:bg-emerald-600'
                                            : 'btn-error opacity-70 cursor-not-allowed'
                                }`}
                                onClick={hasRequested ? null : handleRequestFood}
                                disabled={hasRequested || !food.available_status}
                            >
                                {hasRequested
                                    ? '✅ Requested'
                                    : food.available_status
                                        ? '🍽️ Request Food'
                                        : '❌ Not Available'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <dialog id="food_requests_modal" className="modal">
                <div className="modal-box w-11/12 max-w-7xl max-h-[80vh] overflow-hidden">
                    <h3 className="text-3xl font-bold text-center mb-6 text-success">Food Requests</h3>
                    <div className="overflow-y-auto max-h-[60vh]">
                        <table className="table">
                            <thead className="bg-emerald-600 text-white sticky top-0">
                                <tr>
                                    <th className="text-left">Requester</th>
                                    <th>Location</th>
                                    <th>Reason</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodRequests && foodRequests.length > 0 ? (
                                    foodRequests.map((request) => (
                                        <tr key={request._id} className="hover:bg-emerald-50">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-10 h-10 rounded-full border-2 border-emerald-300">
                                                            <img 
                                                                src={request.photoURL || 'https://placehold.co/40x40'} 
                                                                alt={request.name} 
                                                                className="w-full h-full rounded-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{request.name}</div>
                                                        <div className="text-sm text-gray-500">{request.userEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-medium">{request.writeLocation}</td>
                                            <td className="max-w-xs text-sm">{request.whyNeedFood}</td>
                                            <td className="font-semibold">{request.contactNo}</td>
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
                                                    <div className="flex gap-2">
                                                        <button 
                                                            className="btn btn-success btn-sm text-white"
                                                            onClick={() => handleAcceptRequest(request._id)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button 
                                                            className="btn btn-error btn-sm text-white"
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
                                        <td colSpan="6" className="text-center py-8 text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <span className="text-4xl mb-2">📭</span>
                                                <p>No requests for this food item yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action mt-4">
                        <form method="dialog">
                            <button className="btn btn-ghost">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default FoodDetails;
