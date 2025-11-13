import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/007/415/858/large_2x/holding-signboard-404-not-found-cute-pear-cartoon-vector.jpg"
                    alt="404 Error"
                    className="max-w-xl mx-auto rounded-2xl border-5 border-base-300 mb-8"
                />
                <h1 className="text-4xl md:text-5xl font-black text-success bg-accent/20 p-4 rounded-2xl mb-4">Oops! Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="btn bg-success px-7 text-white border-none hover:opacity-90 transition-all mt-4 rounded-4xl text-base"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;