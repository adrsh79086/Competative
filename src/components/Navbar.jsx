import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Code, User, BarChart3, Menu, X } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333333',
    padding: isMobile ? '12px 16px' : '8px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontSize: isMobile ? '1rem' : 'inherit'
  }

  const activeLinkStyle = {
    ...navLinkStyle,
    background: 'rgba(0, 0, 0, 0.1)'
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      padding: isMobile ? '0 15px' : '0 20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: isMobile ? '60px' : '70px'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#333333',
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Trophy size={isMobile ? 20 : 24} />
          C-P Tracker
        </Link>
        
        {isMobile ? (
          <>
            <button
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMenuOpen ? <X size={24} color="#333333" /> : <Menu size={24} color="#333333" />}
            </button>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px'
              }}>
                <Link to="/" style={isActive('/') ? activeLinkStyle : navLinkStyle} onClick={closeMenu}>
                  <BarChart3 size={20} />
                  Dashboard
                </Link>
                
                <Link to="/codeforces" style={isActive('/codeforces') ? activeLinkStyle : navLinkStyle} onClick={closeMenu}>
                  <Code size={20} />
                  Codeforces
                </Link>
                
                <Link to="/leetcode" style={isActive('/leetcode') ? activeLinkStyle : navLinkStyle} onClick={closeMenu}>
                  <Code size={20} />
                  LeetCode
                </Link>
                
                <Link to="/geeksforgeeks" style={isActive('/geeksforgeeks') ? activeLinkStyle : navLinkStyle} onClick={closeMenu}>
                  <Code size={20} />
                  GFG
                </Link>
                
                <Link to="/profile" style={isActive('/profile') ? activeLinkStyle : navLinkStyle} onClick={closeMenu}>
                  <User size={20} />
                  Profile
                </Link>
              </div>
            )}
          </>
        ) : (
          <div style={{
            display: 'flex',
            gap: '20px'
          }}>
            <Link to="/" style={isActive('/') ? activeLinkStyle : navLinkStyle}>
              <BarChart3 size={20} />
              Dashboard
            </Link>
            
            <Link to="/codeforces" style={isActive('/codeforces') ? activeLinkStyle : navLinkStyle}>
              <Code size={20} />
              Codeforces
            </Link>
            
            <Link to="/leetcode" style={isActive('/leetcode') ? activeLinkStyle : navLinkStyle}>
              <Code size={20} />
              LeetCode
            </Link>
            
            <Link to="/geeksforgeeks" style={isActive('/geeksforgeeks') ? activeLinkStyle : navLinkStyle}>
              <Code size={20} />
              GFG
            </Link>
            
            <Link to="/profile" style={isActive('/profile') ? activeLinkStyle : navLinkStyle}>
              <User size={20} />
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 