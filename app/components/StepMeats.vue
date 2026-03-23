<script setup lang="ts">
import type { MeatPriority } from '~/types/calculator'
import { MEAT_OPTIONS, MEAT_CATEGORIES } from '~/constants/meats'

const { state } = useChurrascoCalculator()

function isSelected(id: string): boolean {
  return state.selectedMeats.some((s) => s.id === id)
}

function toggleMeat(id: string) {
  const idx = state.selectedMeats.findIndex((s) => s.id === id)
  if (idx >= 0) {
    state.selectedMeats.splice(idx, 1)
  } else {
    state.selectedMeats.push({ id, priority: 'normal' })
  }
}

function getPriority(id: string): MeatPriority {
  return state.selectedMeats.find((s) => s.id === id)?.priority ?? 'normal'
}

function cyclePriority(id: string) {
  const selection = state.selectedMeats.find((s) => s.id === id)
  if (!selection) return
  const order: MeatPriority[] = ['normal', 'high', 'low']
  const idx = order.indexOf(selection.priority)
  selection.priority = order[(idx + 1) % order.length]
}

function toggleCategory(categoryId: string) {
  const meatsInCategory = MEAT_OPTIONS.filter((m) => m.category === categoryId)
  const allSelected = meatsInCategory.every((m) => isSelected(m.id))

  if (allSelected) {
    meatsInCategory.forEach((m) => {
      const idx = state.selectedMeats.findIndex((s) => s.id === m.id)
      if (idx >= 0) state.selectedMeats.splice(idx, 1)
    })
  } else {
    meatsInCategory.forEach((m) => {
      if (!isSelected(m.id)) {
        state.selectedMeats.push({ id: m.id, priority: 'normal' })
      }
    })
  }
}

function isCategorySelected(categoryId: string): boolean {
  const meatsInCategory = MEAT_OPTIONS.filter((m) => m.category === categoryId)
  return meatsInCategory.every((m) => isSelected(m.id))
}

const priorityConfig: Record<MeatPriority, { icon: string; label: string; color: string; bg: string; ring: string }> = {
  low: { icon: 'i-lucide-trending-down', label: 'Menos', color: 'text-red-400', bg: 'bg-red-500/20', ring: 'ring-red-500/40' },
  normal: { icon: 'i-lucide-minus', label: 'Normal', color: 'text-stone-400', bg: 'bg-stone-500/20', ring: 'ring-stone-500/40' },
  high: { icon: 'i-lucide-trending-up', label: 'Mais', color: 'text-green-400', bg: 'bg-green-500/20', ring: 'ring-green-500/40' }
}

function getPriorityConfig(id: string) {
  return priorityConfig[getPriority(id)]
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-stone-100 mb-1">Escolha as carnes</h2>
      <p class="text-sm text-stone-400">Selecione os cortes para o churrasco</p>
    </div>

    <div class="bg-stone-900/50 border border-stone-800/50 rounded-2xl px-4 py-3">
      <div class="flex items-start gap-2">
        <UIcon name="i-lucide-info" class="size-4 text-stone-500 mt-0.5 shrink-0" />
        <p class="text-xs text-stone-500 leading-relaxed">
          Ao selecionar um corte, ajuste a prioridade:
          <span class="text-green-400 font-medium">Mais</span> recebe uma fatia maior,
          <span class="text-stone-300 font-medium">Normal</span> distribui igual e
          <span class="text-red-400 font-medium">Menos</span> recebe uma fatia menor do total de carne.
        </p>
      </div>
    </div>

    <div v-for="category in MEAT_CATEGORIES" :key="category.id" class="space-y-2">
      <button
        class="flex items-center gap-2 w-full"
        @click="toggleCategory(category.id)"
      >
        <UIcon :name="category.icon" class="size-4 text-amber-400" />
        <span class="text-sm font-semibold text-stone-300 uppercase tracking-wider">{{ category.name }}</span>
        <span
          class="ml-auto text-[11px] font-medium"
          :class="isCategorySelected(category.id) ? 'text-amber-400' : 'text-stone-600'"
        >
          {{ isCategorySelected(category.id) ? 'Remover todos' : 'Selecionar todos' }}
        </span>
      </button>

      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="meat in MEAT_OPTIONS.filter((m) => m.category === category.id)"
          :key="meat.id"
          class="rounded-2xl border transition-all overflow-hidden"
          :class="[
            isSelected(meat.id)
              ? 'bg-amber-500/15 border-amber-500/50'
              : 'bg-stone-900/50 border-stone-800/50 hover:border-stone-700'
          ]"
        >
          <button
            class="flex items-center gap-3 w-full py-3 px-4 active:scale-[0.97] transition-transform"
            @click="toggleMeat(meat.id)"
          >
            <div
              class="size-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
              :class="[
                isSelected(meat.id)
                  ? 'bg-amber-500 border-amber-500'
                  : 'border-stone-600'
              ]"
            >
              <UIcon
                v-if="isSelected(meat.id)"
                name="i-lucide-check"
                class="size-3 text-stone-950"
              />
            </div>
            <span
              class="text-xs sm:text-sm font-medium text-left leading-tight"
              :class="isSelected(meat.id) ? 'text-amber-200' : 'text-stone-300'"
            >
              {{ meat.name }}
            </span>
          </button>

          <button
            v-if="isSelected(meat.id)"
            class="flex items-center justify-center gap-1.5 w-full px-3 pb-2.5 -mt-0.5 active:scale-[0.97] transition-transform"
            @click.stop="cyclePriority(meat.id)"
          >
            <div
              class="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg text-[11px] font-medium ring-1 transition-all"
              :class="[getPriorityConfig(meat.id).bg, getPriorityConfig(meat.id).color, getPriorityConfig(meat.id).ring]"
            >
              <UIcon :name="getPriorityConfig(meat.id).icon" class="size-3" />
              {{ getPriorityConfig(meat.id).label }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
