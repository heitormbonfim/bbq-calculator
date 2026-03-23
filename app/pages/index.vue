<script setup lang="ts">
const { state, totalPeople, reset } = useChurrascoCalculator()

const STEP_KEY = 'bbq-calculator-step'
const savedStep = import.meta.client ? Number(localStorage.getItem(STEP_KEY)) || 0 : 0
const currentStep = ref(savedStep)
const direction = ref<'left' | 'right'>('left')
const totalSteps = 6

if (import.meta.client) {
  watch(currentStep, (val) => localStorage.setItem(STEP_KEY, String(val)))
}

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return totalPeople.value > 0
    case 1:
      return state.selectedMeats.length > 0
    default:
      return true
  }
})

function next() {
  if (currentStep.value < totalSteps - 1 && canProceed.value) {
    direction.value = 'left'
    currentStep.value++
  }
}

function prev() {
  if (currentStep.value > 0) {
    direction.value = 'right'
    currentStep.value--
  }
}

function restart() {
  reset()
  direction.value = 'right'
  currentStep.value = 0
  if (import.meta.client) localStorage.removeItem(STEP_KEY)
}

const showResetModal = ref(false)

function confirmRestart() {
  showResetModal.value = false
  restart()
}

const stepLabels = ['Próximo: Carnes', 'Próximo: Bebidas', 'Próximo: Acompanhamentos', 'Próximo: Essenciais', 'Ver Resultado']
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <header class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
      <div class="relative max-w-lg mx-auto px-4 pt-safe">
        <div class="flex items-center justify-center gap-2 py-4">
          <UIcon name="i-lucide-flame" class="size-6 text-amber-400" />
          <h1 class="text-lg font-bold text-stone-100">Calculadora de Churrasco</h1>
        </div>
        <StepIndicator :current-step="currentStep" :total-steps="totalSteps" />
      </div>
    </header>

    <main class="flex-1 max-w-lg mx-auto w-full px-4 pb-28">
      <Transition
        :name="direction === 'left' ? 'slide-left' : 'slide-right'"
        mode="out-in"
      >
        <StepPeople v-if="currentStep === 0" key="people" />
        <StepMeats v-else-if="currentStep === 1" key="meats" />
        <StepBeverages v-else-if="currentStep === 2" key="beverages" />
        <StepSides v-else-if="currentStep === 3" key="sides" />
        <StepEssentials v-else-if="currentStep === 4" key="essentials" />
        <StepResult v-else-if="currentStep === 5" key="result" @restart="restart" @back="prev" />
      </Transition>
    </main>

    <footer
      v-if="currentStep < 5"
      class="fixed bottom-0 inset-x-0 z-50"
    >
      <div class="bg-stone-950/80 backdrop-blur-xl border-t border-stone-800/50">
        <div class="max-w-lg mx-auto px-4 py-3 flex gap-3" style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom))">
          <UButton
            v-if="currentStep > 0"
            size="lg"
            variant="ghost"
            icon="i-lucide-arrow-left"
            class="shrink-0"
            @click="prev"
          >
            Voltar
          </UButton>

          <UButton
            size="lg"
            variant="ghost"
            icon="i-lucide-rotate-ccw"
            class="shrink-0"
            @click="showResetModal = true"
          />

          <UButton
            size="lg"
            block
            :disabled="!canProceed"
            class="flex-1"
            trailing-icon="i-lucide-arrow-right"
            @click="next"
          >
            {{ stepLabels[currentStep] || 'Próximo' }}
          </UButton>
        </div>
      </div>
    </footer>

    <UModal v-model:open="showResetModal">
      <template #content>
        <div class="p-6 space-y-4">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-triangle-alert" class="size-5 text-red-400" />
            </div>
            <h3 class="text-lg font-bold text-stone-100">Limpar tudo?</h3>
          </div>
          <p class="text-sm text-stone-400">
            Todos os dados preenchidos serão apagados e você voltará ao início. Essa ação não pode ser desfeita.
          </p>
          <div class="flex gap-3 pt-2">
            <UButton
              block
              size="lg"
              variant="ghost"
              class="flex-1"
              @click="showResetModal = false"
            >
              Cancelar
            </UButton>
            <UButton
              block
              size="lg"
              color="error"
              class="flex-1"
              @click="confirmRestart"
            >
              Limpar tudo
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
