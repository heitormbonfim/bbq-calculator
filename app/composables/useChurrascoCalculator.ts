import type { CalculatorInput, CalculatorResult, MeatPriority, ResultItem } from '~/types/calculator'
import { MEAT_OPTIONS } from '~/constants/meats'

const PRIORITY_WEIGHT: Record<MeatPriority, number> = { low: 0.5, normal: 1.0, high: 1.5 }
const PRIORITY_LABEL: Record<MeatPriority, string> = { low: '(menos)', normal: '', high: '(mais)' }
import { SIDE_OPTIONS } from '~/constants/sides'
import {
  DURATION_MODIFIER,
  MEAT_PER_PERSON,
  BEER_PER_ADULT,
  SOFT_DRINK,
  WATER_PER_PERSON,
  JUICE,
  WINE_PER_ADULT,
  ENERGY_PER_ADULT
} from '~/constants/calculator'

const STORAGE_KEY = 'bbq-calculator-state'

function loadState(): CalculatorInput {
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {}
  }
  return getDefaultState()
}

function getDefaultState(): CalculatorInput {
  return {
    men: 0,
    women: 0,
    children: 0,
    selectedMeats: [],
    beverages: {
      beer: true,
      beerIntensity: 'moderate',
      softDrinks: true,
      water: true,
      juice: false,
      wine: false,
      energy: false
    },
    selectedSides: ['pao-de-alho', 'farofa', 'vinagrete'],
    duration: 'medium'
  }
}

const state = reactive<CalculatorInput>(loadState())

export function useChurrascoCalculator() {
  if (import.meta.client) {
    watch(() => JSON.parse(JSON.stringify(state)), (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }, { deep: true })
  }

  const totalPeople = computed(() => state.men + state.women + state.children)
  const totalAdults = computed(() => state.men + state.women)
  const modifier = computed(() => DURATION_MODIFIER[state.duration])

  const result = computed<CalculatorResult>(() => {
    const meats = calculateMeats()
    const beverages = calculateBeverages()
    const allSides = calculateSides()
    const sideIds = SIDE_OPTIONS.filter((s) => s.category === 'acompanhamento').map((s) => s.name)
    const sides = allSides.filter((s) => sideIds.includes(s.name))
    const essentials = allSides.filter((s) => !sideIds.includes(s.name))
    return { meats, beverages, sides, essentials, totalPeople: totalPeople.value }
  })

  function calculateMeats(): ResultItem[] {
    if (state.selectedMeats.length === 0) return []

    const totalGrams =
      (state.men * MEAT_PER_PERSON.men +
        state.women * MEAT_PER_PERSON.women +
        state.children * MEAT_PER_PERSON.children) *
      modifier.value

    const totalWeight = state.selectedMeats.reduce(
      (sum, s) => sum + PRIORITY_WEIGHT[s.priority],
      0
    )

    return state.selectedMeats.map((selection) => {
      const meat = MEAT_OPTIONS.find((m) => m.id === selection.id)!
      const share = PRIORITY_WEIGHT[selection.priority] / totalWeight
      const kg = Math.round((totalGrams * share / 1000) * 1000) / 1000
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
      items.push({ name: 'Água', quantity: round(ml / 1000), unit: 'L' })
    }

    if (state.beverages.juice && totalPeople.value > 0) {
      const ml = (totalAdults.value * JUICE.adult + state.children * JUICE.child) * mod
      items.push({ name: 'Suco', quantity: round(ml / 1000), unit: 'L' })
    }

    if (state.beverages.wine && totalAdults.value > 0) {
      const ml = totalAdults.value * WINE_PER_ADULT * mod
      items.push({ name: 'Vinho', quantity: round(ml / 1000), unit: 'L' })
    }

    if (state.beverages.energy && totalAdults.value > 0) {
      const ml = totalAdults.value * ENERGY_PER_ADULT * mod
      items.push({ name: 'Energético', quantity: round(ml / 1000), unit: 'L' })
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
      if (side.unit === 'kg') {
        return { name: side.name, quantity: round(raw), unit: 'kg' }
      }
      if (side.unit === 'L') {
        return { name: side.name, quantity: round(raw), unit: 'L' }
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
      r.meats.forEach((item, i) => {
        const label = PRIORITY_LABEL[state.selectedMeats[i]?.priority ?? 'normal']
        const suffix = label ? ` ${label}` : ''
        lines.push(`  ${item.name}: ${item.quantity.toFixed(3)} ${item.unit}${suffix}`)
      })
      const totalKg = r.meats.reduce((sum, item) => sum + item.quantity, 0)
      lines.push(`  Total: ${totalKg.toFixed(3)} kg`)
      lines.push('')
    }

    if (r.beverages.length > 0) {
      lines.push('BEBIDAS:')
      r.beverages.forEach((item) => lines.push(`  ${item.name}: ${item.quantity.toFixed(3)} ${item.unit}`))
      lines.push('')
    }

    if (r.sides.length > 0) {
      lines.push('ACOMPANHAMENTOS:')
      r.sides.forEach((item) => {
        const val = item.unit === 'unidades' ? String(item.quantity) : item.quantity.toFixed(3)
        lines.push(`  ${item.name}: ${val} ${item.unit}`)
      })
      lines.push('')
    }

    if (r.essentials.length > 0) {
      lines.push('ESSENCIAIS:')
      r.essentials.forEach((item) => {
        const val = item.unit === 'unidades' ? String(item.quantity) : item.quantity.toFixed(3)
        lines.push(`  ${item.name}: ${val} ${item.unit}`)
      })
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
    const defaults = getDefaultState()
    Object.assign(state, defaults)
    if (import.meta.client) localStorage.removeItem(STORAGE_KEY)
  }

  function fmt(value: number): string {
    return value.toFixed(3)
  }

  return {
    state,
    totalPeople,
    result,
    fmt,
    formatAsText,
    copyToClipboard,
    share,
    reset
  }
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000
}
