import type { SideOption } from '~/types/calculator'

export const SIDE_OPTIONS: SideOption[] = [
  { id: 'pao-de-alho', name: 'Pao de Alho', icon: 'i-lucide-croissant', perPerson: 2, unit: 'un' },
  { id: 'farofa', name: 'Farofa', icon: 'i-lucide-wheat', perPerson: 50, unit: 'g' },
  { id: 'vinagrete', name: 'Vinagrete', icon: 'i-lucide-salad', perPerson: 50, unit: 'g' },
  { id: 'arroz', name: 'Arroz', icon: 'i-lucide-cooking-pot', perPerson: 100, unit: 'g' },
  { id: 'salada', name: 'Salada', icon: 'i-lucide-leaf', perPerson: 80, unit: 'g' },
  { id: 'mandioca', name: 'Mandioca', icon: 'i-lucide-carrot', perPerson: 100, unit: 'g' },
  { id: 'maionese', name: 'Maionese', icon: 'i-lucide-egg', perPerson: 80, unit: 'g' }
]
