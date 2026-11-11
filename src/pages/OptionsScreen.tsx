import React, { useState } from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Toast } from '../components/Toast'
import { useOrder } from '../context/OrderContext'
import { drinkOptions, sideOptions } from '../data/menuData'
import './OptionsScreen.css'

interface OptionsScreenProps {
  onNext: () => void
  onBack: () => void
  onAddMore?: () => void
}

export const OptionsScreen: React.FC<OptionsScreenProps> = ({ onBack, onAddMore }) => {
  const { selectedMenuItem, selectedMenuItems, addToCart, updateCartItem, editingCartIndex, setSelectedMenuItem, setSelectedMenuItems, cart } = useOrder()

  const isEditMode = editingCartIndex !== null
  const initialDrink = isEditMode && editingCartIndex !== null ? cart[editingCartIndex]?.selectedDrink || 'drink-cola' : 'drink-cola'
  const initialSide = isEditMode && editingCartIndex !== null ? cart[editingCartIndex]?.selectedSide || 'side-fries' : 'side-fries'

  const [selectedDrink, setSelectedDrink] = useState<string>(initialDrink)
  const [selectedSide, setSelectedSide] = useState<string>(initialSide)
  const [showToast, setShowToast] = useState(false)

  if (!selectedMenuItem) {
    return <div>메뉴를 선택하지 않았습니다</div>
  }

  const handleBackClick = () => {
    setSelectedMenuItem(null)
    setSelectedMenuItems([])
    onBack()
  }

  const handleNext = () => {
    if (isEditMode && editingCartIndex !== null) {
      // 수정 모드: 기존 항목 업데이트
      updateCartItem(editingCartIndex, {
        menuItem: selectedMenuItem,
        selectedDrink,
        selectedSide,
        quantity: cart[editingCartIndex].quantity
      })
      setShowToast(true)
      setTimeout(() => {
        onBack()
      }, 1500)
    } else {
      // 추가 모드: 새로운 항목 추가
      addToCart({
        menuItem: selectedMenuItem,
        selectedDrink,
        selectedSide,
        quantity: 1
      })
      setShowToast(true)

      // 남은 메뉴가 있는지 확인
      const remainingMenus = selectedMenuItems.filter(m => m.id !== selectedMenuItem.id)

      setTimeout(() => {
        if (remainingMenus.length > 0) {
          // 다음 메뉴로 자동 이동
          setSelectedMenuItem(remainingMenus[0])
          setSelectedDrink('drink-cola')
          setSelectedSide('side-fries')
        } else {
          // 남은 메뉴가 없으면 메뉴 선택 화면으로 돌아감
          setSelectedMenuItem(null)
          setSelectedMenuItems([])
          onAddMore?.()
        }
      }, 1500)
    }
  }

  const selectedDrinkObj = drinkOptions.find(d => d.id === selectedDrink)
  const selectedSideObj = sideOptions.find(s => s.id === selectedSide)
  const totalPrice = selectedMenuItem.price + (selectedSideObj?.price || 0)

  return (
    <div className="options-screen">
      <Header showHelp />

      <div className="options-order-type">
        <span className="options-order-label">이음 방법</span>
        <span className="options-order-value">매장에서 먹기</span>
      </div>

      <div className="options-content">
        <h2 className="options-title">{selectedMenuItem.name} 옵션을 선택해주세요</h2>
        <p className="options-subtitle">음료와 사이드를 하나씩 선택해주세요.</p>

        <div className="selected-menu-box">
          <div className="selected-menu-image">BURGER</div>
          <div className="selected-menu-info">
            <div className="selected-menu-name">{selectedMenuItem.name}</div>
            <div className="selected-menu-price">기본 {selectedMenuItem.price.toLocaleString()}원</div>
          </div>
        </div>

        <div className="options-section">
          <h3 className="options-section-title">1. 음료를 선택해주세요</h3>
          <div className="options-grid">
            {drinkOptions.map(drink => (
              <button
                key={drink.id}
                className={`option-card ${selectedDrink === drink.id ? 'selected' : ''}`}
                onClick={() => setSelectedDrink(drink.id)}
              >
                {selectedDrink === drink.id && (
                  <div className="option-card-check">✓</div>
                )}
                <div className="option-card-label">{drink.name}</div>
                <div className="option-card-info">선택됨 · 기본 음료</div>
              </button>
            ))}
          </div>
        </div>

        <div className="options-section">
          <h3 className="options-section-title">2. 사이드를 선택해주세요</h3>
          <div className="options-grid">
            {sideOptions.map(side => (
              <button
                key={side.id}
                className={`option-card ${selectedSide === side.id ? 'selected' : ''}`}
                onClick={() => setSelectedSide(side.id)}
              >
                {selectedSide === side.id && (
                  <div className="option-card-check">✓</div>
                )}
                <div className="option-card-label">{side.name}</div>
                <div className="option-card-info">
                  {side.price > 0 ? `+${side.price}원` : '선택됨 · 기본 사이드'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="current-selection-box">
          <div className="current-selection-title">현재 선택</div>
          <div className="current-selection-row">
            <span>메뉴</span>
            <span>{selectedMenuItem.name}</span>
          </div>
          <div className="current-selection-row">
            <span>음선</span>
            <span>{selectedDrinkObj?.name} · {selectedSideObj?.name}</span>
          </div>
          <div className="current-selection-row">
            <span>현재 금액</span>
            <span className="current-price">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className="options-footer">
        <Button variant="secondary" onClick={handleBackClick}>
          이전
        </Button>
        <Button variant="primary" onClick={handleNext}>
          다음
        </Button>
      </div>

      <Toast
        message={isEditMode ? '메뉴가 수정되었습니다' : '메뉴가 장바구니에 추가되었습니다'}
        visible={showToast}
      />
    </div>
  )
}
