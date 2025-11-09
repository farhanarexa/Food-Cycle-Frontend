// Navbar.jsx
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

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
                <NavLink to="/allProducts">All Products</NavLink>
            </li>
            <li>
                <NavLink to="/myProducts">My Products</NavLink>
            </li>
            <li>
                <NavLink to="/myBids">My Food</NavLink>
            </li>
            <li>
                <NavLink to="/createProducts">Create Food</NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-base font-semibold"
                        >
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-3xl font-bold">
                        Food <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Cycle</span>
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex text-base font-semibold">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>


                <div className="navbar-end flex gap-2">
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : user ? (
                        <button
                            onClick={handleLogout}
                            className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] px-7 text-white border-none hover:opacity-90 transition-all"> Logout </button>) :
                        (<>
                            <Link
                                to="/login"
                                className="btn bg-transparent text-[#632EE3] border-2 border-[#9F62F2] hover:text-white hover:bg-linear-to-r hover:from-[#632EE3] hover:to-[#9F62F2] px-7 transition-all"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] px-7 text-white border-none hover:opacity-90 transition-all"
                            >
                                Register
                            </Link>
                        </>)}
                </div>
            </div>
        </div>
    );
};

export default Navbar;