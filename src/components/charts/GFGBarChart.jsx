import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const GFGBarChart = ({ easy, medium, hard }) => {
  const data = [
    { difficulty: 'Easy', solved: easy },
    { difficulty: 'Medium', solved: medium },
    { difficulty: 'Hard', solved: hard }
  ]

  if (!easy && !medium && !hard) {
    return null
  }

  return (
    <div className="chart-container">
      <h3>GFG Solved by Difficulty</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="difficulty" 
            stroke="#333333"
            fontSize={12}
          />
          <YAxis 
            stroke="#333333"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              color: '#333333'
            }}
          />
          <Legend />
          <Bar 
            dataKey="solved" 
            fill="#666666"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GFGBarChart 