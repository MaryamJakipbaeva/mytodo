import React, { useState } from 'react';
import { useUser } from '../context/useUser';
import { useNavigate } from 'react-router-dom';

export const AuthenticationMode = Object.freeze({
  Login: 'Login',
  Register: 'Register'
});

export default function Authentication({ mode }) {
  const { signUp, signIn } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === AuthenticationMode.Register) {
        await signUp(email, password);
        navigate('/signin');
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      <h3>{mode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">{mode === AuthenticationMode.Login ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
}

