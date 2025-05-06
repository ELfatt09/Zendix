import React, { useState } from 'react'
import { useAuth } from '../../../authContext';
import axios from 'axios';

function Verification() {
  const { user, verifyEmail, message, error } = useAuth();
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting verification form...');
    verifyEmail(otp);
  };

  const resendVerificationEmail = async () => {
    console.log('Resending verification email...');
    await axios
      .post('http://localhost:8080/auth/verification/resend', {}, {
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err.response.data.error);
        }
      });
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification {otp}</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {user?.email}</p>
            </div>
          </div>

          <form className="space-y-16" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-full h-16">
                <input 
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" 
                  type="text" 
                  maxLength={6} 
                  onChange={(e) => setOtp(e.target.value)} 
                />
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button 
                  type='submit' 
                  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                >
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>{message ?? ''}{error ?? ''}</p>
                <p>Didn't receive code?</p>
                <button
                  type="button"
                  className="flex flex-row items-center text-blue-600"
                  onClick={resendVerificationEmail}
                >
                  Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Verification

