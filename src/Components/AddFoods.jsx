// // src/Components/AddFoods.jsx
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase.init";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiHandHeartFill } from "react-icons/pi";


export default function AddFoods() {
    const [user, loading] = useAuthState(auth);
    const [imageUploading, setImageUploading] = useState(false);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!user) {
        window.location.href = "/login";
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageUploading(true);

        const form = e.target;
        const foodName = form.foodName.value;
        const quantity = parseInt(form.quantity.value);
        const location = form.location.value;
        const expireDate = form.expireDate.value;
        const notes = form.notes.value;
        const imageUrl = form.foodImage.value;

        if (!imageUrl) {
            toast.error("Please add a food image URL");
            setImageUploading(false);
            return;
        }

        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
        const isImageUrl = imageExtensions.some(ext => imageUrl.toLowerCase().includes(ext));

        if (!isImageUrl) {
            toast.error("Please provide a valid image URL (jpg, png, webp, etc.)");
            setImageUploading(false);
            return;
        }

        const foodInfo = {
            food_name: foodName,
            food_image: imageUrl,
            food_quantity: quantity,
            pickup_location: location,
            expire_date: expireDate,
            additional_notes: notes || "",

            user_name: user.displayName || "Anonymous User",
            email: user.email,
            user_img_url: user.photoURL || "https://i.ibb.co.com/default-avatar.jpg",
            available_status: true
        };

        try {
            const response = await fetch("http://localhost:3000/foods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(foodInfo),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to add food");
            }

            toast.success("Food donated successfully! Thank you so much ❤️");
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to donate food. Try again.");
        } finally {
            setImageUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-20 p-6  bg-base-200 rounded-4xl border-5 border-base-300">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-success text-center bg-accent/20 p-4 rounded-2xl m-5">Add Food</h1>
            <p className="text-center text-sm sm:text-base md:text-xl text-[#575f43] mx-auto mb-8 sm:mb-10">Join hands in reducing food waste and supporting community</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="floating-label">
                    <input type="text" name="foodName" placeholder="Food Name" required className="input input-bordered border-2 w-full p-5 rounded-4xl bg-accent/20 font-bold" />
                    <span>Food Name</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="floating-label">
                        <input type="number" name="quantity" placeholder="Quantity" required className="input input-bordered border-2 w-full p-5 rounded-4xl bg-accent/20 font-bold" />
                        <span>Quantity</span>
                    </div>

                    <div className="floating-label">
                        <input type="text" name="location" placeholder="Pickup Location" required className="input input-bordered border-2 w-full p-5 rounded-4xl bg-accent/20 font-bold" />
                        <span>Pickup Location</span>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="floating-label">
                        <input type="text" name="foodImage" placeholder="Food Img URL (e.g. https://example.com/image.jpg)" required className="input input-bordered border-2 w-full p-5 rounded-4xl bg-accent/20 font-bold" />
                        <span>Food Image URL</span>
                    </div>

                    <div className="floating-label">
                        <input type="datetime-local" name="expireDate" required className="input input-bordered border-2 w-full p-5 rounded-4xl bg-accent/20 font-bold" />
                        <span>Expiry Date</span>
                    </div>
                </div>

                <div className="floating-label">
                    <textarea name="notes" placeholder="Additional Notes" className="textarea textarea-lg input-bordered border-2 w-full p-5 rounded-4xl bg-accent/20 font-bold" rows="3"></textarea>
                    <span>Additional Notes</span>
                </div>

                <div className="bg-[#75805c] p-3 rounded-2xl border-3 border-[#75805c] flex items-center">
                    {user.photoURL && <img src={user.photoURL} alt="User" className="w-13 h-13 mr-3 rounded-xl border-2 border-white" />}
                    <div>
                        <p className="font-black text-lg text-white ">Donated by</p>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-white font-bold bg-[#575f43] px-3 rounded-2xl">{user.displayName || user.email}</p>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={imageUploading}
                    className="btn bg-success px-7 rounded-4xl text-white border-none font-bold hover:opacity-90 transition-all mt-4 text-base w-full flex items-center justify-center gap-2"
                >
                    <div className="flex items-center gap-2">
                        <div>
                            {imageUploading ? "Adding..." : "Donate Food"}
                        </div>
                        <div>
                            <PiHandHeartFill size={27} />
                        </div>
                    </div>
                </button>
            </form>
        </div>
    );
}




