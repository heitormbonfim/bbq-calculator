import type { SideOption } from '~/types/calculator'

export const SIDE_OPTIONS: SideOption[] = [
  // Acompanhamentos
  { id: 'pao-de-alho', name: 'Pão de Alho', icon: 'i-lucide-croissant', perPerson: 2, unit: 'un', category: 'acompanhamento' },
  { id: 'farofa', name: 'Farofa', icon: 'i-lucide-wheat', perPerson: 100, unit: 'g', category: 'acompanhamento' },
  { id: 'vinagrete', name: 'Vinagrete', icon: 'i-lucide-salad', perPerson: 150, unit: 'g', category: 'acompanhamento' },
  { id: 'arroz', name: 'Arroz', icon: 'i-lucide-cooking-pot', perPerson: 80, unit: 'g', category: 'acompanhamento' },
  { id: 'salada', name: 'Salada', icon: 'i-lucide-leaf', perPerson: 80, unit: 'g', category: 'acompanhamento' },
  { id: 'maionese', name: 'Maionese de Batata', icon: 'i-lucide-egg', perPerson: 100, unit: 'g', category: 'acompanhamento' },
  { id: 'mandioca', name: 'Mandioca Frita', icon: 'i-lucide-carrot', perPerson: 100, unit: 'g', category: 'acompanhamento' },
  { id: 'queijo-coalho', name: 'Queijo Coalho', icon: 'i-lucide-cake-slice', perPerson: 80, unit: 'g', category: 'acompanhamento' },
  { id: 'batata-frita', name: 'Batata Frita', icon: 'i-lucide-cookie', perPerson: 100, unit: 'g', category: 'acompanhamento' },
  { id: 'chimichurri', name: 'Chimichurri', icon: 'i-lucide-droplets', perPerson: 30, unit: 'g', category: 'acompanhamento' },
  { id: 'legumes', name: 'Legumes Grelhados', icon: 'i-lucide-carrot', perPerson: 80, unit: 'g', category: 'acompanhamento' },
  { id: 'feijao-tropeiro', name: 'Feijão Tropeiro', icon: 'i-lucide-cooking-pot', perPerson: 100, unit: 'g', category: 'acompanhamento' },

  // Essenciais
  { id: 'carvao', name: 'Carvão', icon: 'i-lucide-flame-kindling', perPerson: 1, unit: 'kg', category: 'essencial' },
  { id: 'gelo', name: 'Gelo', icon: 'i-lucide-snowflake', perPerson: 0.5, unit: 'kg', category: 'essencial' },
  { id: 'guardanapo', name: 'Guardanapos', icon: 'i-lucide-scroll', perPerson: 4, unit: 'un', category: 'essencial' },
  { id: 'copo', name: 'Copos Descartáveis', icon: 'i-lucide-glass-water', perPerson: 3, unit: 'un', category: 'essencial' },
  { id: 'prato', name: 'Pratos Descartáveis', icon: 'i-lucide-circle', perPerson: 2, unit: 'un', category: 'essencial' },
  { id: 'talher', name: 'Talheres Descartáveis', icon: 'i-lucide-utensils', perPerson: 2, unit: 'un', category: 'essencial' }
]

export const SIDE_CATEGORIES = [
  { id: 'acompanhamento', name: 'Acompanhamentos', icon: 'i-lucide-salad' },
  { id: 'essencial', name: 'Essenciais', icon: 'i-lucide-flame-kindling' }
] as const
