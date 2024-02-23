import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('') // State for storing error messages

  // Toggle between Login and Sign Up form
  const toggleForm = () => {
    console.log('Toggle form button clicked. Current isLogin state:', isLogin)
    setIsLogin(!isLogin)
    setError('') // Clear any existing error messages when toggling forms
  }

  // Handle login success
  const handleLoginSuccess = () => {
    console.log('Logged in successfully')
    setError('') // Clear any existing error messages
    onAuthSuccess() // Call the onAuthSuccess passed from App to update the App's state
  }

  // Handle login failure by setting an error message
  const handleLoginFailure = (errorMessage) => {
    console.error('Login failed:', errorMessage)
    setError(errorMessage) // Update the state with the error message
  }

  // Assume the same function handles both signup success and failure for simplicity
  const handleSignUpSuccess = () => {
    console.log('Signed up successfully')
    setError('') // Clear any existing error messages
    onAuthSuccess() // This could automatically log the user in or just close the signup form
  }

  return (
    <div className='auth-container'>
      <div className='auth-content'>
        {error && <div className='error-message'>{error}</div>}
        {isLogin ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        ) : (
          <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
        )}
        <div className='toggle-button-container'>
          <button className='toggle-form-button' onClick={toggleForm}>
            {isLogin
              ? 'Need an account? Sign Up'
              : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
