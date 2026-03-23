import type { MeatOption } from '~/types/calculator'

export const MEAT_OPTIONS: MeatOption[] = [
  { id: 'picanha', name: 'Picanha', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'maminha', name: 'Maminha', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'costela', name: 'Costela Bovina', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'alcatra', name: 'Alcatra', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'fraldinha', name: 'Fraldinha', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'linguica', name: 'Linguica', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'costela-suina', name: 'Costela Suina', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'pernil', name: 'Pernil', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'coxa-sobrecoxa', name: 'Coxa/Sobrecoxa', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'asa', name: 'Asa de Frango', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'coracao', name: 'Coracao', category: 'chicken', icon: 'i-lucide-drumstick' }
]

export const MEAT_CATEGORIES = [
  { id: 'bovine', name: 'Bovinos', icon: 'i-lucide-beef' },
  { id: 'pork', name: 'Suinos', icon: 'i-lucide-ham' },
  { id: 'chicken', name: 'Frango', icon: 'i-lucide-drumstick' }
] as const
