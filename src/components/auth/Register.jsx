import React, { useState, useEffect } from 'react'

const Register = ({ onRegister, onShowLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) {
      setError('Email already registered')
      return
    }
    const newUser = { name, email, password, codeforces: '', leetcode: '', geeksforgeeks: '' }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    setSuccess('Account created! You can now log in.')
    setError('')
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    onRegister && onRegister(newUser)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: isMobile ? '20px' : '0'
    }}>
      <div className="card" style={{ 
        maxWidth: isMobile ? '100%' : 500, 
        width: '90%',
        margin: '0 auto',
        padding: isMobile ? '30px 20px' : '40px',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '2rem' : '2.5rem', 
          marginBottom: isMobile ? '20px' : '30px', 
          color: '#333333' 
        }}>
          Create Account
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '20px' }}>
          <input
            className="input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              padding: isMobile ? '14px 16px' : '16px 20px',
              margin: '0'
            }}
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              padding: isMobile ? '14px 16px' : '16px 20px',
              margin: '0'
            }}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              padding: isMobile ? '14px 16px' : '16px 20px',
              margin: '0'
            }}
          />
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              padding: isMobile ? '14px 16px' : '16px 20px',
              margin: '0'
            }}
          />
          <button 
            className="btn" 
            type="submit"
            style={{ 
              fontSize: isMobile ? '1.1rem' : '1.2rem', 
              padding: isMobile ? '14px 24px' : '16px 32px',
              marginTop: isMobile ? '5px' : '10px'
            }}
          >
            Register
          </button>
        </form>
        {error && <div className="error" style={{ marginTop: '20px' }}>{error}</div>}
        {success && <div className="success" style={{ marginTop: '20px' }}>{success}</div>}
        
        <div style={{ 
          marginTop: isMobile ? '20px' : '30px', 
          paddingTop: isMobile ? '15px' : '20px', 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          fontSize: isMobile ? '1rem' : '1.1rem'
        }}>
          <span style={{ color: '#666666' }}>Already have an account? </span>
          <button 
            className="btn-secondary" 
            onClick={onShowLogin}
            style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              padding: isMobile ? '10px 20px' : '12px 24px',
              marginLeft: isMobile ? '5px' : '10px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register 