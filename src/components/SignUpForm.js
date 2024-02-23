import React, { useState } from 'react'
import { signup } from '../api'
import './SignUpForm.css'

function SignUpForm({ onSignUpSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('') // State to hold error messages

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('') // Clear any previous error state

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return // Stop the function if the passwords do not match
    }

    try {
      const response = await signup(email, password)
      // Optionally clear the form fields here
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      // You might automatically log the user in or redirect them to a different page here
      // For now, we just call the onSignUpSuccess function passed from the parent
      onSignUpSuccess(response.data)
    } catch (error) {
      // Adjust according to the actual error structure you expect from your backend
      setError(
        error.response && error.response.data
          ? error.response.data.message
          : 'An error occurred during sign up.'
      )
    }
  }

  return (
    <div className='signup-form'>
      <h2>Sign Up</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}{' '}
      {/* Display any error message */}
      <form onSubmit={handleSignUp}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            data-testid='email'
            type='email'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            data-testid='password'
            type='password'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            data-testid='confirm-password'
            type='password'
            id='confirmPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          data-testid='signup-btn'
          type='submit'
          className='confirm-sign-up-btn'
        >
          Confirm Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
