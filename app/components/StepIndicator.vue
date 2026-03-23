<script setup lang="ts">
const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const steps = [
  { icon: 'i-lucide-users', label: 'Pessoas' },
  { icon: 'i-lucide-beef', label: 'Carnes' },
  { icon: 'i-lucide-beer', label: 'Bebidas' },
  { icon: 'i-lucide-utensils', label: 'Extras' },
  { icon: 'i-lucide-clipboard-list', label: 'Resultado' }
]
</script>

<template>
  <div class="px-4 pt-2 pb-4">
    <div class="flex items-center justify-between relative">
      <div class="absolute top-4 left-8 right-8 h-0.5 bg-stone-800">
        <div
          class="h-full bg-amber-500 transition-all duration-500 ease-out"
          :style="{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }"
        />
      </div>

      <div
        v-for="(step, i) in steps"
        :key="i"
        class="relative z-10 flex flex-col items-center gap-1"
      >
        <div
          class="size-8 rounded-full flex items-center justify-center transition-all duration-300"
          :class="[
            i <= currentStep
              ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
              : 'bg-stone-800 text-stone-500'
          ]"
        >
          <UIcon
            v-if="i < currentStep"
            name="i-lucide-check"
            class="size-4"
          />
          <UIcon
            v-else
            :name="step.icon"
            class="size-4"
          />
        </div>
        <span
          class="text-[10px] font-medium transition-colors duration-300"
          :class="i <= currentStep ? 'text-amber-400' : 'text-stone-600'"
        >
          {{ step.label }}
        </span>
      </div>
    </div>
  </div>
</template>
