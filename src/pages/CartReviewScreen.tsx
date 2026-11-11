import React from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { useOrder } from '../context/OrderContext'
import { drinkOptions, sideOptions } from '../data/menuData'
import './CartReviewScreen.css'

interface CartReviewScreenProps {
  onNext: () => void
  onBack: () => void
  onEditItem?: (index: number) => void
}

export const CartReviewScreen: React.FC<CartReviewScreenProps> = ({
  onNext,
  onBack,
  onEditItem
}) => {
  const { cart, totalPrice, setEditingCartIndex, removeFromCartByIndex } = useOrder()

  const getDrinkName = (drinkId: string) => {
    return drinkOptions.find(d => d.id === drinkId)?.name || ''
  }

  const getSideName = (sideId: string) => {
    return sideOptions.find(s => s.id === sideId)?.name || ''
  }

  return (
    <div className="cart-review-screen">
      <Header showHelp />

      <div className="cart-order-type">
        <span className="cart-order-label">이음 방법</span>
        <span className="cart-order-value">매장에서 먹기</span>
      </div>

      <div className="cart-content">
        <h2 className="cart-title">장바구니 확인</h2>
        <p className="cart-subtitle">선택한 메뉴를 확인해주세요.</p>

        <div className="cart-items-list">
          {cart.map((item, index) => (
            <div key={index} className="cart-item-card">
              <div className="cart-item-image">BURGER</div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.menuItem.name}</div>
                <div className="cart-item-info">수량 {item.quantity}개</div>
                <div className="cart-item-divider"></div>
                <div className="cart-item-row">
                  <span>음료</span>
                  <span>{getDrinkName(item.selectedDrink)}</span>
                </div>
                <div className="cart-item-row">
                  <span>사이드</span>
                  <span>{getSideName(item.selectedSide)}</span>
                </div>
                <div className="cart-item-buttons">
                  <button
                    className="cart-item-edit-btn"
                    onClick={() => {
                      setEditingCartIndex(index)
                      onEditItem?.(index)
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="cart-item-remove-btn"
                    onClick={() => removeFromCartByIndex(index)}
                  >
                    제거
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total-box">
          <div className="cart-total-label">총 금액</div>
          <div className="cart-total-price">{totalPrice.toLocaleString()}원</div>
        </div>
      </div>

      <div className="cart-footer">
        <Button variant="secondary" onClick={onBack}>
          메뉴로 돌아가기
        </Button>
        <Button variant="primary" onClick={onNext}>
          결제하기
        </Button>
      </div>
    </div>
  )
}
