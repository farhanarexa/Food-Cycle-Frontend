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
                await axios.patch(`http://localhost:3000/foodRequests/${requestId}`, {
                    requestStatus: 'accepted'
                });

                await axios.patch(`http://localhost:3000/foods/${food._id}`, {
                    available_status: false
                });

                fetchFoodDetails();

                Swal.fire({
                    title: 'Accepted!',
                    text: 'The request has been accepted and food marked as donated.',
                    icon: 'success'
                });
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
                await axios.patch(`http://localhost:3000/foodRequests/${requestId}`, {
                    requestStatus: 'rejected'
                } );

                fetchFoodDetails();



                Swal.fire({
                    title: 'Rejected!',
                    text: 'The request has been rejected.',
                    icon: 'success'
                });
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
        <div className="min-h-screen p-4 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <button
                    className="btn btn-info text-white mb-4"
                    onClick={() => navigate(-1)}
                >
                    ← Go Back
                </button>

                <div className="card bg-base-200 border-5 border-base-300 rounded-4xl shadow-xl">
                    <figure className="px-4 pt-4">
                        <img
                            src={food.food_image || 'https://placehold.co/400x300'}
                            alt={food.food_name}
                            className="w-full h-150 object-cover rounded-4xl border-4 border-base-300"
                        />
                    </figure>

                    <div className="card-body">
                        <h2 className="card-title text-4xl font-black mx-auto mb-10 text-success bg-accent/20 p-4 rounded-2xl">{food.food_name}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-4 border-base-300 rounded-4xl p-4">
                            <div className="space-y-2">
                                <div className=" flex gap-2 text-base text-neutral">
                                    <span className="font-bold">Quantity:</span>
                                    <span className="text-success font-black">{food.food_quantity}</span>
                                </div>
                                <div className=" flex gap-2 text-base text-neutral">
                                    <span className="font-bold">Expiry Date:</span>
                                    <span className="text-success font-black">{new Date(food.expire_date).toLocaleDateString()}</span>
                                </div>
                                <div className=" flex gap-2 text-base text-neutral">
                                    <span className="font-bold">Pickup Location:</span>
                                    <span className="text-success font-black">{food.pickup_location}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className=" flex gap-2 text-base text-neutral">
                                    <span className="font-bold">Available Status:</span>
                                    <span className={food.available_status ? 'text-success font-black' : 'text-[#75805c] font-black'}>
                                        {food.available_status ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                                <div className=" flex gap-2 text-base text-neutral">
                                    <span className="font-bold">Added By:</span>
                                    <span className="text-success font-black">{food.user_name}</span>
                                </div>
                                <div className=" flex gap-2 text-base text-neutral">
                                    <span className="font-bold">Donator Email:</span>
                                    <span className="text-success font-black">{food.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Donator Info */}
                        <div className="divider"></div>
                        <div className='border-4 border-[#75805c] rounded-4xl p-4 '>
                            <h3 className="text-xl text-center mb-2 text-[#75805c] font-black rounded-2xl">Donator Information</h3>
                            <div className="flex items-center space-x-3">
                                <img
                                    src={food.user_img_url || 'https://placehold.co/60x60'}
                                    alt={food.user_name}
                                    className="w-20 h-20 rounded-xl object-cover border-2 border-[#75805c]"
                                />
                                <div>
                                    <p className="font-semibold text-base"><span className="font-bold mr-2">Donator Name:</span><span className='font-black text-[#75805c]'>{food.user_name}</span></p>
                                    <p className="font-semibold text-base"><span className="font-bold mr-2">Donator Email:</span>
                                        <span className='font-black text-[#75805c]'>{food.email}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes*/}
                        <div className="divider"></div>
                        <div className='bg-accent/20 rounded-4xl p-4 '>
                            <h3 className="text-2xl text-success font-black text-center mb-4">Additional Notes</h3>
                            <p className="text-base font-semibold text-center">
                                {food.additional_notes || 'No additional notes provided.'}
                            </p>
                        </div>

                        {/* Request Food Button */}
                        <div className="card-actions justify-end mt-6">
                            <button
                                className="btn btn-info text-white text-base font-semibold px-10 rounded-3xl mx-auto"
                                onClick={handleRequestFood}
                                disabled={!food.available_status}
                            >
                                {food.available_status ? 'Request Food' : 'Not Available'}
                            </button>
                        </div>
                    </div>
                </div>


                {/* Button to open modal */}
                {user && user.email === food?.email && (
                    <button
                        className="btn mt-10"
                        onClick={() => document.getElementById('food_requests_modal').showModal()}
                    >
                        View Food Requests
                    </button>
                )}

                {/* Food Requests Modal */}
                <dialog id="food_requests_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-7xl">
                        <h3 className="text-4xl font-black text-center mb-4">Food Requests</h3>
                        <div className="overflow-x-auto">
                            <table className="table font-semibold text-base">
                                <thead className="text-white">
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
                                                    <span className={`badge ${request.requestStatus === 'accepted' ? 'badge-success' :
                                                        request.requestStatus === 'rejected' ? 'badge-error' : 'badge-warning'
                                                        }`}>
                                                        {request.requestStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    {request.requestStatus === 'pending' && (
                                                        <div className="flex space-x-2">
                                                            <button
                                                                className="btn bg-none btn-sm"
                                                                onClick={() => handleAcceptRequest(request._id)}
                                                            >
                                                                ✔️
                                                            </button>
                                                            <button
                                                                className="btn btn-sm"
                                                                onClick={() => handleRejectRequest(request._id)}
                                                            >
                                                                ❌
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
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>









            </div>
        </div>
    );
};

export default FoodDetails;