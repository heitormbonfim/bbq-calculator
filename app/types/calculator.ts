export type DrinkIntensity = 'light' | 'moderate' | 'heavy'
export type EventDuration = 'short' | 'medium' | 'long'
export type MeatCategory = 'bovine' | 'pork' | 'chicken' | 'other'

export interface MeatOption {
  id: string
  name: string
  category: MeatCategory
  icon: string
}

export interface SideOption {
  id: string
  name: string
  icon: string
  perPerson: number
  unit: 'g' | 'un'
}

export interface BeverageSelection {
  beer: boolean
  beerIntensity: DrinkIntensity
  softDrinks: boolean
  water: boolean
  juice: boolean
}

export interface CalculatorInput {
  men: number
  women: number
  children: number
  selectedMeats: string[]
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
  totalPeople: number
}
