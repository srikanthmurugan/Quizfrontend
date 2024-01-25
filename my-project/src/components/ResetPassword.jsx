

import axios from 'axios';
import React, { useState } from 'react'


//import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';



function ResetPassword() {

    const [npassword, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
   

    

    //const dispatch = useDispatch();
    //const err = useSelector((state)=>state.user.error);


    const submit = async e => {
        e.preventDefault();

        if (npassword === cpassword){
            
            axios.post("http://localhost:8000/password/reset/confirm/",{
                password1:npassword,
                password2:npassword,
                uidb64:uidb64,
                token:token});
            navigate("/login")

        }
        else{
            alert("New password and Confirm password should be same");
        }
        

          }
    

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
                        Mock-Test
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={submit} method='POST' action="#">
                            <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input onChange={e => setPassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                                </div>

                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input onChange={e => setCpassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                                </div>


                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-primary-800"
                                >
                                    Submit
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
                }

export default ResetPassword