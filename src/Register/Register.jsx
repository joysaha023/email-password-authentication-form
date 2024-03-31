import React, { useState } from "react";
import auth from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setErrorRegister] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPass] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted)

        setErrorRegister('');
        setRegisterSuccess('');


        if(password.length < 6){
          setErrorRegister('Password should be a 6 character or longer');
          return;
        }
        else if(!/[A-Z]/.test(password)){
          setErrorRegister('Your password should have at least one uppercase');
          return;
        }
        else if(!accepted){
          setErrorRegister('Plese accept our terms and condition');
          return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setRegisterSuccess("User created successfully");

            //profile updated
            updateProfile(result.user, {
              displayName: name,
            })
            .then( () => console.log('Profile updated'))
            .catch()

            //Email verification
            sendEmailVerification(result.user)
            .then(() => {
              alert('Check your email and verify mail')
            })
        })
        .catch(error => {
            console.error(error)
            setErrorRegister(error.message);
        })
    }



  return (
    <div className="text-center my-5">
      <h2 className="text-4xl font-bold">Please Register</h2>
      <form onSubmit={handleRegister} className="w-1/4 mx-auto border p-4 rounded-lg bg-gray-100 space-y-5 my-5">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" name="name" className="grow" placeholder="Your Name" />
        </label>
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
          <input type="email" name="email" className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Pass:
          <input type={ showPassword ? "text" : "password"} name="password" className="grow" placeholder="*****" />
          <span className="relative -left-4 text-gray-600" onClick={() => setShowPass(!showPassword)}>{ showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
        </label>
        <div>
          <input type="checkbox" name="terms" id="terms" />
          <label className="ml-2" htmlFor="terms">Accept Our <a href="">Terms and conditions</a></label>
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-success text-white"
        />
      </form>
      {
        registerError && <p className="text-red-700">{registerError}</p>
      }
      {
        registerSuccess && <p className="text-green-500">{registerSuccess}</p>
      }
      <p>Already have an account please <Link to={"/login"} className="text-blue-600 underline">Login</Link></p>
    </div>
  );
};

export default Register;
