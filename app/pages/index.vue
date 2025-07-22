<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Trang Chủ</h1>
      <p class="text-gray-600">Theo dõi tiến độ trò chơi của bạn</p>
    </div>

    <!-- Stats Cards -->
    <div class="space-y-4 mb-6">
      <!-- Coins -->
      <UCard>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <UIcon
                name="i-heroicons-currency-dollar"
                class="w-8 h-8 text-yellow-600"
              />
            </div>
            <div>
              <p class="text-sm text-gray-600">Xu hiện tại</p>
              <p class="text-xl font-bold text-gray-900">
                {{ gameStore.coins.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Skills -->
      <UCard>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-3 bg-blue-100 rounded-lg">
              <UIcon name="i-heroicons-star" class="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Năng Lực Số</p>
              <p class="text-xl font-bold text-gray-900">
                {{ gameStore.skillsCount }}
                <span class="text-sm font-normal text-gray-500"
                  >chưa sử dụng</span
                >
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Hints -->
      <UCard>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-3 bg-green-100 rounded-lg">
              <UIcon
                name="i-heroicons-puzzle-piece"
                class="w-8 h-8 text-green-600"
              />
            </div>
            <div>
              <p class="text-sm text-gray-600">Mảnh Dữ Liệu</p>
              <p class="text-xl font-bold text-gray-900">
                {{ gameStore.hintsCount }}
                <span class="text-sm font-normal text-gray-500"
                  >đã thu thập</span
                >
              </p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-col">
      <h2 class="text-lg font-semibold text-gray-900">Hành Động Nhanh</h2>

      <UButton
        to="/nang-luc-so"
        variant="outline"
        size="lg"
        block
        :trailing="false"
      >
        <template #leading>
          <UIcon name="i-heroicons-star" />
        </template>
        Sử Dụng Năng Lực Số
      </UButton>

      <UButton to="/tram" variant="outline" size="lg" block :trailing="false">
        <template #leading>
          <UIcon name="i-heroicons-map-pin" />
        </template>
        Xem Bản Đồ Trạm
      </UButton>

      <UButton
        to="/dau-gia"
        variant="outline"
        size="lg"
        block
        :trailing="false"
      >
        <template #leading>
          <UIcon name="i-heroicons-currency-dollar" />
        </template>
        Tham Gia Đấu Giá
      </UButton>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore();
</script>
