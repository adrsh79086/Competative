import React, { useState, useEffect } from 'react'
import { User, Code, Trophy, Settings, LogOut, Save } from 'lucide-react'

const Profile = ({ user, onLogout, onUpdateUser }) => {
  const [codeforces, setCodeforces] = useState(user.codeforces || '')
  const [leetcode, setLeetcode] = useState(user.leetcode || '')
  const [geeksforgeeks, setGeeksforgeeks] = useState(user.geeksforgeeks || '')
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

  const handleSave = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u =>
      u.email === user.email ? { ...u, codeforces, leetcode, geeksforgeeks } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    const updatedUser = { ...user, codeforces, leetcode, geeksforgeeks }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    onUpdateUser(updatedUser)
    setSuccess('Handles saved successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const buttonStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    padding: isMobile ? '12px 24px' : '14px 28px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#333333',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontWeight: '500',
    width: isMobile ? '100%' : 'auto'
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px', 
      margin: '0 auto',
      marginTop: '50px',
      padding: isMobile ? '0 15px' : '0 20px'
    }}>
      {/* User Info Section */}
      <div className="card" style={{ 
        marginBottom: '30px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
        border: '2px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
        padding: isMobile ? '15px' : '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          marginBottom: '20px',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={{
            width: isMobile ? '100px' : '80px',
            height: isMobile ? '100px' : '80px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #333333, #666666)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: isMobile ? '2.5rem' : '2rem',
            fontWeight: 'bold'
          }}>
            {(user.name || user.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '2rem' : '2.5rem', 
              marginBottom: '5px', 
              color: '#333333',
              fontWeight: '600'
            }}>
              {user.name || 'User'}
            </h2>
            <p style={{ 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              color: '#666666',
              margin: '0'
            }}>
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Handles Management Section */}
      <div className="card" style={{ 
        marginBottom: '30px',
        borderRadius: '20px',
        border: '2px solid rgba(0, 0, 0, 0.1)',
        padding: isMobile ? '15px' : '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          marginBottom: '25px',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <Settings size={isMobile ? 24 : 28} color="#333333" />
          <h3 style={{ 
            fontSize: isMobile ? '1.5rem' : '2rem', 
            margin: '0', 
            color: '#333333',
            fontWeight: '600'
          }}>
            Competitive Programming Handles
          </h3>
        </div>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Codeforces Handle */}
          <div style={{ position: 'relative' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '500',
              color: '#333333'
            }}>
              Codeforces Handle
            </label>
            <div style={{ position: 'relative' }}>
              <Code size={isMobile ? 18 : 20} style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666666',
                zIndex: 1
              }} />
              <input
                className="input"
                type="text"
                placeholder="Enter your Codeforces handle"
                value={codeforces}
                onChange={e => setCodeforces(e.target.value)}
                style={{ 
                  paddingLeft: isMobile ? '45px' : '50px',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* LeetCode Handle */}
          <div style={{ position: 'relative' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '500',
              color: '#333333'
            }}>
              LeetCode Username
            </label>
            <div style={{ position: 'relative' }}>
              <Trophy size={isMobile ? 18 : 20} style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666666',
                zIndex: 1
              }} />
              <input
                className="input"
                type="text"
                placeholder="Enter your LeetCode username"
                value={leetcode}
                onChange={e => setLeetcode(e.target.value)}
                style={{ 
                  paddingLeft: isMobile ? '45px' : '50px',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* GeeksforGeeks Handle */}
          <div style={{ position: 'relative' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '500',
              color: '#333333'
            }}>
              GeeksforGeeks Username
            </label>
            <div style={{ position: 'relative' }}>
              <Code size={isMobile ? 18 : 20} style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666666',
                zIndex: 1
              }} />
              <input
                className="input"
                type="text"
                placeholder="Enter your GeeksforGeeks username"
                value={geeksforgeeks}
                onChange={e => setGeeksforgeeks(e.target.value)}
                style={{ 
                  paddingLeft: isMobile ? '45px' : '50px',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Buttons Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: isMobile ? '10px' : '20px',
            marginTop: '10px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <button 
              type="submit"
              style={buttonStyle}
            >
              <Save size={isMobile ? 18 : 20} />
              Save Handles
            </button>
            <button 
              onClick={onLogout}
              style={buttonStyle}
            >
              <LogOut size={isMobile ? 18 : 20} />
              Logout
            </button>
          </div>
        </form>
        
        {success && (
          <div className="success" style={{ 
            marginTop: '20px',
            padding: '15px',
            borderRadius: '12px',
            fontSize: isMobile ? '1rem' : '1.1rem',
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile 