import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';

const SignIn = () => {
    const { signIn, signInWithGoogle, loading, user } = useAuth();
     const [disabled, setDisabled] = useState(true);
     const navigate = useNavigate();
     const location = useLocation();
     const captchaRef = useRef(null);

     useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


     
     const from = location?.state?.from?.pathname || '/';
     if (user) return <Navigate to={from} replace={true} />;
     const handleGoogleSignIn = async () => {
         try {
           await signInWithGoogle();
           navigate(from, { replace: true });
           toast.success('Login Successful');
         } catch (err) {
           console.log(err);
           toast.error(err?.message);
         }
       };
     

     const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
    
        try {
          await signIn(email, password);
          navigate(from, { replace: true });
          toast.success('Login Successful');
        } catch (err) {
          console.log(err);
          toast.error(err?.message);
        }
      };

      const handleValidateCaptcha = () =>{
        const  user_captcha_value =captchaRef.current.value;
        if(validateCaptcha(user_captcha_value)){ 
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
       }
    return (

        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-orange-200 text-amber-800'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-amber-800 font-bold'>Sign in to access your account</p>
                </div>
                <form onSubmit={handleSubmit} noValidate='' action='' className='space-y-6 ng-untouched ng-pristine ng-valid'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-lg font-lg' >Email address</label>
                            <input type='email' name='email' id='email' required placeholder='Enter Your Email Here' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-slate-500 bg-gray-200 text-gray-900' data-temp-mail-org='0' />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-lg font-lg mb-2'>Password</label>
                            </div>
                            <input type='password' name='password' autoComplete='current-password' id='password' required placeholder='*******' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="text" name="Captcha" ref={captchaRef} placeholder="type the text above " className="input input-bordered" required />
                            <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>
                        </div>
                    </div>
                    <div>
                        <button  type='submit' className='bg-amber-800 w-full rounded-md py-3 text-white'>
                            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-slate-500 text-amber-800'>Forgot password?</button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-amber-700'></div>
                    <p className='px-3 text-sm dark:text-orange-400'>Login with social accounts</p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-amber-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />
                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link to='/register' className='hover:underline hover:text-slate-500 text-gray-600'>Sign up</Link>.
                </p>
            </div>
        </div>
    );
};

export default SignIn;