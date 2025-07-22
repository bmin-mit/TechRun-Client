<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Trò Chơi Địa Điểm</h1>
      <p class="text-gray-600">Theo dõi tiến độ của bạn</p>
    </div>

    <!-- Stats Cards -->
    <div class="space-y-4 mb-6">
      <!-- Coins -->
      <UCard class="bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div class="flex items-center justify-between text-white">
          <div>
            <h3 class="text-lg font-semibold">Xu</h3>
            <p class="text-2xl font-bold">{{ gameStore.coins.toLocaleString('vi-VN') }}</p>
          </div>
          <UIcon name="i-heroicons-currency-dollar" class="w-12 h-12 opacity-80" />
        </div>
      </UCard>

      <!-- Skills -->
      <UCard class="bg-gradient-to-r from-blue-500 to-blue-700">
        <div class="flex items-center justify-between text-white">
          <div>
            <h3 class="text-lg font-semibold">Năng Lực Số</h3>
            <p class="text-2xl font-bold">{{ gameStore.skills.length }}</p>
            <p class="text-sm opacity-90">{{ unusedSkills }} chưa sử dụng</p>
          </div>
          <UIcon name="i-heroicons-star" class="w-12 h-12 opacity-80" />
        </div>
      </UCard>

      <!-- Hints -->
      <UCard class="bg-gradient-to-r from-purple-500 to-purple-700">
        <div class="flex items-center justify-between text-white">
          <div>
            <h3 class="text-lg font-semibold">Mảnh Dữ Liệu</h3>
            <p class="text-2xl font-bold">{{ gameStore.hints.length }}</p>
            <p class="text-sm opacity-90">Manh mối để giải câu đố cuối</p>
          </div>
          <UIcon name="i-heroicons-puzzle-piece" class="w-12 h-12 opacity-80" />
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4">
      <NuxtLink to="/nang-luc-so">
        <UButton 
          block 
          size="lg" 
          color="blue" 
          variant="outline"
          class="h-16"
        >
          <div class="text-center">
            <UIcon name="i-heroicons-star" class="w-6 h-6 mx-auto mb-1" />
            <div class="text-sm">Sử Dụng Năng Lực</div>
          </div>
        </UButton>
      </NuxtLink>

      <NuxtLink to="/dau-gia">
        <UButton 
          block 
          size="lg" 
          color="green" 
          variant="outline"
          class="h-16"
        >
          <div class="text-center">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 mx-auto mb-1" />
            <div class="text-sm">Tham Gia Đấu Giá</div>
          </div>
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore();

const unusedSkills = computed(() => {
  return gameStore.skills.filter(skill => !skill.used).length;
});
</script>