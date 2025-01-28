import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { TbFidgetSpinner } from 'react-icons/tb';
import axios from 'axios';
import { imageUpload } from '../../api/utlis.js';

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useAuth() ;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submit handler
  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    setLoading(true);

    try {
      // Upload image and get URL
      const photoUrl = await imageUpload(image[0]);

      // User Registration
      const result = await createUser(email, password);

      // Save username & profile photo
      await updateUserProfile(name, photoUrl);

      // Save user data to database
      await axios.post(`${import.meta.env.VITE_API_URL}/users/${email}`, {
        name: name || 'Anonymous User',
        image: photoUrl || 'Image is N/A',
        email: email,
      });

      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-400 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-black font-bold'>Welcome to Scholarship Management System Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {/* Name Field */}
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name Here'
                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-slate-500 bg-gray-200 text-gray-900 ${errors.name ? 'border-red-500' : ''}`}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                className={`${errors.image ? 'border-red-500' : ''}`}
                {...register('image', { required: 'Image is required' })}
              />
              {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email Here'
                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-slate-500 bg-gray-200 text-gray-900 ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).+$/

                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>Password must be 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500'>Password must be less then 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must have one uppercase, one lowercase, one number, one special character</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-slate-500 w-full rounded-md py-3 text-white'
              disabled={loading}
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>

        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-slate-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
