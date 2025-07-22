<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Năng Lực Số</h1>
      <p class="text-gray-600">Sử dụng các kỹ năng đặc biệt của bạn</p>
    </div>

    <!-- Skills List -->
    <div class="space-y-4">
      <UCard 
        v-for="skill in gameStore.skills" 
        :key="skill.id"
        :class="skill.used ? 'opacity-60' : ''"
      >
        <div class="space-y-4">
          <!-- Skill Image -->
          <div class="aspect-[1.6/1] rounded-lg overflow-hidden bg-gray-100">
            <img 
              :src="skill.image" 
              :alt="skill.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Skill Info -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ skill.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ skill.description }}
            </p>

            <!-- Action Button -->
            <UButton 
              :disabled="skill.used"
              :color="skill.used ? 'gray' : 'blue'"
              block
              @click="useSkill(skill.id)"
            >
              {{ skill.used ? 'Đã Sử Dụng' : 'Sử Dụng' }}
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <div v-if="gameStore.skills.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-star" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-500 mb-2">Chưa có năng lực số</h3>
      <p class="text-gray-400">Hãy khám phá các trạm để mở khóa năng lực mới</p>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore();

const useSkill = (skillId) => {
  gameStore.useSkill(skillId);
};
</script>