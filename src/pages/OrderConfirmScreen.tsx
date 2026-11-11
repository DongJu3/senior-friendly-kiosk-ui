import React from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { useOrder } from '../context/OrderContext'
import { drinkOptions, sideOptions } from '../data/menuData'
import './OrderConfirmScreen.css'

interface OrderConfirmScreenProps {
  onNext: () => void
  onBack: () => void
}

export const OrderConfirmScreen: React.FC<OrderConfirmScreenProps> = ({
  onNext,
  onBack
}) => {
  const { cart, totalPrice, completeOrder } = useOrder()

  const handleConfirm = () => {
    completeOrder()
    onNext()
  }

  const getDrinkName = (drinkId: string) => {
    return drinkOptions.find(d => d.id === drinkId)?.name || ''
  }

  const getSideName = (sideId: string) => {
    return sideOptions.find(s => s.id === sideId)?.name || ''
  }

  return (
    <div className="order-confirm-screen">
      <Header showHelp />

      <div className="confirm-order-type">
        <span className="confirm-order-label">이음 방법</span>
        <span className="confirm-order-value">매장에서 먹기</span>
      </div>

      <div className="confirm-content">
        <h2 className="confirm-title">주문 내용을 확인해주세요</h2>
        <p className="confirm-subtitle">선택한 메뉴와 옵션이 맞는지 확인해주세요.</p>

        <div className="order-items-list">
          {cart.map((item, index) => (
            <div key={index} className="order-item-card">
              <div className="order-item-image">BURGER</div>
              <div className="order-item-details">
                <div className="order-item-name">{item.menuItem.name}</div>
                <div className="order-item-info">수량 {item.quantity}개</div>
                <div className="order-item-divider"></div>
                <div className="order-item-row">
                  <span>음료</span>
                  <span>{getDrinkName(item.selectedDrink)}</span>
                </div>
                <div className="order-item-row">
                  <span>사이드</span>
                  <span>{getSideName(item.selectedSide)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-tip">
          ✓ 내용이 다르면 '수정하기'를 눌러 다시 선택할 수 있습니다.
        </div>

        <div className="order-total-box">
          <div className="order-total-label">총 금액</div>
          <div className="order-total-price">{totalPrice.toLocaleString()}원</div>
        </div>
      </div>

      <div className="confirm-footer">
        <Button variant="secondary" onClick={onBack}>
          수정하기
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          주문 완료
        </Button>
      </div>
    </div>
  )
}
