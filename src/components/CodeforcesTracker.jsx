import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RatingChart from './charts/RatingChart'
import SubmissionChart from './charts/SubmissionChart'

const CodeforcesTracker = () => {
  const [handle, setHandle] = useState('')
  const [userData, setUserData] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [ratingHistory, setRatingHistory] = useState([])
  const [submissionActivity, setSubmissionActivity] = useState([])
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

  const fetchData = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setUserData(null)
    setSubmissions([])
    setRatingHistory([])
    setSubmissionActivity([])
    
    try {
      // Fetch user info
      const userRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
      setUserData(userRes.data.result[0])
      
      // Fetch recent submissions
      const subRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`)
      setSubmissions(subRes.data.result)
      
      // Fetch rating history
      const ratingRes = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)
      const ratingData = ratingRes.data.result.slice(-10).map(contest => ({
        contest: contest.contestName,
        rating: contest.newRating
      }))
      setRatingHistory(ratingData)
      
      // Generate submission activity data (simulated)
      const activityData = []
      const today = new Date()
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        activityData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          submissions: Math.floor(Math.random() * 5) + 1
        })
      }
      setSubmissionActivity(activityData)
      
    } catch (err) {
      setError('Could not fetch data. Please check the handle and try again.')
    }
    setLoading(false)
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
          Codeforces Progress
        </h2>
        <form onSubmit={fetchData} className="mb-4 flex" style={{ 
          justifyContent: 'center', 
          gap: isMobile ? '10px' : '15px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <input
            className="input"
            type="text"
            placeholder="Enter Codeforces handle"
            value={handle}
            onChange={e => setHandle(e.target.value)}
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
        {error && <div className="error">{error}</div>}
        {userData && (
          <div className="mb-4">
            <h3 style={{ 
              fontSize: isMobile ? '1.5rem' : '2rem', 
              marginBottom: isMobile ? '15px' : '20px', 
              color: '#333333' 
            }}>
              {userData.handle} <span style={{color: '#666666'}}>({userData.rank})</span>
            </h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{userData.rating}</div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.maxRating}</div>
                <div className="stat-label">Max Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userData.friendOfCount}</div>
                <div className="stat-label">Friends</div>
              </div>
            </div>
          </div>
        )}
        {submissions.length > 0 && (
          <div className="mb-4">
            <h4 style={{ 
              fontSize: isMobile ? '1.2rem' : '1.5rem', 
              marginBottom: isMobile ? '10px' : '15px', 
              color: '#333333' 
            }}>
              Recent Submissions
            </h4>
            <div className="problem-list">
              {submissions.map((sub, idx) => (
                <div key={idx} className="problem-item" style={{
                  padding: isMobile ? '15px' : '20px',
                  margin: isMobile ? '8px 0' : '12px 0'
                }}>
                  <div className="problem-title" style={{
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
                    {sub.problem.contestId}-{sub.problem.index}: {sub.problem.name}
                  </div>
                  <div className="problem-difficulty" style={{
                    fontSize: isMobile ? '0.8rem' : '0.9rem'
                  }}>
                    Verdict: {sub.verdict || 'N/A'} | Language: {sub.programmingLanguage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {ratingHistory.length > 0 && <RatingChart data={ratingHistory} />}
      {submissionActivity.length > 0 && <SubmissionChart data={submissionActivity} />}
    </div>
  )
}

export default CodeforcesTracker 