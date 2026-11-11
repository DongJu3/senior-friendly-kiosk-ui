import React from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { useOrder } from '../context/OrderContext'
import './OrderCompleteScreen.css'

interface OrderCompleteScreenProps {
  onReset: () => void
}

export const OrderCompleteScreen: React.FC<OrderCompleteScreenProps> = ({
  onReset
}) => {
  const { orderNumber } = useOrder()

  return (
    <div className="order-complete-screen">
      <Header showHelp />

      <div className="complete-breadcrumb">
        <div className="breadcrumb-item active">
          <span className="breadcrumb-check">✓</span>
          <span>1 메뉴 선택</span>
        </div>
        <div className="breadcrumb-item active">
          <span className="breadcrumb-check">✓</span>
          <span>2 음선 선택</span>
        </div>
        <div className="breadcrumb-item active">
          <span className="breadcrumb-check">✓</span>
          <span>3 주문 확인</span>
        </div>
      </div>

      <div className="complete-order-type">
        <span className="complete-order-label">이음 방법</span>
        <span className="complete-order-value">매장에서 먹기</span>
      </div>

      <div className="complete-content">
        <div className="complete-icon">✓</div>

        <h2 className="complete-title">주문이 완료되었습니다</h2>

        <div className="complete-order-number-section">
          <div className="complete-order-number-label">주문번호</div>
          <div className="complete-order-number">{orderNumber}</div>
        </div>

        <div className="complete-message">
          <p>화면의 주문번호를 확인해주세요.</p>
          <p>준비가 되면 번호를 불러드립니다.</p>
        </div>
      </div>

      <div className="complete-footer">
        <Button variant="primary" onClick={onReset}>
          처음으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
