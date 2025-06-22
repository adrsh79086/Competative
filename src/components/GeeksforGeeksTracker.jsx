import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GFGBarChart from './charts/GFGBarChart'

const GeeksforGeeksTracker = ({ user }) => {
  const [username, setUsername] = useState(user.geeksforgeeks || '')
  const [userData, setUserData] = useState(null)
  const [recentProblems, setRecentProblems] = useState([])
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    if (user.geeksforgeeks) {
      setUsername(user.geeksforgeeks)
      fetchData(user.geeksforgeeks)
    }
    // eslint-disable-next-line
  }, [user.geeksforgeeks])

  const fetchData = async (uname = username) => {
    setLoading(true)
    setError('')
    setUserData(null)
    setRecentProblems([])
    
    try {
      // Note: GFG doesn't have a public API, so we'll simulate the data
      // In a real implementation, you might need to use web scraping or a third-party API
      const mockData = {
        username: uname,
        totalSolved: Math.floor(Math.random() * 500) + 100,
        codingScore: Math.floor(Math.random() * 2000) + 500,
        accuracy: Math.floor(Math.random() * 30) + 70,
        rank: Math.floor(Math.random() * 10000) + 1,
        easySolved: Math.floor(Math.random() * 200) + 50,
        mediumSolved: Math.floor(Math.random() * 200) + 30,
        hardSolved: Math.floor(Math.random() * 100) + 10
      }
      setUserData(mockData)
      
      // Mock recent problems
      setRecentProblems([
        { title: 'Array Rotation', difficulty: 'Easy', status: 'Solved' },
        { title: 'Binary Search', difficulty: 'Medium', status: 'Solved' },
        { title: 'Dynamic Programming', difficulty: 'Hard', status: 'Attempted' }
      ])
    } catch (err) {
      setError('Could not fetch data. Please check the username and try again.')
    }
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(username)
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1000px', 
      margin: '0 auto',
      textAlign: 'center',
      marginTop: '50px',
      padding: isMobile ? '0 15px' : '0'
    }}>
      <div className="card" style={{ 
        marginBottom: isMobile ? '20px' : '30px',
        padding: isMobile ? '20px 15px' : '20px'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '2rem' : '2.5rem', 
          marginBottom: isMobile ? '15px' : '20px', 
          color: '#333333' 
        }}>
          GeeksforGeeks Progress
        </h2>
        {!user.geeksforgeeks && (
          <form onSubmit={handleSubmit} className="mb-4 flex" style={{ 
            justifyContent: 'center', 
            gap: isMobile ? '10px' : '15px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <input
              className="input"
              type="text"
              placeholder="Enter GeeksforGeeks username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ 
                flex: '1', 
                maxWidth: isMobile ? '100%' : '400px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '12px 16px' : '12px 20px'
              }}
            />
            <button 
              className="btn" 
              type="submit" 
              disabled={loading}
              style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '12px 24px' : '12px 32px',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {loading ? 'Loading...' : 'Track'}
            </button>
          </form>
        )}
        {user.geeksforgeeks && (
          <div className="mb-4" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: isMobile ? '10px' : '15px', 
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div className="input" style={{ 
              background: 'rgba(255,255,255,0.9)', 
              color: '#333333', 
              cursor: 'not-allowed',
              flex: '1',
              maxWidth: isMobile ? '100%' : '400px',
              fontSize: isMobile ? '1rem' : '1.1rem',
              padding: isMobile ? '12px 16px' : '12px 20px'
            }}>
              {user.geeksforgeeks}
            </div>
            <button 
              className="btn" 
              onClick={() => fetchData(user.geeksforgeeks)} 
              disabled={loading}
              style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '12px 24px' : '12px 32px',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        )}
        {error && <div className="error">{error}</div>}
        {userData && (
          <div className="mb-4">
            <h3 style={{ 
              fontSize: isMobile ? '1.5rem' : '2rem', 
              marginBottom: isMobile ? '15px' : '20px', 
              color: '#333333' 
            }}>
              {userData.username}
            </h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{userData.totalSolved}</div>
                <div className="stat-label">Problems Solved</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.codingScore}</div>
                <div className="stat-label">Coding Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.accuracy}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.rank}</div>
                <div className="stat-label">Rank</div>
              </div>
            </div>
          </div>
        )}
        {recentProblems.length > 0 && (
          <div className="mb-4">
            <h4 style={{ 
              fontSize: isMobile ? '1.2rem' : '1.5rem', 
              marginBottom: isMobile ? '10px' : '15px', 
              color: '#333333' 
            }}>
              Recent Problems
            </h4>
            <div className="problem-list">
              {recentProblems.map((problem, idx) => (
                <div key={idx} className="problem-item" style={{
                  padding: isMobile ? '15px' : '20px',
                  margin: isMobile ? '8px 0' : '12px 0'
                }}>
                  <div className="problem-title" style={{
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
                    {problem.title}
                  </div>
                  <div className="problem-difficulty" style={{
                    fontSize: isMobile ? '0.8rem' : '0.9rem'
                  }}>
                    Difficulty: {problem.difficulty} | Status: {problem.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {userData && (
        <GFGBarChart
          easy={userData.easySolved}
          medium={userData.mediumSolved}
          hard={userData.hardSolved}
        />
      )}
    </div>
  )
}

export default GeeksforGeeksTracker 