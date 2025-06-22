import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const CombinedProgressChart = ({ cfStats, lcStats, gfgStats }) => {
  const data = [
    {
      platform: 'Codeforces',
      problems: cfStats ? cfStats.rating : 0,
      type: 'Rating'
    },
    {
      platform: 'LeetCode',
      problems: lcStats ? lcStats.totalSolved : 0,
      type: 'Solved'
    },
    {
      platform: 'GFG',
      problems: gfgStats ? gfgStats.totalSolved : 0,
      type: 'Solved'
    }
  ]

  const hasData = cfStats || lcStats || gfgStats

  if (!hasData) {
    return null
  }

  return (
    <div className="chart-container">
      <h3>Platform Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="platform" 
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
            formatter={(value, name, props) => [
              `${value} ${props.payload.type === 'Rating' ? 'Rating' : 'Problems'}`,
              props.payload.platform
            ]}
          />
          <Legend />
          <Bar 
            dataKey="problems" 
            fill="#666666"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CombinedProgressChart 