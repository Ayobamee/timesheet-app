import React, { useState, useEffect } from 'react'
import TimesheetTable from './components/TimesheetTable'
import Auth from './components/Auth'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [timesheet, setTimesheet] = useState([
    {
      day: 'Monday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },
    {
      day: 'Tuesday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },

    {
      day: 'Wednesday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },

    {
      day: 'Thursday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },

    {
      day: 'Friday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },

    {
      day: 'Saturday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },

    {
      day: 'Sunday',
      regular: 0,
      overtime: 0,
      vacation: 0,
      holiday: 0,
      unpaidLeave: 0,
    },
    
    // Repeat for other days
  ])

  // On component mount, check if the user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      // Optionally verify the token's validity with the backend here
    }
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token') // Clear the stored token
    setIsAuthenticated(false)
    // Redirect to login page or show a logged-out view
  }

  const calculateTotals = () => {
    return timesheet.map((entry) =>
      Object.values(entry)
        .slice(1)
        .reduce((acc, curr) => acc + Number(curr), 0)
    )
  }

  return (
    <div className='App'>
      {isAuthenticated ? (
        <>
          <h1>Timesheet App</h1>
          <button onClick={handleLogout}>Logout</button>
          <TimesheetTable
            timesheet={timesheet}
            onUpdate={setTimesheet}
            calculateTotals={calculateTotals}
          />
        </>
      ) : (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  )
}

export default App
