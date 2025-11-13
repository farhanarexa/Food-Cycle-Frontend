// Navbar.jsx
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import NavbarButton from '../Buttons/NavbarButton';

const Navbar = () => {
    const { user, signOutUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/availableFoods">Available Foods</NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-[#75805c] shadow-sm px-4 sm:px-6 md:px-8 lg:px-16 xl:px-25">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className=" mr-3 text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-[#575f43] text-white rounded-box z-1 mt-3 w-52 p-2 shadow text-base font-semibold"
                        >
                            {links}
                        </ul>
                    </div>
                    <a href="/" className="font-[fredoka] text-white text-2xl sm:text-3xl font-semibold">FoodCycle</a>
                </div>

                <div className="navbar-center hidden lg:flex text-white text-base font-semibold">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-base-100">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User profile"
                                        src={user.photoURL || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} 
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content font-semibold bg-[#575f43] text-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/addFood" className="justify-between">
                                        Add Food
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/manageMyFoods" className="justify-between">
                                        Manage My Foods
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/myFoodRequests" className="justify-between">
                                        My Food Requests
                                    </Link>
                                </li>
                                <li><a onClick={handleLogout} className="justify-between">Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <NavbarButton />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;