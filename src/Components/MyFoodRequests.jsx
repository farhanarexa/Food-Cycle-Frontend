import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const MyFoodRequests = () => {
    const { user, loading } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user && !loading) {
            fetchUserRequests();
        }
    }, [user, loading]);

    const fetchUserRequests = async () => {
        try {
            const response = await fetch(`https://food-cycle-server-drab.vercel.app/my-all-food-requests?email=${user.email}`);
            const data = await response.json();
            console.log(data);

            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching user requests:', error);
            setRequests([]);
        } finally {
            setLoadingRequests(false);
        }
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleDeleteRequest = async (requestId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#A47C59',
            cancelButtonColor: '#75805c',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://food-cycle-server-drab.vercel.app/myFoodRequest/${requestId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setRequests(requests.filter(request => request._id !== requestId));
                    Swal.fire(
                        'Deleted!',
                        'Your food request has been deleted.',
                        'success'
                    );
                } else {
                    throw new Error('Failed to delete the request');
                }
            } catch (error) {
                console.error('Error deleting request:', error);
                Swal.fire(
                    'Error!',
                    'There was an error deleting your request.',
                    'error'
                );
            }
        }
    };

    if (loading || loadingRequests) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-success"></span>
                    <p className="mt-4 text-success font-semibold">Loading your food requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-success text-center bg-accent/20 p-4 rounded-2xl mt-10 mb-8">
                    My Food Requests
                </h1>

                {requests.length > 0 ? (
                    <div className="overflow-x-auto bg-base-200 rounded-3xl shadow-xl p-6">
                        <table className="table">
                            <thead className="bg-[#75805c] text-white">
                                <tr className="text-center">
                                    <th>Food Item</th>
                                    <th>Donor</th>
                                    <th>Location</th>
                                    <th>Reason</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {requests.map((request) => (
                                    <tr key={request._id} className="hover:bg-base-300/10">
                                        <td>
                                            <div className="flex items-center gap-1 bg-[#75805c]/10 p-2 rounded-lg h-15">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-full border-2 border-success">
                                                        <img
                                                            src={request.foodDetails?.food_image || 'https://placehold.co/40x40'}
                                                            alt={request.foodDetails?.food_name}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-black font-lg ">{request.foodDetails?.food_name}</div>
                                                    <div className="text-sm text-success font-semibold">{request.foodDetails?.food_quantity}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-semibold">
                                            <div className="flex items-center gap-2 bg-accent/10 p-2 rounded-lg h-15">
                                                <img
                                                    src={request.foodDetails?.user_img_url || 'https://placehold.co/30x30'}
                                                    alt={request.foodDetails?.user_name}
                                                    className="w-8 h-8 rounded-full object-cover border border-success"
                                                />
                                                {request.foodDetails?.user_name}
                                            </div>
                                        </td>
                                        <td className="font-medium">{request.writeLocation}</td>
                                        <td className="max-w-xs text-sm truncate">{request.whyNeedFood}</td>
                                        <td className="font-semibold">{request.contactNo}</td>
                                        <td>
                                            <span className={`badge ${request.requestStatus === 'accepted' ? 'badge-success' :
                                                    request.requestStatus === 'rejected' ? 'badge-success text-white' : 'badge-accent text-white'
                                                }`}>
                                                {request.requestStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-info btn-sm text-white"
                                                    onClick={() => handleViewDetails(request)}
                                                >
                                                    Details
                                                </button>
                                                {request.requestStatus === 'pending' && (
                                                    <button
                                                        className="btn btn-success btn-sm text-white"
                                                        onClick={() => handleDeleteRequest(request._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl p-8">
                        <div className="flex flex-col items-center">
                            <span className="text-7xl mb-4">📭</span>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Requests Found</h3>
                            <p className="text-gray-600 mb-6">You haven't requested for any food items yet.</p>
                            <p className="text-gray-500">Browse available foods and request items you need!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Request Details Modal */}
            {showModal && selectedRequest && (
                <dialog className="modal" open>
                    <div className="modal-box w-11/12 max-w-3xl rounded-4xl bg-base-200">
                        <h3 className="text-3xl font-black text-center text-success mb-4">Request Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-accent/20 border-5 border-base-300 rounded-4xl p-4">
                                <h4 className="font-black text-center text-xl mb-5 text-success">Food Information</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-black">Name:</span>
                                        <span className="font-semibold">{selectedRequest.foodDetails?.food_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-black">Quantity:</span>
                                        <span className="font-semibold">{selectedRequest.foodDetails?.food_quantity} servings</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-black">Expiry Date:</span>
                                        <span className="font-semibold">{new Date(selectedRequest.foodDetails?.expire_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-black">Pickup Location:</span>
                                        <span className="text-right font-semibold">{selectedRequest.foodDetails?.pickup_location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-black">Food Availability:</span>
                                        <span className="text-right font-semibold">{selectedRequest.foodDetails?.available_status ? 'Available' : 'Donated'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-info/10 border-5 border-info/50 rounded-4xl p-4">
                                <h4 className="font-black text-center text-xl mb-5 text-info">Donor Information</h4>
                                <div className="space-y-2">
                                    <div className="flex flex-col items-center gap-2">
                                        <img
                                            src={selectedRequest.foodDetails?.user_img_url || 'https://placehold.co/40x40'}
                                            alt={selectedRequest.foodDetails?.user_name}
                                            className="w-20 h-20 rounded-full object-cover border-4 border-base-300"
                                        />
                                        <span className="font-bold text-lg">{selectedRequest.foodDetails?.user_name}</span>
                                    </div>
                                    <div className="flex gap-2 justify-center">
                                        <span className="font-bold">Email:</span>
                                        <span className='font-bold'>{selectedRequest.foodDetails?.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-info/10 border-5 border-info/50 rounded-4xl p-4">
                                <h4 className="font-black text-center text-xl mb-5 text-info">Your Request Details</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-black">Your Location:</span>
                                        <span className="text-right font-semibold">{selectedRequest.writeLocation}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-black">Contact Number:</span>
                                        <span className="text-right font-semibold">{selectedRequest.contactNo}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-black">Status:</span>
                                        <span className={`badge ${selectedRequest.requestStatus === 'accepted' ? 'badge-success' :
                                                selectedRequest.requestStatus === 'rejected' ? 'badge-success text-white' : 'badge-accent text-white'
                                            }`}>
                                            {selectedRequest.requestStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-accent/20 border-5 border-base-300 rounded-4xl p-4">
                                <h4 className="font-black text-center text-xl mb-5 text-success">Your Reason</h4>
                                <p className="text-center font-bold p-3 rounded-lg">{selectedRequest.whyNeedFood}</p>
                            </div>
                        </div>

                        {selectedRequest.requestStatus === 'accepted' && (
                            <div className="mt-4 p-4 bg-success/10 border-5 border-success rounded-2xl">
                                <p className="text-success font-semibold text-center">🎉 Great news! Your request has been accepted.</p>
                                <p className="text-center mt-2">Please contact the donor directly to arrange pickup.</p>
                            </div>
                        )}

                        <div className="modal-action mt-6">
                            <form method="dialog">
                                <button
                                    className="btn btn-success px-7 text-white border-none hover:opacity-90 transition-all mt-4 rounded-4xl text-base"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyFoodRequests;