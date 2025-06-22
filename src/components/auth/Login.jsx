import React, { useState, useEffect } from 'react'

const Login = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
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
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      onLogin(user)
    } else {
      setError('Invalid email or password')
    }
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
          Login
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '20px' }}>
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
          <button 
            className="btn" 
            type="submit"
            style={{ 
              fontSize: isMobile ? '1.1rem' : '1.2rem', 
              padding: isMobile ? '14px 24px' : '16px 32px',
              marginTop: isMobile ? '5px' : '10px'
            }}
          >
            Login
          </button>
        </form>
        {error && <div className="error" style={{ marginTop: '20px' }}>{error}</div>}
        
        <div style={{ 
          marginTop: isMobile ? '20px' : '30px', 
          paddingTop: isMobile ? '15px' : '20px', 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          fontSize: isMobile ? '1rem' : '1.1rem'
        }}>
          <span style={{ color: '#666666' }}>Don't have an account? </span>
          <button 
            className="btn-secondary" 
            onClick={onShowRegister}
            style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              padding: isMobile ? '10px 20px' : '12px 24px',
              marginLeft: isMobile ? '5px' : '10px',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login 