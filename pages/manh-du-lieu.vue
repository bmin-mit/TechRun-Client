<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Mảnh Dữ Liệu</h1>
      <p class="text-gray-600">Những manh mối để giải câu đố cuối cùng</p>
    </div>

    <!-- Hints List -->
    <div class="space-y-4">
      <UCard 
        v-for="(hint, index) in gameStore.hints" 
        :key="hint.id"
        class="border-l-4 border-purple-500"
      >
        <div class="flex items-start space-x-4">
          <!-- Hint Number -->
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {{ index + 1 }}
            </div>
          </div>

          <!-- Hint Content -->
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ hint.title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ hint.description }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Progress Indicator -->
    <div class="mt-8 p-4 bg-purple-50 rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-purple-700">Tiến độ thu thập</span>
        <span class="text-sm text-purple-600">{{ gameStore.hints.length }}/5</span>
      </div>
      <div class="w-full bg-purple-200 rounded-full h-2">
        <div 
          class="bg-purple-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${(gameStore.hints.length / 5) * 100}%` }"
        ></div>
      </div>
      <p class="text-xs text-purple-600 mt-2">
        Thu thập đủ 5 mảnh dữ liệu để mở khóa câu đố cuối cùng
      </p>
    </div>

    <!-- Empty State -->
    <div v-if="gameStore.hints.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-puzzle-piece" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-500 mb-2">Chưa có mảnh dữ liệu</h3>
      <p class="text-gray-400">Hãy khám phá các trạm để thu thập manh mối</p>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore();
</script>