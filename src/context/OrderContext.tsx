import React, { createContext, useState, useContext, ReactNode } from 'react'
import { MenuItem } from '../data/menuData'

export type OrderType = 'dinein' | 'takeout' | null
export type TextSize = 'normal' | 'large'

export interface OrderItem {
  menuItem: MenuItem
  selectedDrink: string
  selectedSide: string
  quantity: number
}

interface OrderContextType {
  orderType: OrderType
  setOrderType: (type: OrderType) => void
  textSize: TextSize
  setTextSize: (size: TextSize) => void
  selectedMenuItem: MenuItem | null
  setSelectedMenuItem: (item: MenuItem | null) => void
  selectedMenuItems: MenuItem[]
  setSelectedMenuItems: (items: MenuItem[]) => void
  cart: OrderItem[]
  addToCart: (item: OrderItem) => void
  removeFromCart: (menuItemId: string) => void
  removeFromCartByIndex: (index: number) => void
  updateCartItem: (index: number, item: OrderItem) => void
  editingCartIndex: number | null
  setEditingCartIndex: (index: number | null) => void
  totalPrice: number
  orderNumber: string | null
  completeOrder: () => void
  resetOrder: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderType, setOrderType] = useState<OrderType>(null)
  const [textSize, setTextSize] = useState<TextSize>('normal')
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<OrderItem[]>([])
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [editingCartIndex, setEditingCartIndex] = useState<number | null>(null)

  const addToCart = (item: OrderItem) => {
    setCart([...cart, item])
  }

  const removeFromCart = (menuItemId: string) => {
    setCart(cart.filter(item => item.menuItem.id !== menuItemId))
  }

  const removeFromCartByIndex = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const updateCartItem = (index: number, item: OrderItem) => {
    const newCart = [...cart]
    newCart[index] = item
    setCart(newCart)
    setEditingCartIndex(null)
  }

  const totalPrice = cart.reduce((sum, item) => {
    const drinkPrice = item.selectedDrink ? 0 : 0
    const sidePrice = item.selectedSide === 'side-cheese' ? 500 : 0
    return sum + (item.menuItem.price + drinkPrice + sidePrice) * item.quantity
  }, 0)

  const completeOrder = () => {
    const number = String(Math.floor(Math.random() * 900) + 100)
    setOrderNumber(number)
  }

  const resetOrder = () => {
    setOrderType(null)
    setSelectedMenuItem(null)
    setCart([])
    setOrderNumber(null)
  }

  return (
    <OrderContext.Provider
      value={{
        orderType,
        setOrderType,
        textSize,
        setTextSize,
        selectedMenuItem,
        setSelectedMenuItem,
        selectedMenuItems,
        setSelectedMenuItems,
        cart,
        addToCart,
        removeFromCart,
        removeFromCartByIndex,
        updateCartItem,
        editingCartIndex,
        setEditingCartIndex,
        totalPrice,
        orderNumber,
        completeOrder,
        resetOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return context
}
