// LoginForm.js
import React, { useState } from 'react'
import { login } from '../api'
import './LoginForm.css'

function LoginForm({ onLoginSuccess, onToggle }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await login(email, password)
      localStorage.setItem('token', response.data.token)
      onLoginSuccess()
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={handleLogin} className='login-form'>
        {error && (
          <div data-testid='login-error-message' className='error-message'>
            {error}
          </div>
        )}
        <input
          data-testid='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          data-testid='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button data-testid='login-btn' type='submit'>
          Login
        </button>
      </form>
      <button data-testid='signup-btn'className='toggle-form-button' onClick={onToggle}>
        Need an account? Sign Up
      </button>
    </div>
  )
}

export default LoginForm
