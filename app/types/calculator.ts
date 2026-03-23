export type DrinkIntensity = 'light' | 'moderate' | 'heavy'
export type EventDuration = 'short' | 'medium' | 'long'
export type MeatCategory = 'bovine' | 'pork' | 'chicken' | 'fish'
export type MeatPriority = 'low' | 'normal' | 'high'

export interface MeatSelection {
  id: string
  priority: MeatPriority
}

export interface MeatOption {
  id: string
  name: string
  category: MeatCategory
  icon: string
}

export type SideCategory = 'acompanhamento' | 'essencial'

export interface SideOption {
  id: string
  name: string
  icon: string
  perPerson: number
  unit: 'g' | 'un' | 'kg' | 'L'
  category: SideCategory
}

export interface BeverageSelection {
  beer: boolean
  beerIntensity: DrinkIntensity
  softDrinks: boolean
  water: boolean
  juice: boolean
  wine: boolean
  energy: boolean
}

export interface CalculatorInput {
  men: number
  women: number
  children: number
  selectedMeats: MeatSelection[]
  beverages: BeverageSelection
  selectedSides: string[]
  duration: EventDuration
}

export interface ResultItem {
  name: string
  quantity: number
  unit: string
}

export interface CalculatorResult {
  meats: ResultItem[]
  beverages: ResultItem[]
  sides: ResultItem[]
  essentials: ResultItem[]
  totalPeople: number
}
