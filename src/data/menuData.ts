export interface MenuItem {
  id: string
  name: string
  price: number
  category: 'recommended' | 'set' | 'burger' | 'side' | 'drink'
  description: string
}

export interface DrinkOption {
  id: string
  name: string
  price: number
}

export interface SideOption {
  id: string
  name: string
  price: number
}

export const menuItems: MenuItem[] = [
  // 추천
  { id: 'rec1', name: '불고기버거 세트', price: 7500, category: 'recommended', description: '버거 + 사이드 + 음료' },
  { id: 'rec2', name: '치킨버거 세트', price: 8000, category: 'recommended', description: '버거 + 사이드 + 음료' },
  { id: 'rec3', name: '새우버거 세트', price: 8200, category: 'recommended', description: '버거 + 사이드 + 음료' },
  { id: 'rec4', name: '더블버거 세트', price: 9000, category: 'recommended', description: '버거 + 사이드 + 음료' },

  // 세트
  { id: 'set1', name: '불고기버거 세트', price: 7500, category: 'set', description: '버거 + 사이드 + 음료' },
  { id: 'set2', name: '치킨버거 세트', price: 8000, category: 'set', description: '버거 + 사이드 + 음료' },
  { id: 'set3', name: '새우버거 세트', price: 8200, category: 'set', description: '버거 + 사이드 + 음료' },
  { id: 'set4', name: '더블버거 세트', price: 9000, category: 'set', description: '버거 + 사이드 + 음료' },

  // 버거
  { id: 'burg1', name: '불고기버거', price: 5500, category: 'burger', description: '한우 불고기를 사용한 버거' },
  { id: 'burg2', name: '치킨버거', price: 5800, category: 'burger', description: '담백한 치킨 버거' },
  { id: 'burg3', name: '새우버거', price: 6000, category: 'burger', description: '통통한 새우가 가득' },
  { id: 'burg4', name: '더블버거', price: 7500, category: 'burger', description: '2개의 버거 패티' },

  // 사이드
  { id: 'side1', name: '감자튀김', price: 3000, category: 'side', description: '바삭한 감자튀김' },
  { id: 'side2', name: '치즈스틱', price: 3500, category: 'side', description: '뜨거운 치즈스틱' },
  { id: 'side3', name: '너겟', price: 3200, category: 'side', description: '황금빛 너겟' },
  { id: 'side4', name: '옥수수', price: 2500, category: 'side', description: '달콤한 옥수수' },

  // 음료
  { id: 'drink1', name: '콜라', price: 2000, category: 'drink', description: '차가운 콜라' },
  { id: 'drink2', name: '사이다', price: 2000, category: 'drink', description: '상큼한 사이다' },
  { id: 'drink3', name: '제로콜라', price: 2000, category: 'drink', description: '제로 칼로리 콜라' },
  { id: 'drink4', name: '오렌지주스', price: 3000, category: 'drink', description: '신선한 오렌지 주스' },
]

export const drinkOptions: DrinkOption[] = [
  { id: 'drink-cola', name: '콜라', price: 0 },
  { id: 'drink-cider', name: '사이다', price: 0 },
  { id: 'drink-zero', name: '제로콜라', price: 0 },
]

export const sideOptions: SideOption[] = [
  { id: 'side-fries', name: '감자튀김', price: 0 },
  { id: 'side-cheese', name: '치즈스틱', price: 500 },
]

export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return menuItems.filter(item => item.category === category)
}
