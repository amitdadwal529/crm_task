import React, { useState } from 'react'

// yup for validation
import * as Yup from "yup"; 
import { yupResolver } from "@hookform/resolvers/yup";

// useForm from React Hook Form for form
import { useForm } from "react-hook-form"; 

  // Import useDispatch for dispatching Redux actions
import { useDispatch, useSelector } from 'react-redux'; 

// login thunk action for authentication
import { login } from '@redux/thunk/authThunk';
// react icons
import { FaRegEyeSlash } from 'react-icons/fa6'; 
import { MdOutlineRemoveRedEye } from 'react-icons/md';
   // UI component for form inputs
import Input from '@components/ui/form/Input';

// Define the validation schema 
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
    resolver: yupResolver(validationSchema), // Yup validation schema 
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  // Handle form submission
  const onSubmit = (data) => {
    dispatch(login(data)); // Dispatch login action with form data (username and password)
  }
const {loading} = useSelector((state)=>state.auth)
  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword); // Toggle the password visibility state
  };

  return (
    <>
      <section className="bg-gray-100 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Customer Relation Management
              </h1>
              {/* Login form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                {/* Input for username */}
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  register={register} // Register input with react-hook-form
                  validation={{ required: "Username is required" }} // Validation for username
                  errors={errors} // Display form errors if any
                  className='border-0'
                />
                <div className='relative'>
                  {/* Input for password */}
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    placeholder="••••••••"
                    register={register} // Register input with react-hook-form
                    validation={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }} // Password validation
                    errors={errors} // Display form errors if any
                    className='border-0'
                  />
                  {/* Toggle icon to show/hide password */}
                  <div className="absolute top-9 right-3" onClick={handleToggle}>
                    {showPassword ?
                      (<FaRegEyeSlash fontSize={18} />) : // Show eye-slash icon when password is visible
                      (<MdOutlineRemoveRedEye fontSize={18} />) // Show eye icon when password is hidden
                    }
                  </div>
                </div>
                {/* Submit button */}
                <button disabled={loading} type="submit" className="bg-blue-800 ms-auto text-white hover:bg-blue-950 rounded-xl w-1/2 shadow-xl px-3 py-1">
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

export default Login;
