import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#2196F3', '#FFA726', '#4CAF50'] // Blue for CF, Orange for LC, Green for GFG
const PLATFORM_LABELS = ['Codeforces', 'LeetCode', 'GeeksforGeeks']

const PlatformComparisonChart = ({ cfStats, lcStats, gfgStats }) => {
  const data = [
    { name: 'Codeforces', value: cfStats ? cfStats.rating : 0 },
    { name: 'LeetCode', value: lcStats ? lcStats.totalSolved : 0 },
    { name: 'GeeksforGeeks', value: gfgStats ? gfgStats.totalSolved : 0 }
  ]

  // Check if we have any data to show
  const hasData = data.some(item => item.value > 0)

  if (!hasData) {
    return (
      <div className="chart-container">
        <h3>Platform Comparison</h3>
        <p>No data available. Add your handles to see platform comparison.</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3>Platform Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              color: '#333333'
            }}
            formatter={(value, name) => [
              name === 'Codeforces' ? `Rating: ${value}` : `Solved: ${value}`,
              name
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PlatformComparisonChart 