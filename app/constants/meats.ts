import type { MeatOption } from '~/types/calculator'

export const MEAT_OPTIONS: MeatOption[] = [
  // Bovinos
  { id: 'picanha', name: 'Picanha', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'maminha', name: 'Maminha', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'costela', name: 'Costela Bovina', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'alcatra', name: 'Alcatra', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'fraldinha', name: 'Fraldinha', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'contra-file', name: 'Contra Filé', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'capa-contra-file', name: 'Capa de Contra Filé', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'chorizo', name: 'Choriço', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'cupim', name: 'Cupim', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'file-mignon', name: 'Filé Mignon', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 't-bone', name: 'T-Bone', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'acem', name: 'Acém', category: 'bovine', icon: 'i-lucide-beef' },
  { id: 'patinho', name: 'Patinho', category: 'bovine', icon: 'i-lucide-beef' },

  // Suínos
  { id: 'linguica', name: 'Linguiça', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'linguica-toscana', name: 'Linguiça Toscana', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'costela-suina', name: 'Costela Suína', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'pernil', name: 'Pernil', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'picanha-suina', name: 'Picanha Suína', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'bisteca-suina', name: 'Bisteca Suína', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'medalhao-suino', name: 'Medalhão Suíno', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'lombo', name: 'Lombo', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'panceta', name: 'Panceta', category: 'pork', icon: 'i-lucide-ham' },
  { id: 'bacon', name: 'Bacon', category: 'pork', icon: 'i-lucide-ham' },

  // Frango
  { id: 'coxa-sobrecoxa', name: 'Coxa/Sobrecoxa', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'asa', name: 'Asa de Frango', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'coracao', name: 'Coração', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'peito-frango', name: 'Peito de Frango', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'tulipa', name: 'Tulipa', category: 'chicken', icon: 'i-lucide-drumstick' },
  { id: 'sassami', name: 'Sassami', category: 'chicken', icon: 'i-lucide-drumstick' },

  // Peixes
  { id: 'salmao', name: 'Salmão', category: 'fish', icon: 'i-lucide-fish' },
  { id: 'tilapia', name: 'Tilápia', category: 'fish', icon: 'i-lucide-fish' },
  { id: 'sardinha', name: 'Sardinha', category: 'fish', icon: 'i-lucide-fish' },
  { id: 'tainha', name: 'Tainha', category: 'fish', icon: 'i-lucide-fish' },
  { id: 'tambaqui', name: 'Tambaqui', category: 'fish', icon: 'i-lucide-fish' },
  { id: 'camarao', name: 'Camarão', category: 'fish', icon: 'i-lucide-shrimp' }
]

export const MEAT_CATEGORIES = [
  { id: 'bovine', name: 'Bovinos', icon: 'i-lucide-beef' },
  { id: 'pork', name: 'Suínos', icon: 'i-lucide-ham' },
  { id: 'chicken', name: 'Frango', icon: 'i-lucide-drumstick' },
  { id: 'fish', name: 'Peixes e Frutos do Mar', icon: 'i-lucide-fish' }
] as const
