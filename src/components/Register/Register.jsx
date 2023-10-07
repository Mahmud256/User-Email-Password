import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from '../../Firebase/firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [sucess, setSucess] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        //reset error
        setRegisterError('');
        setSucess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one uppercase characters.')
            return;
        }
        else if(!accepted)
        {
            setRegisterError('Please accept our terms and conditions!')
            return;
        }


        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(result.user);
                setSucess('User Create Sucess');

                //send verifaction email
                sendEmailVerification(result.user)
                .then(() => {
                    alert('Please check your verified account')
                  });
            
            })
            .catch((error) => {
                console.log(error);
                setRegisterError(error.message);
            });

    };

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="3xl mb-4">Please Register </h2>
                <form onSubmit={handleRegister}>
                    <input
                        className="border mb-4 w-full py-2 px-4"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        id="" required
                    />
                    <br />
                    <div className='mb-4 relative'>
                        <input
                            className="border w-full py-2 px-4"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            id="" required
                        />
                        <span className='absolute top-3 right-2' onClick={() => setshowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className='mb-4'>
                        <input className='border' type="checkbox" name="terms" id="terms" />
                        <label className='ml-1 mb-4' htmlFor='terms'>Accept our <a href="">Terms and Conditions</a> </label>
                    </div>
                    <br />
                    <input
                        className="btn btn-secondary mb-4 w-full py-2 px-4"
                        type="submit"
                        name="Register"
                        id=""
                    />
                </form>
                {
                    registerError && <p>{registerError}</p>
                }
                {
                    sucess && <p className='text-green-600'>{sucess}</p>
                }
                <p>Already have an account Please  <Link to="/login" className="text-blue-600">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
