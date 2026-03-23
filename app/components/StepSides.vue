<script setup lang="ts">
import { SIDE_OPTIONS } from '~/constants/sides'

const { state } = useChurrascoCalculator()

function toggleSide(id: string) {
  const idx = state.selectedSides.indexOf(id)
  if (idx >= 0) {
    state.selectedSides.splice(idx, 1)
  } else {
    state.selectedSides.push(id)
  }
}

function toggleAll() {
  if (state.selectedSides.length === SIDE_OPTIONS.length) {
    state.selectedSides = []
  } else {
    state.selectedSides = SIDE_OPTIONS.map((s) => s.id)
  }
}

const allSelected = computed(() => state.selectedSides.length === SIDE_OPTIONS.length)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-xl font-bold text-stone-100 mb-1">Acompanhamentos</h2>
        <p class="text-sm text-stone-400">Escolha os acompanhamentos</p>
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
        v-for="side in SIDE_OPTIONS"
        :key="side.id"
        class="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all active:scale-[0.97]"
        :class="[
          state.selectedSides.includes(side.id)
            ? 'bg-amber-500/15 border-amber-500/50'
            : 'bg-stone-900/50 border-stone-800/50 hover:border-stone-700'
        ]"
        @click="toggleSide(side.id)"
      >
        <div
          class="size-10 rounded-xl flex items-center justify-center transition-colors"
          :class="[
            state.selectedSides.includes(side.id)
              ? 'bg-amber-500/20'
              : 'bg-stone-800/80'
          ]"
        >
          <UIcon
            :name="side.icon"
            class="size-5"
            :class="state.selectedSides.includes(side.id) ? 'text-amber-400' : 'text-stone-500'"
          />
        </div>
        <span
          class="text-sm font-medium"
          :class="state.selectedSides.includes(side.id) ? 'text-amber-200' : 'text-stone-300'"
        >
          {{ side.name }}
        </span>
      </button>
    </div>
  </div>
</template>
