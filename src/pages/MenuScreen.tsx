import React, { useState, useEffect, useRef } from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Toast } from '../components/Toast'
import { useOrder } from '../context/OrderContext'
import { menuItems, getMenuItemsByCategory, MenuItem } from '../data/menuData'
import './MenuScreen.css'

type CategoryType = 'recommended' | 'set' | 'burger' | 'side' | 'drink'

interface MenuScreenProps {
  onNext: () => void
  onBack: () => void
  onCartReview?: () => void
  key?: string
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onNext, onBack, onCartReview }) => {
  const { selectedMenuItems, setSelectedMenuItems, setSelectedMenuItem, addToCart, cart, totalPrice } = useOrder()
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('set')
  const [selectedMenuIds, setSelectedMenuIds] = useState<Set<string>>(
    new Set(selectedMenuItems.map(m => m.id))
  )
  const [showToast, setShowToast] = useState(false)
  const isFirstLoadRef = useRef(true)

  // selectedMenuItems가 변경될 때마다 selectedMenuIds 동기화
  useEffect(() => {
    setSelectedMenuIds(new Set(selectedMenuItems.map(m => m.id)))
  }, [selectedMenuItems])

  // 선택된 메뉴가 정확히 1개이면 처리 (첫 진입 시에만)
  useEffect(() => {
    if (selectedMenuIds.size === 1 && isFirstLoadRef.current) {
      isFirstLoadRef.current = false
      const selectedMenus = menuItems.filter(m => selectedMenuIds.has(m.id))
      const menu = selectedMenus[0]

      if (menu.category === 'set') {
        // 세트: 옵션 선택 화면으로
        setSelectedMenuItems(selectedMenus)
        setSelectedMenuItem(menu)
        setSelectedMenuIds(new Set()) // 자동 처리 후 초기화
        onNext()
      } else {
        // 세트 아님: 바로 장바구니에 추가
        addToCart({
          menuItem: menu,
          selectedDrink: 'drink-cola',
          selectedSide: 'side-fries',
          quantity: 1
        })
        setShowToast(true)
        // 다시 자동 처리가 가능하도록 리셋
        isFirstLoadRef.current = true
        setSelectedMenuIds(new Set()) // 자동 처리 후 초기화
      }
    } else if (selectedMenuIds.size > 1) {
      isFirstLoadRef.current = false
    }
  }, [selectedMenuIds.size])

  const categoryLabels: Record<CategoryType, string> = {
    recommended: '추천',
    set: '세트',
    burger: '버거',
    side: '사이드',
    drink: '음료'
  }

  const categoryList: CategoryType[] = ['recommended', 'set', 'burger', 'side', 'drink']
  const currentMenuItems = getMenuItemsByCategory(selectedCategory)

  const handleSelectMenu = (menu: MenuItem) => {
    setSelectedMenuIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(menu.id)) {
        newSet.delete(menu.id)
      } else {
        newSet.add(menu.id)
      }
      return newSet
    })
  }

  const totalItemsForCheckout = selectedMenuIds.size + cart.length

  const handleNext = () => {
    if (selectedMenuIds.size > 0) {
      const selectedMenus = menuItems.filter(m => selectedMenuIds.has(m.id))
      setSelectedMenuItems(selectedMenus)
      // 첫 번째 메뉴를 selectedMenuItem으로 설정
      setSelectedMenuItem(selectedMenus[0])
      onNext()
    } else if (cart.length > 0) {
      // 선택된 메뉴가 없지만 장바구니에 있으면 주문 확인 화면으로
      onCartReview?.()
    }
  }

  return (
    <div className="menu-screen">
      <Header showHelp />

      <div className="menu-order-type">
        <span className="menu-order-label">이음 방법</span>
        <span className="menu-order-value">매장에서 먹기</span>
        {cart.length > 0 && (
          <div className="menu-cart-info">
            장바구니: {cart.length}개 / {totalPrice.toLocaleString()}원
          </div>
        )}
      </div>

      <div className="menu-content">
        <h2 className="menu-title">메뉴를 선택해주세요</h2>
        <p className="menu-subtitle">원하는 종류를 먼저 누른 뒤, 메뉴를 선택해주세요.</p>

        <div className="menu-categories">
          {categoryList.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="menu-cards-grid">
          {currentMenuItems.map(menu => (
            <button
              key={menu.id}
              className={`menu-card ${selectedMenuIds.has(menu.id) ? 'selected' : ''}`}
              onClick={() => handleSelectMenu(menu)}
            >
              {selectedMenuIds.has(menu.id) && (
                <div className="menu-card-check">✓</div>
              )}
              <div className="menu-card-placeholder">BURGER</div>
              <div className="menu-card-name">{menu.name}</div>
              <div className="menu-card-price">{menu.price.toLocaleString()}원</div>
              <div className="menu-card-description">{menu.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="menu-footer">
        <Button variant="secondary" onClick={onBack}>
          이전
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={selectedMenuIds.size === 0 && cart.length === 0}>
          결제 ({totalItemsForCheckout})
        </Button>
      </div>

      <Toast
        message="메뉴가 장바구니에 추가되었습니다"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}
