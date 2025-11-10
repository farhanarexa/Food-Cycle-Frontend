import { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowSuccess(false);
        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            await signInUser(email, password);
            setShowSuccess(true);
            toast.success('Logged in successfully.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            toast.error(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setShowSuccess(false);
        try {
            await signInWithGoogle();
            toast.success('Logged in successfully.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            toast.error(err.message || 'Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-100 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-200 w-full shrink-0 shadow-2xl px-5 py-10 m-20 rounded-4xl">
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="text-4xl text-success font-black">Login Now!</h1>
                            <p className="py-3 text-success font-semibold">
                                Don't have an account?{' '}
                                <a href="/register" className="text-lime-700 font-black hover:underline">
                                    Register Now
                                </a>
                            </p>
                        </div>

                        <form onSubmit={handleEmailLogin}>
                            <fieldset className="fieldset">
                                <label className="label text-base font-semibold text-neutral">Email</label>
                                <input name="email" type="email" className="input w-full" placeholder="Email" required />

                                <label className="label mt-4 text-base font-semibold text-neutral">Password</label>
                                <input name="password" type="password" className="input w-full" placeholder="Password" required />

                                <div>
                                    <a className="link link-hover text-base text-success">Forgot password?</a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-success px-7 text-white border-none font-bold hover:opacity-90 transition-all mt-4 text-base"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>

                                <div>
                                    <p className="divider text-base font-semibold text-[#001931] mt-6">OR</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="btn btn-outline px-7 hover:bg-[#75805c] border-[#75805c] font-bold text-[#575f43] hover:text-white transition-all text-base"
                                >
                                    <FaGoogle size={20} className="mr-1" />
                                    {loading ? 'Signing in...' : 'Sign In with Google'}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const toast = (type, message) => {
    let container = document.querySelector('.toast-container') || createToastContainer();
    const el = document.createElement('div');
    el.className = `alert alert-${type} shadow-lg p-3 rounded-md mb-2 max-w-xs`;
    el.innerHTML = `<span>${message}</span>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);
};

toast.success = (msg) => toast('success', msg);
toast.error = (msg) => toast('error', msg);

const createToastContainer = () => {
    const div = document.createElement('div');
    div.className = 'toast-container fixed top-20 right-4 z-[1000] space-y-2';
    document.body.appendChild(div);
    return div;
};

export default Login;



