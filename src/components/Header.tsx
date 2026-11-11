import React from 'react'
import './Header.css'

interface HeaderProps {
  showHelp?: boolean
}

export const Header: React.FC<HeaderProps> = ({ showHelp = false }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">EASY BURGER</h1>
        {showHelp && (
          <button className="help-button" title="도움말">
            ? 도움말
          </button>
        )}
      </div>
    </header>
  )
}
