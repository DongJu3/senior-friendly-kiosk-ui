import React from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import './OrderTypeSelect.css'

interface OrderTypeSelectProps {
  onSelectType: (type: 'dinein' | 'takeout') => void
  onBack: () => void
}

export const OrderTypeSelect: React.FC<OrderTypeSelectProps> = ({
  onSelectType,
  onBack
}) => {
  return (
    <div className="order-type-container">
      <Header showHelp />

      <div className="order-type-breadcrumb">
        <span className="breadcrumb-step">주문 시작</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-step active">이음 방법 선택</span>
      </div>

      <div className="order-type-content">
        <h2 className="order-type-title">어디에서 드시겠어요?</h2>
        <p className="order-type-subtitle">원하는 이음 방법을 눌러주세요.</p>

        <div className="order-type-cards">
          <button
            className="order-type-card dine-in"
            onClick={() => onSelectType('dinein')}
          >
            <div className="card-number">01 DINE IN</div>
            <div className="card-title">매장에서 먹기</div>
            <div className="card-description">매장 안에서 편하게 드세요</div>
          </button>

          <button
            className="order-type-card takeout"
            onClick={() => onSelectType('takeout')}
          >
            <div className="card-number">02 TAKE OUT</div>
            <div className="card-title">포장하기</div>
            <div className="card-description">가지고 가실 수 있도록 포장해 드릴게요</div>
          </button>
        </div>
      </div>

      <div className="order-type-footer">
        <Button variant="secondary" onClick={onBack}>
          시작 화면으로
        </Button>
      </div>
    </div>
  )
}
