import type { CalculatorInput, CalculatorResult, ResultItem } from '~/types/calculator'
import { MEAT_OPTIONS } from '~/constants/meats'
import { SIDE_OPTIONS } from '~/constants/sides'
import {
  DURATION_MODIFIER,
  MEAT_PER_PERSON,
  BEER_PER_ADULT,
  SOFT_DRINK,
  WATER_PER_PERSON,
  JUICE
} from '~/constants/calculator'

const state = reactive<CalculatorInput>({
  men: 0,
  women: 0,
  children: 0,
  selectedMeats: [],
  beverages: {
    beer: true,
    beerIntensity: 'moderate',
    softDrinks: true,
    water: true,
    juice: false
  },
  selectedSides: ['pao-de-alho', 'farofa', 'vinagrete'],
  duration: 'medium'
})

export function useChurrascoCalculator() {
  const totalPeople = computed(() => state.men + state.women + state.children)
  const totalAdults = computed(() => state.men + state.women)
  const modifier = computed(() => DURATION_MODIFIER[state.duration])

  const result = computed<CalculatorResult>(() => {
    const meats = calculateMeats()
    const beverages = calculateBeverages()
    const sides = calculateSides()
    return { meats, beverages, sides, totalPeople: totalPeople.value }
  })

  function calculateMeats(): ResultItem[] {
    if (state.selectedMeats.length === 0) return []

    const totalGrams =
      (state.men * MEAT_PER_PERSON.men +
        state.women * MEAT_PER_PERSON.women +
        state.children * MEAT_PER_PERSON.children) *
      modifier.value

    const perType = totalGrams / state.selectedMeats.length

    return state.selectedMeats.map((id) => {
      const meat = MEAT_OPTIONS.find((m) => m.id === id)!
      const kg = Math.round((perType / 1000) * 10) / 10
      return { name: meat.name, quantity: Math.max(kg, 0.1), unit: 'kg' }
    })
  }

  function calculateBeverages(): ResultItem[] {
    const items: ResultItem[] = []
    const mod = modifier.value

    if (state.beverages.beer && totalAdults.value > 0) {
      const ml = totalAdults.value * BEER_PER_ADULT[state.beverages.beerIntensity] * mod
      items.push({ name: 'Cerveja', quantity: round(ml / 1000), unit: 'L' })
    }

    if (state.beverages.softDrinks && totalPeople.value > 0) {
      const ml = (totalAdults.value * SOFT_DRINK.adult + state.children * SOFT_DRINK.child) * mod
      items.push({ name: 'Refrigerante', quantity: round(ml / 1000), unit: 'L' })
    }

    if (state.beverages.water && totalPeople.value > 0) {
      const ml = totalPeople.value * WATER_PER_PERSON * mod
      items.push({ name: 'Agua', quantity: round(ml / 1000), unit: 'L' })
    }

    if (state.beverages.juice && totalPeople.value > 0) {
      const ml = (totalAdults.value * JUICE.adult + state.children * JUICE.child) * mod
      items.push({ name: 'Suco', quantity: round(ml / 1000), unit: 'L' })
    }

    return items
  }

  function calculateSides(): ResultItem[] {
    if (state.selectedSides.length === 0) return []
    const people = totalPeople.value
    const mod = modifier.value

    return state.selectedSides.map((id) => {
      const side = SIDE_OPTIONS.find((s) => s.id === id)!
      const raw = people * side.perPerson * mod

      if (side.unit === 'un') {
        return { name: side.name, quantity: Math.ceil(raw), unit: 'unidades' }
      }
      return { name: side.name, quantity: round(raw / 1000), unit: 'kg' }
    })
  }

  function formatAsText(): string {
    const r = result.value
    const lines: string[] = []

    lines.push('LISTA DE CHURRASCO')
    lines.push(`${r.totalPeople} pessoas`)
    lines.push('')

    if (r.meats.length > 0) {
      lines.push('CARNES:')
      r.meats.forEach((item) => lines.push(`  ${item.name}: ${item.quantity} ${item.unit}`))
      const totalKg = round(r.meats.reduce((sum, item) => sum + item.quantity, 0))
      lines.push(`  Total: ${totalKg} kg`)
      lines.push('')
    }

    if (r.beverages.length > 0) {
      lines.push('BEBIDAS:')
      r.beverages.forEach((item) => lines.push(`  ${item.name}: ${item.quantity} ${item.unit}`))
      lines.push('')
    }

    if (r.sides.length > 0) {
      lines.push('ACOMPANHAMENTOS:')
      r.sides.forEach((item) => lines.push(`  ${item.name}: ${item.quantity} ${item.unit}`))
    }

    return lines.join('\n')
  }

  async function copyToClipboard(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(formatAsText())
      return true
    } catch {
      return false
    }
  }

  async function share(): Promise<boolean> {
    const text = formatAsText()
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lista de Churrasco', text })
        return true
      } catch {
        return false
      }
    }
    return copyToClipboard()
  }

  function reset() {
    state.men = 0
    state.women = 0
    state.children = 0
    state.selectedMeats = []
    state.beverages = {
      beer: true,
      beerIntensity: 'moderate',
      softDrinks: true,
      water: true,
      juice: false
    }
    state.selectedSides = ['pao-de-alho', 'farofa', 'vinagrete']
    state.duration = 'medium'
  }

  return {
    state,
    totalPeople,
    result,
    formatAsText,
    copyToClipboard,
    share,
    reset
  }
}

function round(value: number): number {
  return Math.round(value * 10) / 10
}
