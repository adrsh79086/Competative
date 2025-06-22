# 🏆 Competitive Programming Tracker

A comprehensive web application to track and visualize your progress across multiple competitive programming platforms including Codeforces, LeetCode, and GeeksforGeeks.

## ✨ Features

### 📊 **Multi-Platform Tracking**
- **Codeforces**: Track rating, max rating, rank, and recent submissions
- **LeetCode**: Monitor problems solved by difficulty, ranking, and accuracy
- **GeeksforGeeks**: Track coding score, accuracy, and problems solved

### 📈 **Advanced Analytics**
- **Platform Comparison Chart**: Visual comparison across all platforms
- **Difficulty Breakdown**: Pie charts showing Easy/Medium/Hard distribution
- **Progress Tracking**: Bar charts comparing solved vs total problems
- **Rating History**: Codeforces rating progression over time
- **Submission Activity**: Weekly submission patterns

### 🎯 **User Experience**
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Automatic data fetching when handles are saved
- **Profile Management**: Save and manage multiple platform handles
- **Interactive Charts**: Hover tooltips and detailed information

## 🚀 Live Demo

[https://competative.vercel.app/]

## 🛠️ Technologies Used

- **Frontend**: React 18, React Router DOM
- **Charts**: Recharts (D3-based charting library)
- **Styling**: CSS3 with responsive design
- **HTTP Client**: Axios for API requests
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🔌 API Integration

### Codeforces API
- **User Info**: `https://codeforces.com/api/user.info?handles={handle}`
- **User Status**: `https://codeforces.com/api/user.status?handle={handle}`
- **Rating History**: `https://codeforces.com/api/user.rating?handle={handle}`

### LeetCode API
- **User Stats**: `https://leetcode-stats-api.herokuapp.com/{username}`

### GeeksforGeeks
- Currently uses mock data (no public API available)
- Future implementation may include web scraping
