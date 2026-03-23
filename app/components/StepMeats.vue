<script setup lang="ts">
import { MEAT_OPTIONS, MEAT_CATEGORIES } from '~/constants/meats'

const { state } = useChurrascoCalculator()

function toggleMeat(id: string) {
  const idx = state.selectedMeats.indexOf(id)
  if (idx >= 0) {
    state.selectedMeats.splice(idx, 1)
  } else {
    state.selectedMeats.push(id)
  }
}

function toggleCategory(categoryId: string) {
  const meatsInCategory = MEAT_OPTIONS.filter((m) => m.category === categoryId)
  const allSelected = meatsInCategory.every((m) => state.selectedMeats.includes(m.id))

  if (allSelected) {
    meatsInCategory.forEach((m) => {
      const idx = state.selectedMeats.indexOf(m.id)
      if (idx >= 0) state.selectedMeats.splice(idx, 1)
    })
  } else {
    meatsInCategory.forEach((m) => {
      if (!state.selectedMeats.includes(m.id)) {
        state.selectedMeats.push(m.id)
      }
    })
  }
}

function isCategorySelected(categoryId: string): boolean {
  const meatsInCategory = MEAT_OPTIONS.filter((m) => m.category === categoryId)
  return meatsInCategory.every((m) => state.selectedMeats.includes(m.id))
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-stone-100 mb-1">Escolha as carnes</h2>
      <p class="text-sm text-stone-400">Selecione os cortes para o churrasco</p>
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
        <button
          v-for="meat in MEAT_OPTIONS.filter((m) => m.category === category.id)"
          :key="meat.id"
          class="flex items-center gap-3 py-3 px-4 rounded-2xl border transition-all active:scale-[0.97]"
          :class="[
            state.selectedMeats.includes(meat.id)
              ? 'bg-amber-500/15 border-amber-500/50'
              : 'bg-stone-900/50 border-stone-800/50 hover:border-stone-700'
          ]"
          @click="toggleMeat(meat.id)"
        >
          <div
            class="size-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
            :class="[
              state.selectedMeats.includes(meat.id)
                ? 'bg-amber-500 border-amber-500'
                : 'border-stone-600'
            ]"
          >
            <UIcon
              v-if="state.selectedMeats.includes(meat.id)"
              name="i-lucide-check"
              class="size-3 text-stone-950"
            />
          </div>
          <span
            class="text-sm font-medium truncate"
            :class="state.selectedMeats.includes(meat.id) ? 'text-amber-200' : 'text-stone-300'"
          >
            {{ meat.name }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
