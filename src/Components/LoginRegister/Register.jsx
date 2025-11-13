import React, { useContext, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const Register = () => {

    const { createUser, signInWithGoogle, loading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const imgUrl = form.imgUrl.value;
        const password = form.password.value;
        console.log(name, email, imgUrl, password);

        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }
        try {
            await createUser(email, password);
            form.reset();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogle = async () => {
        setError('');
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="hero bg-base-100 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-200 w-full shrink-0 shadow-2xl px-5 py-10 m-20 rounded-4xl border-7 border-base-300">
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="text-4xl text-success font-black">Register Now!</h1>
                            <p className="py-3 text-success font-semibold">
                                Don't have an account?{' '}
                                <a href="/login" className="text-lime-700 font-black hover:underline">
                                    Login Now
                                </a>
                            </p>
                        </div>

                        {/* Error (only shows when needed - doesn't break layout) */}
                        {error && (
                            <div className="alert alert-error shadow-lg mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name */}
                                <label className="label text-base font-semibold text-neutral">Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    className="input w-full"
                                    placeholder="Your Name"
                                    required
                                />

                                {/* email */}
                                <label className="label text-base font-semibold text-neutral">Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    className="input w-full"
                                    placeholder="Your Email"
                                    required
                                />

                                {/* image Url */}
                                <label className="label text-base font-semibold text-neutral">Image-URL</label>
                                <input
                                    type="text"
                                    name='imgUrl'
                                    className="input w-full"
                                    placeholder="Image-URL"
                                />

                                {/* password */}
                                <label className="label mt-4 text-base font-semibold text-neutral">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        className="input w-full pr-10"
                                        placeholder="Password"
                                        required
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-success px-7 text-white border-none hover:opacity-90 transition-all mt-4 text-base"
                                >
                                    {loading ? 'Registering...' : 'Register '}
                                </button>

                                <div>
                                    <p className="divider text-base font-semibold text-[#001931] mt-6">OR</p>
                                </div>

                                {/* google login */}
                                <button
                                    type="button"
                                    onClick={handleGoogle}
                                    disabled={loading}
                                    className="btn btn-outline px-7 hover:bg-[#75805c] border-[#75805c] font-bold text-[#575f43] hover:text-white transition-all text-base"
                                >
                                    <FaGoogle size={20} className="mr-1" />
                                    Sign In with Google
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;