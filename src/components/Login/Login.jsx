import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [loginrError, setLoginError] = useState('');
    const [sucess, setSucess] = useState('');
    const emailRef = useRef(null);
    //const [ForgetPassword, setForgetPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const accepted = e.target.terms.checked;
        console.log(email, password);


        setLoginError('');
        setSucess('');


        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(result.user);
                if(result.user.emailVerified)
                {
                    setSucess('User Login Sucess');
                }
                else{
                    alert("Please verify your email address")
                }
            })
            .catch((error) => {
                console.log(error);
                setLoginError('User Login Error!');
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        console.log('Send reset email', emailRef.current.value);

        if(!email)
        {
            console.log("Please provide an email", emailRef.current.value);
            return;
        }
        else if(! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('Please write a valid email');
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Please check your email");
        })
        .catch((error) => {
          console.log(error);
          
        });
        
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        ref={emailRef}
                                        placeholder="email"
                                        className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered" />
                                    <label className="label">
                                        <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                loginrError && <p>{loginrError}</p>
                            }
                            {
                                sucess && <p className='text-green-600'>{sucess}</p>
                            }
                            <p>Create a new website <Link to="/register" className="text-blue-600">register</Link></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;