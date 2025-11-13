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
            const response = await axios.get(`https://food-cycle-server-drab.vercel.app/my-foods?email=${user.email}`);
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

            await axios.patch(`https://food-cycle-server-drab.vercel.app/foods/${currentFood._id}`, updatedFoodData);

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
                await axios.delete(`https://food-cycle-server-drab.vercel.app/foods/${foodId}`);

                setFoods(foods.filter(food => food._id !== foodId));

                Swal.fire(
                    'Deleted!',
                    'Your food item has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting food:', error);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the food item.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-4 md:p-8">
            <div className="container mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-6 sm:mb-8 text-success bg-accent/20 p-3 sm:p-4 rounded-2xl">Manage My Foods</h1>
                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <span className="loading loading-spinner loading-md sm:loading-lg"></span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {Array.isArray(foods) && foods.length > 0 ? (
                            <table className="table bg-base-200 w-full border-2 sm:border-5 border-base-300 text-sm sm:text-base">
                                <thead className='text-center'>
                                    <tr className="bg-info/40 text-base sm:text-xl text-[#575f43]">
                                        <th className='bg-info/20 px-2 py-3 sm:px-4'>Food Name</th>
                                        <th className='px-2 py-3 sm:px-4'>Quantity</th>
                                        <th className='bg-info/20 px-2 py-3 sm:px-4'>Expiry Date</th>
                                        <th className='px-2 py-3 sm:px-4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((food) => (
                                        <tr className="hover:bg-accent/10 text-center" key={food._id}>
                                            <td className='bg-accent/10 px-2 py-3 sm:px-4'>{food.food_name}</td>
                                            <td className='px-2 py-3 sm:px-4'>{food.food_quantity}</td>
                                            <td className='bg-accent/10 px-2 py-3 sm:px-4'>{new Date(food.expire_date).toLocaleDateString()}</td>
                                            <td className='px-2 py-3 sm:px-4'>
                                                <button
                                                    className="btn btn-info btn-xs sm:btn-sm text-white mr-1 sm:mr-2"
                                                    onClick={() => handleUpdate(food)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-success text-white btn-xs sm:btn-sm"
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
                            <div className="text-center py-8 sm:py-10">
                                <p className="text-lg sm:text-xl text-gray-600">No food items found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-base-100 rounded-lg w-full max-w-xs sm:max-w-md p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                            <h2 className="text-xl sm:text-2xl bg-accent/20 px-4 sm:px-7 py-1 rounded-2xl text-success font-black mx-auto">Update Food Item</h2>
                            <button
                                className="btn btn-circle btn-ghost text-lg sm:text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="space-y-3 sm:space-y-4">
                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-xs sm:text-sm text-success font-semibold">Food Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-sm sm:input-md border-2 border-base-300 rounded-md text-[#575f43] font-bold"
                                    value={formData.foodName}
                                    onChange={handleFormChange}
                                    name="foodName"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-xs sm:text-sm text-success font-semibold">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-sm sm:input-md border-2 border-base-300 rounded-md text-[#575f43] font-bold"
                                    value={formData.foodQuantity}
                                    onChange={handleFormChange}
                                    name="foodQuantity"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-xs sm:text-sm text-success font-semibold">Expiry Date</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-sm sm:input-md border-2 border-base-300 rounded-md text-[#575f43] font-bold"
                                    value={formData.expireDate}
                                    onChange={handleFormChange}
                                    name="expireDate"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-xs sm:text-sm text-success font-semibold">Food Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-sm sm:input-md border-2 border-base-300 rounded-md text-[#575f43] font-bold"
                                    value={formData.foodImage}
                                    onChange={handleFormChange}
                                    name="foodImage"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-xs sm:text-sm text-success font-semibold">Pickup Location</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-sm sm:input-md border-2 border-base-300 rounded-md text-[#575f43] font-bold"
                                    value={formData.pickupLocation}
                                    onChange={handleFormChange}
                                    name="pickupLocation"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-xs sm:text-sm text-success font-semibold">Additional Notes</span>
                                </label>
                                <textarea
                                    className="textarea textarea-sm sm:textarea-md border-2 border-base-300 rounded-md text-[#575f43] font-bold"
                                    value={formData.additionalNotes}
                                    onChange={handleFormChange}
                                    name="additionalNotes"
                                    rows="2"
                                ></textarea>
                            </div>

                            <div className="modal-actions flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-info text-white btn-sm sm:btn-md"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success text-white btn-sm sm:btn-md"
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