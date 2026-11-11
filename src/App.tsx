import { useState, useEffect } from 'react'
import { OrderProvider, useOrder } from './context/OrderContext'
import { StartScreen } from './pages/StartScreen'
import { OrderTypeSelect } from './pages/OrderTypeSelect'
import { MenuScreen } from './pages/MenuScreen'
import { OptionsScreen } from './pages/OptionsScreen'
import { CartReviewScreen } from './pages/CartReviewScreen'
import { OrderConfirmScreen } from './pages/OrderConfirmScreen'
import { OrderCompleteScreen } from './pages/OrderCompleteScreen'

type ScreenType = 'start' | 'typeselect' | 'menu' | 'options' | 'cartreview' | 'confirm' | 'complete'

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start')
  const [scale, setScale] = useState(1)
  const { setOrderType, resetOrder, textSize, completeOrder } = useOrder()

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const scaleX = viewportWidth / 1080
      const scaleY = viewportHeight / 1920

      const newScale = Math.min(scaleX, scaleY)
      setScale(newScale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize)
  }, [textSize])

  const handleStartClick = () => {
    setCurrentScreen('typeselect')
  }

  const handleSelectType = (type: 'dinein' | 'takeout') => {
    setOrderType(type)
    setCurrentScreen('menu')
  }

  const handleMenuNext = () => {
    setCurrentScreen('options')
  }

  const handleMenuBack = () => {
    setCurrentScreen('typeselect')
  }

  const handleCartReview = () => {
    setCurrentScreen('cartreview')
  }

  const handleCartReviewBack = () => {
    setCurrentScreen('menu')
  }

  const handleCartReviewNext = () => {
    completeOrder()
    setCurrentScreen('complete')
  }

  const handleEditItem = () => {
    setCurrentScreen('options')
  }

  const handleOptionsNext = () => {
    setCurrentScreen('confirm')
  }

  const handleOptionsBack = () => {
    setCurrentScreen('menu')
  }

  const handleAddMore = () => {
    setCurrentScreen('menu')
  }

  const handleConfirmNext = () => {
    setCurrentScreen('complete')
  }

  const handleConfirmBack = () => {
    setCurrentScreen('options')
  }

  const handleCompleteReset = () => {
    resetOrder()
    setCurrentScreen('start')
  }

  const handleBackToStart = () => {
    resetOrder()
    setCurrentScreen('start')
  }

  return (
    <div className="app-wrapper" data-text-size={textSize}>
      <div
        className="kiosk-viewport"
        style={{
          transform: `scale(${scale})`
        }}
      >
        <div className="kiosk-screen">
          {currentScreen === 'start' && <StartScreen onStart={handleStartClick} />}
          {currentScreen === 'typeselect' && (
            <OrderTypeSelect
              onSelectType={handleSelectType}
              onBack={handleBackToStart}
            />
          )}
          {currentScreen === 'menu' && (
            <MenuScreen
              onNext={handleMenuNext}
              onBack={handleMenuBack}
              onCartReview={handleCartReview}
            />
          )}
          {currentScreen === 'options' && (
            <OptionsScreen
              onNext={handleOptionsNext}
              onBack={handleOptionsBack}
              onAddMore={handleAddMore}
            />
          )}
          {currentScreen === 'cartreview' && (
            <CartReviewScreen
              onNext={handleCartReviewNext}
              onBack={handleCartReviewBack}
              onEditItem={handleEditItem}
            />
          )}
          {currentScreen === 'confirm' && (
            <OrderConfirmScreen
              onNext={handleConfirmNext}
              onBack={handleConfirmBack}
            />
          )}
          {currentScreen === 'complete' && (
            <OrderCompleteScreen
              onReset={handleCompleteReset}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  )
}
