import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const SubmissionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3>Submission Activity</h3>
        <p>No submission data available</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3>Submission Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="date" 
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
          <Area 
            type="monotone" 
            dataKey="submissions" 
            stroke="#666666" 
            fill="rgba(102, 102, 102, 0.3)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SubmissionChart 