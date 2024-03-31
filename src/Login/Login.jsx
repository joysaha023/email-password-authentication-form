import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import auth from '../firebase/firebase.config';
import { Result } from 'postcss';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPass] = useState(false);
    const [errorMessage, setShoeError] = useState("");
    const [loginMassege, setLoginMessage] = useState("");
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setShoeError('');
        setLoginMessage('');

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            if(result.user.emailVerified){
                setLoginMessage(' Login Successfully!')
            }
            else{
                alert('Plese verify your email address!')
            }
        })
        .catch(error => {
            console.log(error)
            setShoeError(error.message)
        })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide an email', )
            return
        }
        //password velidattion
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
                console.log('plese write a valid email')
                return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Please check your email')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="text-center my-5">
      <h2 className="text-4xl font-bold">Please Login</h2>
      <form onSubmit={handleLogin} className="w-1/4 mx-auto border p-4 rounded-lg bg-gray-100 space-y-5 my-5">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="email" ref={emailRef} name="email" className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Pass:
          <input type={ showPassword ? "text" : "password"} name="password" className="grow" placeholder="*****" />
          <span className="relative -left-4 text-gray-600" onClick={() => setShowPass(!showPassword)}>{ showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
        </label>
        <label className='flex justify-center' ><a onClick={handleForgetPassword}  className="underline cursor-pointer">Forget Password?</a></label>
        <input
          type="submit"
          value="Login"
          className="btn btn-success text-white"
        />
      </form>
      {
        errorMessage && <p className='text-red-600'>{errorMessage}</p>
      }
      {
        loginMassege && <p className='text-green-500'>{loginMassege}</p>
      }
      <p>New to this website please <Link className='text-blue-600 underline' to={"/register"}>Register</Link></p>
    </div>
    );
};

export default Login;