import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
    const { signInUser, signInWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            await signInUser(email, password);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err.message);
            alert(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (err) {
            console.error('Google login error:', err.message);
            alert(err.message);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full shrink-0 shadow-2xl px-5 py-10 m-20">
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold">Login Now!</h1>
                            <p className="py-3 font-semibold">
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-bold hover:underline"
                                >
                                    Register Now
                                </a>
                            </p>
                        </div>

                        <form onSubmit={handleEmailLogin}>
                            <fieldset className="fieldset">
                                {/* email */}
                                <label className="label text-base font-semibold text-[#001931]">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="input w-full"
                                    placeholder="Email"
                                    required
                                />

                                {/* password */}
                                <label className="label mt-4 text-base font-semibold text-[#001931]">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    className="input w-full"
                                    placeholder="Password"
                                    required/>

                                <div>
                                    <a className="link link-hover text-base text-[#001931]">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] px-7 text-white border-none hover:opacity-90 transition-all mt-4 text-base">
                                    {loading ? 'Logging in…' : 'Login'}
                                </button>

                                <div>
                                    <p className="divider text-base font-semibold text-[#001931] mt-6">
                                        OR
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="btn btn-outline px-7 hover:bg-linear-to-r from-[#632EE3] to-[#9F62F2] border-[#632EE3] font-semibold text-[#632EE3] hover:text-white transition-all text-base"
                                >
                                    <FaGoogle size={20} className="mr-2" />
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

export default Login;