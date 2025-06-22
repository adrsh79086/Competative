import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import CodeforcesTracker from './components/CodeforcesTracker'
import LeetCodeTracker from './components/LeetCodeTracker'
import GeeksforGeeksTracker from './components/GeeksforGeeksTracker'
import Profile from './components/Profile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) setUser(JSON.parse(currentUser))
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const handleRegister = () => {
    setShowRegister(false)
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

  if (!user) {
    return showRegister ? (
      <Register onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
    )
  }

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} user={user} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/codeforces" element={<CodeforcesTracker user={user} />} />
            <Route path="/leetcode" element={<LeetCodeTracker user={user} />} />
            <Route path="/geeksforgeeks" element={<GeeksforGeeksTracker user={user} />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} onUpdateUser={updateUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App 