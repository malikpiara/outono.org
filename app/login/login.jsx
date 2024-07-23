'use client';
import React, { useEffect, useState } from 'react';
import { login } from './actions';


export default function LoginComponent() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  return (
    <form className='m-auto flex flex-col max-w-96'>
      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        name="email" 
        type="email" 
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button formAction={login} className='bg-black text-white rounded-md p-2'>Log in</button>
    </form>
  );
}
