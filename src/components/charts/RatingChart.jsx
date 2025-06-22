import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const RatingChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3>Rating Progress</h3>
        <p>No rating data available</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3>Rating Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="contest" 
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
          <Line 
            type="monotone" 
            dataKey="rating" 
            stroke="#666666" 
            strokeWidth={3}
            dot={{ fill: '#666666', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#666666', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RatingChart 