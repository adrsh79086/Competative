import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const ProblemsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3>Problems Solved by Difficulty</h3>
        <p>No problem data available</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3>Problems Solved by Difficulty</h3>
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
            fill="#4a7c59"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="total" 
            fill="#999999"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProblemsChart 