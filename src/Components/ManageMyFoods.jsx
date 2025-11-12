import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);
    const [formData, setFormData] = useState({
        foodName: '',
        foodQuantity: '',
        expireDate: '',
        additionalNotes: '',
        foodImage: '',
        pickupLocation: ''
    });

    useEffect(() => {
        if (user) {
            fetchUserFoods();
        }
    }, [user]);

    const fetchUserFoods = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/my-foods?email=${user.email}`);
            setFoods(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching user foods:', error);
            setFoods([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (food) => {
        setCurrentFood(food);
        setFormData({
            foodName: food.food_name,
            foodQuantity: food.food_quantity,
            expireDate: food.expire_date.substring(0, 10),
            additionalNotes: food.additional_notes || '',
            foodImage: food.food_image || '',
            pickupLocation: food.pickup_location || ''
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedFoodData = {
                food_name: formData.foodName,
                food_quantity: parseInt(formData.foodQuantity),
                expire_date: formData.expireDate,
                additional_notes: formData.additionalNotes,
                food_image: formData.foodImage,
                pickup_location: formData.pickupLocation
            };

            await axios.patch(`http://localhost:3000/foods/${currentFood._id}`, updatedFoodData);

            setFoods(foods.map(food =>
                food._id === currentFood._id ? {
                    ...food,
                    food_name: formData.foodName,
                    food_quantity: parseInt(formData.foodQuantity),
                    expire_date: formData.expireDate,
                    additional_notes: formData.additionalNotes,
                    food_image: formData.foodImage,
                    pickup_location: formData.pickupLocation
                } : food
            ));

            setShowModal(false);
            setCurrentFood(null);
        } catch (error) {
            console.error('Error updating food:', error);
        }
    };

    const handleDelete = async (foodId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#A47C59',
            cancelButtonColor: '#75805c',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/foods/${foodId}`);


                setFoods(foods.filter(food => food._id !== foodId));

                Swal.fire(
                    'Deleted!',
                    'Your food item has been deleted.',
                    'Success'
                );
            } catch (error) {
                console.error('Error deleting food:', error);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the food item.',
                    'Error'
                );
            }
        }
    };

    return (
        <div className="min-h-screen  p-4 md:p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-4xl font-black text-center mb-8 text-success bg-accent/20 p-4 rounded-2xl">Manage My Foods</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {Array.isArray(foods) && foods.length > 0 ? (
                            <table className="table bg-base-200 w-full border-5 border-base-300">
                                <thead className='text-center'>
                                    <tr className="bg-info/40 text-xl text[#575f43]">
                                        <th className='bg-info/20'>Food Name</th>
                                        <th className=''>Quantity</th>
                                        <th className='bg-info/20'>Expiry Date</th>
                                        <th className=''>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((food) => (
                                        <tr className="hover:bg-accent/10 text-center" key={food._id}>
                                            <td className='bg-accent/10'>{food.food_name}</td>
                                            <td>{food.food_quantity}</td>
                                            <td className='bg-accent/10'>{new Date(food.expire_date).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm text-white mr-2"
                                                    onClick={() => handleUpdate(food)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-success text-white btn-sm"
                                                    onClick={() => handleDelete(food._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-600">No food items found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Update Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-base-100 rounded-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl bg-accent/20 px-7 py-1 rounded-2xl text-success font-black mx-auto">Update Food Item</h2>
                            <button
                                className="btn btn-circle btn-ghost text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm text-success font-semibold">Food Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input border-2 border-base-300 rounded-md text-[#575f43] px-3 py-2 w-full font-bold"
                                    value={formData.foodName}
                                    onChange={handleFormChange}
                                    name="foodName"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm text-success font-semibold">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    className="input border-2 border-base-300 rounded-md text-[#575f43] px-3 py-2 w-full font-bold"
                                    value={formData.foodQuantity}
                                    onChange={handleFormChange}
                                    name="foodQuantity"
                                    required
                                />
                            </div>

                            <div className="form-control flex flex-col">
                                <label className="label">
                                    <span className="label-text text-sm text-success font-semibold">Expiry Date</span>
                                </label>
                                <input
                                    type="date"
                                    className="input border-2 border-base-300 rounded-md text-[#575f43] px-3 py-2 w-full font-bold"
                                    value={formData.expireDate}
                                    onChange={handleFormChange}
                                    name="expireDate"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm text-success font-semibold">Food Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    className="input border-2 border-base-300 rounded-md text-[#575f43] px-3 py-2 w-full font-bold"
                                    value={formData.foodImage}
                                    onChange={handleFormChange}
                                    name="foodImage"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm text-success font-semibold">Pickup Location</span>
                                </label>
                                <input
                                    type="text"
                                    className="input border-2 border-base-300 rounded-md text-[#575f43] px-3 py-2 w-full font-bold"
                                    value={formData.pickupLocation}
                                    onChange={handleFormChange}
                                    name="pickupLocation"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm text-success font-semibold">Additional Notes</span>
                                </label>
                                <textarea
                                    className="textarea border-2 border-base-300 rounded-md text-[#575f43] px-3 py-2 w-full font-bold"
                                    value={formData.additionalNotes}
                                    onChange={handleFormChange}
                                    name="additionalNotes"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="modal-actions flex justify-end space-x-2 pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-info text-white"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success text-white"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMyFoods;