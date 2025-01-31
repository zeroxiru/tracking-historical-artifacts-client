import useAuth from '../hooks/useAuth'
import { Helmet } from 'react-helmet-async'
import coverImg from '../../src/assets/cover.png'


const Profile = () => {
  const { user, loading } = useAuth()

  return (
    <div className='flex justify-center items-center h-screen bg-slate-100'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-xl rounded-xl w-full max-w-lg'>
        {/* Cover Section */}
        <div className='relative'>
          <img
            alt='cover photo'
            src={coverImg}
            className='w-full h-48 object-cover rounded-t-xl'
          />
          <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='h-24 w-24 rounded-full border-4 border-white shadow-lg'
            />
          </div>
        </div>

        {/* User Info Section */}
        <div className='mt-16 p-6 text-center'>
          <h1 className='text-2xl font-semibold text-slate-800'>
            {user?.displayName}
          </h1>
        
          <p className='mt-4 text-xs text-slate-500'>User ID: {user?.email}</p>
        </div>

        {/* Action Buttons */}
        <div className='border-t border-slate-200 p-4 flex flex-col gap-3'>
          <button className='bg-slate-800 text-white py-2 rounded-md font-medium hover:bg-slate-900'>
            Update Profile
          </button>
          <button className='bg-slate-700 text-white py-2 rounded-md font-medium hover:bg-slate-800'>
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
