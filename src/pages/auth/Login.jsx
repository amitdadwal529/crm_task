import React, { useState } from 'react'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import {login} from '@redux/thunk/authThunk';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Input from '@components/ui/form/Input';

const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores are allowed"),
      
    password: Yup.string()
      .required("Password is required")
  });

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
      });

      const [showPassword, setShowPassword] = useState(false);

      const dispatch = useDispatch();

      const onSubmit =(data) => {
       dispatch(login(data));
      }
      const handleToggle = () => {
        setShowPassword(!showPassword);
      };
  return (
    <>
        <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
               <Input
                 label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                register={register}
                validation={{ required: "Username is required" }}
                errors={errors}
               />
                <div>
                <Input
                    label="Password"
                    name="password"
                    type={showPassword?"text":"password"}
                    placeholder="••••••••"
                    register={register}
                    validation={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
                    errors={errors}
      /> <div
                    className="absolute top-11 right-3"
                    onClick={handleToggle}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash fontSize={18} />
                    ) : (
                      <MdOutlineRemoveRedEye fontSize={18} />
                    )}
                  </div>
                  </div>
               
                <button type="submit" className="w-full text-black border hover:bg-blue-200 hover:border-transparent border-blue-950 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
