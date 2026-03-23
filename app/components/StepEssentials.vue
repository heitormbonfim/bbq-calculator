<script setup lang="ts">
import { SIDE_OPTIONS } from '~/constants/sides'

const { state } = useChurrascoCalculator()

const items = SIDE_OPTIONS.filter((s) => s.category === 'essencial')

function toggleSide(id: string) {
  const idx = state.selectedSides.indexOf(id)
  if (idx >= 0) {
    state.selectedSides.splice(idx, 1)
  } else {
    state.selectedSides.push(id)
  }
}

function toggleAll() {
  const allSelected = items.every((s) => state.selectedSides.includes(s.id))
  if (allSelected) {
    items.forEach((s) => {
      const idx = state.selectedSides.indexOf(s.id)
      if (idx >= 0) state.selectedSides.splice(idx, 1)
    })
  } else {
    items.forEach((s) => {
      if (!state.selectedSides.includes(s.id)) state.selectedSides.push(s.id)
    })
  }
}

const allSelected = computed(() => items.every((s) => state.selectedSides.includes(s.id)))
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-xl font-bold text-stone-100 mb-1">Essenciais</h2>
        <p class="text-sm text-stone-400">Carvão, gelo e descartáveis</p>
      </div>
      <button
        class="text-xs font-medium transition-colors"
        :class="allSelected ? 'text-amber-400' : 'text-stone-500'"
        @click="toggleAll"
      >
        {{ allSelected ? 'Remover todos' : 'Selecionar todos' }}
      </button>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="item in items"
        :key="item.id"
        class="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all active:scale-[0.97]"
        :class="[
          state.selectedSides.includes(item.id)
            ? 'bg-amber-500/15 border-amber-500/50'
            : 'bg-stone-900/50 border-stone-800/50 hover:border-stone-700'
        ]"
        @click="toggleSide(item.id)"
      >
        <div
          class="size-10 rounded-xl flex items-center justify-center transition-colors"
          :class="[
            state.selectedSides.includes(item.id)
              ? 'bg-amber-500/20'
              : 'bg-stone-800/80'
          ]"
        >
          <UIcon
            :name="item.icon"
            class="size-5"
            :class="state.selectedSides.includes(item.id) ? 'text-amber-400' : 'text-stone-500'"
          />
        </div>
        <span
          class="text-sm font-medium text-center"
          :class="state.selectedSides.includes(item.id) ? 'text-amber-200' : 'text-stone-300'"
        >
          {{ item.name }}
        </span>
      </button>
    </div>
  </div>
</template>
