import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CombinedProgressChart from './charts/CombinedProgressChart'
import PlatformComparisonChart from './charts/PlatformComparisonChart'

const Dashboard = ({ user }) => {
  const [cfStats, setCfStats] = useState(null)
  const [lcStats, setLcStats] = useState(null)
  const [gfgStats, setGfgStats] = useState(null)
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
    const fetchStats = async () => {
      setLoading(true)
      setError('')
      try {
        if (user.codeforces) {
          const cfRes = await axios.get(`https://codeforces.com/api/user.info?handles=${user.codeforces}`)
          setCfStats(cfRes.data.result[0])
        }
        if (user.leetcode) {
          const lcRes = await axios.get(`https://leetcode-stats-api.herokuapp.com/${user.leetcode}`)
          setLcStats(lcRes.data)
        }
        if (user.geeksforgeeks) {
          // Mock GFG data since there's no public API
          const mockGfgData = {
            totalSolved: Math.floor(Math.random() * 500) + 100,
            codingScore: Math.floor(Math.random() * 2000) + 500,
            accuracy: Math.floor(Math.random() * 30) + 70
          }
          setGfgStats(mockGfgData)
        }
      } catch (err) {
        setError('Could not fetch stats. Please check your handles.')
      }
      setLoading(false)
    }
    fetchStats()
  }, [user.codeforces, user.leetcode, user.geeksforgeeks])

  // Get display name - use name if available, otherwise use email
  const displayName = user.name || user.email

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1000px', 
      margin: '0 auto',
      textAlign: 'center',
      marginTop: '50px',
      padding: isMobile ? '0 15px' : '0'
    }}>
      <div className="card text-center" style={{ 
        marginBottom: isMobile ? '20px' : '30px',
        padding: isMobile ? '20px 15px' : '20px'
      }}>
        <h1 style={{ 
          fontSize: isMobile ? '2rem' : '2.5rem', 
          marginBottom: isMobile ? '10px' : '15px', 
          color: '#333333' 
        }}>
          Welcome, {displayName}!
        </h1>
        <p style={{ 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          color: '#666666', 
          marginBottom: isMobile ? '15px' : '20px' 
        }}>
          Track your progress on Codeforces, LeetCode, and GeeksforGeeks, view stats, and improve your skills.
        </p>
        {loading && <div className="loading">Loading stats...</div>}
        {error && <div className="error">{error}</div>}
        <div className="stats-grid mt-4">
          <div className="stat-card">
            <div className="stat-number">{cfStats ? cfStats.rating : '-'}</div>
            <div className="stat-label">Codeforces Rating</div>
            <div className="stat-label" style={{ fontSize: '0.9em', opacity: 0.7 }}>{user.codeforces || 'No handle saved'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{lcStats ? lcStats.totalSolved : '-'}</div>
            <div className="stat-label">LeetCode Solved</div>
            <div className="stat-label" style={{ fontSize: '0.9em', opacity: 0.7 }}>{user.leetcode || 'No username saved'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{gfgStats ? gfgStats.totalSolved : '-'}</div>
            <div className="stat-label">GFG Solved</div>
            <div className="stat-label" style={{ fontSize: '0.9em', opacity: 0.7 }}>{user.geeksforgeeks || 'No username saved'}</div>
          </div>
        </div>
      </div>
      
      <CombinedProgressChart cfStats={cfStats} lcStats={lcStats} gfgStats={gfgStats} />
      
      <PlatformComparisonChart cfStats={cfStats} lcStats={lcStats} gfgStats={gfgStats} />
      
      {(!user.codeforces && !user.leetcode && !user.geeksforgeeks) && (
        <div className="mt-4 error" style={{ 
          fontSize: isMobile ? '0.9rem' : '1rem',
          padding: isMobile ? '12px' : '15px'
        }}>
          No handles saved. Go to your profile to add your competitive programming accounts!
        </div>
      )}
    </div>
  )
}

export default Dashboard 