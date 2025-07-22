<script setup>
const gameStore = useGameStore()
</script>

<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">
        Mảnh Dữ Liệu
      </h1>
      <p class="text-gray-600">
        Các manh mối để giải câu đố cuối cùng
      </p>
    </div>

    <!-- Progress -->
    <UCard class="mb-6">
      <div class="text-center">
        <div class="flex items-center justify-center space-x-2 mb-2">
          <UIcon name="i-heroicons-puzzle-piece" class="w-6 h-6 text-green-600" />
          <span class="text-lg font-semibold text-gray-900">{{ gameStore.hintsCount }}/5</span>
        </div>
        <p class="text-sm text-gray-600 mb-3">
          Mảnh dữ liệu đã thu thập
        </p>
        <UProgress :value="(gameStore.hintsCount / 5) * 100" color="green" />
      </div>
    </UCard>

    <!-- Hints List -->
    <div class="space-y-4">
      <div
        v-for="(hint, index) in gameStore.hints"
        :key="hint.id"
        class="relative"
      >
        <UCard>
          <div class="flex space-x-4">
            <!-- Number Badge -->
            <div class="flex-shrink-0">
              <UBadge
                color="green"
                variant="solid"
                class="w-8 h-8 rounded-full flex items-center justify-center"
              >
                {{ index + 1 }}
              </UBadge>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 mb-1">
                {{ hint.title }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ hint.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Placeholder for missing hints -->
      <div
        v-for="i in (5 - gameStore.hintsCount)"
        :key="`missing-${i}`"
        class="relative"
      >
        <UCard class="opacity-50">
          <div class="flex space-x-4">
            <!-- Number Badge -->
            <div class="flex-shrink-0">
              <UBadge
                color="gray"
                variant="soft"
                class="w-8 h-8 rounded-full flex items-center justify-center"
              >
                {{ gameStore.hintsCount + i }}
              </UBadge>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-400 mb-1">
                Mảnh dữ liệu bí ẩn
              </h3>
              <p class="text-sm text-gray-400">
                Chưa được khám phá...
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Info Card -->
    <UCard class="mt-6">
      <UAlert
        icon="i-heroicons-information-circle"
        color="blue"
        variant="soft"
        title="Thông tin"
        description="Thu thập đủ 5 mảnh dữ liệu để mở khóa câu đố cuối cùng và giành chiến thắng!"
      />
    </UCard>
  </div>
</template>
