import React, { useEffect, useState } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  visible: boolean
  duration?: number
  onClose?: () => void
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 2000,
  onClose
}) => {
  const [show, setShow] = useState(visible)

  useEffect(() => {
    setShow(visible)
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  if (!show) return null

  return (
    <div className="toast">
      <div className="toast-content">
        <span className="toast-icon">✓</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  )
}
