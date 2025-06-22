import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LeetCodePieChart from './charts/LeetCodePieChart'
import ProblemsChart from './charts/ProblemsChart'

const LeetCodeTracker = ({ user }) => {
  const [username, setUsername] = useState('')
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

  const fetchData = async (username) => {
    setLoading(true)
    setError('')
    setUserData(null)
    setRecentProblems([])
    
    try {
      const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`)
      setUserData(res.data)
      
      // Generate mock recent problems data
      const problems = []
      const problemNames = [
        'Two Sum', 'Add Two Numbers', 'Longest Substring Without Repeating Characters',
        'Median of Two Sorted Arrays', 'Longest Palindromic Substring', 'ZigZag Conversion',
        'Reverse Integer', 'String to Integer (atoi)', 'Palindrome Number', 'Regular Expression Matching'
      ]
      
      for (let i = 0; i < 10; i++) {
        problems.push({
          title: problemNames[i],
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
          status: Math.random() > 0.3 ? 'Accepted' : 'Wrong Answer'
        })
      }
      setRecentProblems(problems)
      
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
          LeetCode Progress
        </h2>
        {!user.leetcode && (
          <form onSubmit={handleSubmit} className="mb-4 flex" style={{ 
            justifyContent: 'center', 
            gap: isMobile ? '10px' : '15px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <input
              className="input"
              type="text"
              placeholder="Enter LeetCode username"
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
        {user.leetcode && (
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
              {user.leetcode}
            </div>
            <button 
              className="btn" 
              onClick={() => fetchData(user.leetcode)} 
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
              {user.leetcode || username}
            </h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{userData.totalSolved}</div>
                <div className="stat-label">Total Solved</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.easySolved}</div>
                <div className="stat-label">Easy</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.mediumSolved}</div>
                <div className="stat-label">Medium</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.hardSolved}</div>
                <div className="stat-label">Hard</div>
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
                <div key={idx} className={`problem-item difficulty-${problem.difficulty.toLowerCase()}`} style={{
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
        <LeetCodePieChart
          easy={userData.easySolved}
          medium={userData.mediumSolved}
          hard={userData.hardSolved}
        />
      )}
      
      {userData && (
        <ProblemsChart
          data={[
            { difficulty: 'Easy', solved: userData.easySolved, total: userData.easyTotal },
            { difficulty: 'Medium', solved: userData.mediumSolved, total: userData.mediumTotal },
            { difficulty: 'Hard', solved: userData.hardSolved, total: userData.hardTotal }
          ]}
        />
      )}
    </div>
  )
}

export default LeetCodeTracker 