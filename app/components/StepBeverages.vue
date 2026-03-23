<script setup lang="ts">
import type { DrinkIntensity } from '~/types/calculator'

const { state } = useChurrascoCalculator()

const beverages = [
  { key: 'beer' as const, label: 'Cerveja', icon: 'i-lucide-beer', color: 'text-yellow-400' },
  { key: 'softDrinks' as const, label: 'Refrigerante', icon: 'i-lucide-cup-soda', color: 'text-red-400' },
  { key: 'water' as const, label: 'Água', icon: 'i-lucide-droplets', color: 'text-blue-400' },
  { key: 'juice' as const, label: 'Suco', icon: 'i-lucide-citrus', color: 'text-orange-400' },
  { key: 'wine' as const, label: 'Vinho', icon: 'i-lucide-wine', color: 'text-purple-400' },
  { key: 'energy' as const, label: 'Energético', icon: 'i-lucide-zap', color: 'text-green-400' }
]

const intensities: { value: DrinkIntensity; label: string; desc: string }[] = [
  { value: 'light', label: 'Leve', desc: '~2 latas/pessoa' },
  { value: 'moderate', label: 'Moderado', desc: '~4 latas/pessoa' },
  { value: 'heavy', label: 'Pesado', desc: '~6 latas/pessoa' }
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-stone-100 mb-1">Bebidas</h2>
      <p class="text-sm text-stone-400">O que vai ter pra beber?</p>
    </div>

    <div class="space-y-3">
      <div
        v-for="bev in beverages"
        :key="bev.key"
        class="rounded-2xl border transition-all overflow-hidden"
        :class="[
          state.beverages[bev.key]
            ? 'bg-amber-500/10 border-amber-500/40'
            : 'bg-stone-900/50 border-stone-800/50'
        ]"
      >
        <button
          class="flex items-center gap-3 w-full px-5 py-4 active:scale-[0.99] transition-all"
          @click="state.beverages[bev.key] = !state.beverages[bev.key]"
        >
          <div class="size-10 rounded-xl flex items-center justify-center bg-stone-800/80">
            <UIcon :name="bev.icon" class="size-5" :class="bev.color" />
          </div>
          <span class="font-medium text-stone-200">{{ bev.label }}</span>
          <div class="ml-auto">
            <div
              class="w-11 h-6 rounded-full p-0.5 transition-colors duration-200"
              :class="state.beverages[bev.key] ? 'bg-amber-500' : 'bg-stone-700'"
            >
              <div
                class="size-5 rounded-full bg-white shadow transition-transform duration-200"
                :class="state.beverages[bev.key] ? 'translate-x-5' : 'translate-x-0'"
              />
            </div>
          </div>
        </button>

        <div
          v-if="bev.key === 'beer' && state.beverages.beer"
          class="px-5 pb-4"
        >
          <p class="text-xs text-stone-400 mb-2">Intensidade</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="intensity in intensities"
              :key="intensity.value"
              class="py-2 px-2 rounded-xl border text-center transition-all active:scale-95"
              :class="[
                state.beverages.beerIntensity === intensity.value
                  ? 'bg-amber-500/20 border-amber-500/50'
                  : 'bg-stone-800/50 border-stone-700/50 hover:border-stone-600'
              ]"
              @click="state.beverages.beerIntensity = intensity.value"
            >
              <span
                class="text-xs font-semibold block"
                :class="state.beverages.beerIntensity === intensity.value ? 'text-amber-300' : 'text-stone-300'"
              >
                {{ intensity.label }}
              </span>
              <span
                class="text-[10px] block mt-0.5"
                :class="state.beverages.beerIntensity === intensity.value ? 'text-amber-400/60' : 'text-stone-500'"
              >
                {{ intensity.desc }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
