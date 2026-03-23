<script setup lang="ts">
import type { EventDuration } from '~/types/calculator'

const { state } = useChurrascoCalculator()

const durations: { value: EventDuration; label: string; desc: string; icon: string }[] = [
  { value: 'short', label: 'Curto', desc: '2-3 horas', icon: 'i-lucide-clock' },
  { value: 'medium', label: 'Médio', desc: '4-5 horas', icon: 'i-lucide-clock-3' },
  { value: 'long', label: 'Longo', desc: '6+ horas', icon: 'i-lucide-clock-12' }
]

function increment(field: 'men' | 'women' | 'children') {
  state[field]++
}

function decrement(field: 'men' | 'women' | 'children') {
  if (state[field] > 0) state[field]--
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-stone-100 mb-1">Quantas pessoas?</h2>
      <p class="text-sm text-stone-400">Informe o número de convidados</p>
    </div>

    <div class="space-y-3">
      <div
        v-for="person in [
          { field: 'men' as const, label: 'Homens', icon: 'i-lucide-user', color: 'text-blue-400' },
          { field: 'women' as const, label: 'Mulheres', icon: 'i-lucide-user', color: 'text-pink-400' },
          { field: 'children' as const, label: 'Crianças', icon: 'i-lucide-baby', color: 'text-green-400' }
        ]"
        :key="person.field"
        class="flex items-center justify-between bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl px-5 py-4"
      >
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-xl flex items-center justify-center bg-stone-800/80">
            <UIcon :name="person.icon" class="size-5" :class="person.color" />
          </div>
          <span class="font-medium text-stone-200">{{ person.label }}</span>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="size-10 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 flex items-center justify-center transition-all"
            @click="decrement(person.field)"
          >
            <UIcon name="i-lucide-minus" class="size-4 text-stone-300" />
          </button>
          <span class="w-8 text-center text-lg font-bold tabular-nums text-stone-100">
            {{ state[person.field] }}
          </span>
          <button
            class="size-10 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 flex items-center justify-center transition-all"
            @click="increment(person.field)"
          >
            <UIcon name="i-lucide-plus" class="size-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-semibold text-stone-300 mb-3 uppercase tracking-wider">Duração do evento</h3>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="d in durations"
          :key="d.value"
          class="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border transition-all active:scale-95"
          :class="[
            state.duration === d.value
              ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/10'
              : 'bg-stone-900/50 border-stone-800/50 hover:border-stone-700'
          ]"
          @click="state.duration = d.value"
        >
          <UIcon
            :name="d.icon"
            class="size-5"
            :class="state.duration === d.value ? 'text-amber-400' : 'text-stone-500'"
          />
          <span
            class="text-sm font-semibold"
            :class="state.duration === d.value ? 'text-amber-300' : 'text-stone-300'"
          >
            {{ d.label }}
          </span>
          <span
            class="text-[11px]"
            :class="state.duration === d.value ? 'text-amber-400/70' : 'text-stone-500'"
          >
            {{ d.desc }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
