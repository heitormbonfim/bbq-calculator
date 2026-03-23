<script setup lang="ts">
const emit = defineEmits<{
  restart: []
}>()

const { result, copyToClipboard, share } = useChurrascoCalculator()
const totalMeatsKg = computed(() => Math.round(result.value.meats.reduce((sum, item) => sum + item.quantity, 0) * 10) / 10)
const copied = ref(false)
const toast = useToast()

async function handleCopy() {
  const ok = await copyToClipboard()
  if (ok) {
    copied.value = true
    toast.add({ title: 'Lista copiada!', icon: 'i-lucide-check', color: 'success' })
    setTimeout(() => (copied.value = false), 2000)
  }
}

async function handleShare() {
  const ok = await share()
  if (ok && !navigator.share) {
    toast.add({ title: 'Lista copiada!', icon: 'i-lucide-check', color: 'success' })
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <div class="inline-flex items-center justify-center size-14 rounded-2xl bg-amber-500/20 mb-3">
        <UIcon name="i-lucide-flame" class="size-7 text-amber-400" />
      </div>
      <h2 class="text-xl font-bold text-stone-100">Seu Churrasco</h2>
      <p class="text-sm text-stone-400 mt-1">{{ result.totalPeople }} pessoas</p>
    </div>

    <div v-if="result.meats.length > 0" class="space-y-2">
      <div class="flex items-center gap-2 px-1">
        <UIcon name="i-lucide-beef" class="size-4 text-red-400" />
        <h3 class="text-sm font-semibold text-stone-300 uppercase tracking-wider">Carnes</h3>
      </div>
      <div class="bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl divide-y divide-stone-800/50">
        <div
          v-for="item in result.meats"
          :key="item.name"
          class="flex items-center justify-between px-5 py-3"
        >
          <span class="text-stone-300 text-sm">{{ item.name }}</span>
          <span class="font-bold text-amber-300 tabular-nums">{{ item.quantity }} {{ item.unit }}</span>
        </div>
        <div class="flex items-center justify-between px-5 py-3 bg-stone-800/30">
          <span class="text-stone-200 text-sm font-semibold">Total de Carnes</span>
          <span class="font-bold text-amber-400 tabular-nums">{{ totalMeatsKg }} kg</span>
        </div>
      </div>
    </div>

    <div v-if="result.beverages.length > 0" class="space-y-2">
      <div class="flex items-center gap-2 px-1">
        <UIcon name="i-lucide-beer" class="size-4 text-yellow-400" />
        <h3 class="text-sm font-semibold text-stone-300 uppercase tracking-wider">Bebidas</h3>
      </div>
      <div class="bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl divide-y divide-stone-800/50">
        <div
          v-for="item in result.beverages"
          :key="item.name"
          class="flex items-center justify-between px-5 py-3"
        >
          <span class="text-stone-300 text-sm">{{ item.name }}</span>
          <span class="font-bold text-amber-300 tabular-nums">{{ item.quantity }} {{ item.unit }}</span>
        </div>
      </div>
    </div>

    <div v-if="result.sides.length > 0" class="space-y-2">
      <div class="flex items-center gap-2 px-1">
        <UIcon name="i-lucide-utensils" class="size-4 text-green-400" />
        <h3 class="text-sm font-semibold text-stone-300 uppercase tracking-wider">Acompanhamentos</h3>
      </div>
      <div class="bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl divide-y divide-stone-800/50">
        <div
          v-for="item in result.sides"
          :key="item.name"
          class="flex items-center justify-between px-5 py-3"
        >
          <span class="text-stone-300 text-sm">{{ item.name }}</span>
          <span class="font-bold text-amber-300 tabular-nums">{{ item.quantity }} {{ item.unit }}</span>
        </div>
      </div>
    </div>

    <div class="flex gap-3 pt-2">
      <UButton
        block
        size="lg"
        variant="soft"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        class="flex-1"
        @click="handleCopy"
      >
        {{ copied ? 'Copiado!' : 'Copiar Lista' }}
      </UButton>
      <UButton
        block
        size="lg"
        variant="soft"
        icon="i-lucide-share-2"
        class="flex-1"
        @click="handleShare"
      >
        Compartilhar
      </UButton>
    </div>

    <button
      class="w-full py-3 text-sm font-medium text-stone-500 hover:text-stone-300 transition-colors"
      @click="emit('restart')"
    >
      <UIcon name="i-lucide-rotate-ccw" class="size-4 mr-1 inline" />
      Recalcular
    </button>
  </div>
</template>
