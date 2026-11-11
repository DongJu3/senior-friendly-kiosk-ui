import React, { useState } from 'react'
import { useOrder } from '../context/OrderContext'
import './StartScreen.css'

interface StartScreenProps {
  onStart: () => void
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { textSize, setTextSize } = useOrder()
  const [showTextSizeOptions, setShowTextSizeOptions] = useState(false)

  const handleSelectTextSize = (size: 'normal' | 'large') => {
    setTextSize(size)
    setTimeout(() => {
      onStart()
    }, 300)
  }

  const handleStart = () => {
    if (!showTextSizeOptions) {
      setShowTextSizeOptions(true)
    }
  }

  return (
    <div className="start-screen" onClick={showTextSizeOptions ? undefined : handleStart}>
      <div className="start-content">
        <div className="start-top">
          <h1 className="start-brand">EASY BURGER</h1>
        </div>

        <div className="start-middle">
          <p className="start-tagline">맛있는 한 끼,</p>
          <p className="start-tagline">여기서 시작해요.</p>

          <button className="start-cta-button">
            갓 만든 버거 · 간편한 주문
          </button>
        </div>

        <div className="start-logo">
          <p>EASY</p>
          <p>BURGER</p>
        </div>

        <div className="start-instruction-box">
          <p className="start-instruction-main">화면을 터치해 주세요</p>
          <p className="start-instruction-sub">터치하면 주문을 시작합니다</p>
        </div>

        {showTextSizeOptions && (
          <div className="start-textsize-options">
            <div className="textsize-title">글씨 크기를 선택해주세요</div>
            <button
              className={`textsize-btn ${textSize === 'normal' ? 'active' : ''}`}
              onClick={() => handleSelectTextSize('normal')}
            >
              일반 화면
            </button>
            <button
              className={`textsize-btn ${textSize === 'large' ? 'active' : ''}`}
              onClick={() => handleSelectTextSize('large')}
            >
              중장년·노년층
              <br />
              큰 글씨 화면
            </button>
          </div>
        )}

        {!showTextSizeOptions && (
          <div className="start-footer-text">
            <p>큰 글씨 화면도 준비되어 있어요.</p>
            <p>메뉴 화면에서 선택할 수 있습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
