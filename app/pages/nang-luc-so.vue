<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Năng Lực Số</h1>
      <p class="text-gray-600">Sử dụng các kỹ năng đặc biệt của bạn</p>
    </div>

    <!-- Skills Grid -->
    <div class="grid grid-cols-2 gap-4">
      <div 
        v-for="skill in gameStore.skills" 
        :key="skill.id"
        class="relative"
      >
        <UCard :class="{ 'opacity-50': skill.used }">
          <!-- Vertical Credit Card Image -->
          <div class="aspect-[2/3] mb-3 overflow-hidden rounded-lg">
            <img 
              :src="skill.image" 
              :alt="skill.title"
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Content -->
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-900 text-sm">{{ skill.title }}</h3>
            <p class="text-xs text-gray-600 line-clamp-2">{{ skill.description }}</p>
            
            <!-- Action Button -->
            <UButton 
              v-if="!skill.used"
              @click="gameStore.useSkill(skill.id)"
              size="xs"
              block
              color="primary"
            >
              Sử Dụng
            </UButton>
            
            <UBadge 
              v-else
              color="gray"
              variant="soft"
              class="w-full justify-center"
            >
              Đã Sử Dụng
            </UBadge>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Summary -->
    <UCard class="mt-6">
      <div class="text-center">
        <UIcon name="i-heroicons-star" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <p class="text-sm text-gray-600">Còn lại</p>
        <p class="text-xl font-bold text-gray-900">{{ gameStore.skillsCount }} năng lực số</p>
        <p class="text-xs text-gray-500 mt-1">chưa sử dụng</p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const gameStore = useGameStore()
</script>