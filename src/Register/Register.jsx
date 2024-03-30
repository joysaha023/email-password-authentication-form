import React from "react";
import auth from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.error(error)
        })
    }



  return (
    <div className="text-center my-5">
      <h2 className="text-4xl font-bold">Please Register</h2>
      <form onSubmit={handleRegister} className="w-1/4 mx-auto border p-4 rounded-lg bg-gray-100 space-y-5 mt-5">
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
          <input type="password" name="password" className="grow" placeholder="*****" />
        </label>
        <input
          type="submit"
          value="Register"
          className="btn btn-success text-white"
        />
      </form>
    </div>
  );
};

export default Register;
