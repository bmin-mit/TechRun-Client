<script setup>
const gameStore = useGameStore()
</script>

<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">
        Bản Đồ Trạm
      </h1>
      <p class="text-gray-600">
        Theo dõi hành trình của bạn
      </p>
    </div>

    <!-- Progress Summary -->
    <UCard class="mb-6">
      <div class="text-center">
        <div class="flex items-center justify-center space-x-4 mb-3">
          <div class="text-center">
            <p class="text-2xl font-bold text-green-600">
              {{ gameStore.visitedStations.length }}
            </p>
            <p class="text-xs text-gray-600">
              Đã ghé
            </p>
          </div>
          <div class="w-px h-8 bg-gray-300" />
          <div class="text-center">
            <p class="text-2xl font-bold text-blue-600">
              1
            </p>
            <p class="text-xs text-gray-600">
              Hiện tại
            </p>
          </div>
          <div class="w-px h-8 bg-gray-300" />
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-400">
              {{ gameStore.stations.length - gameStore.visitedStations.length - 1 }}
            </p>
            <p class="text-xs text-gray-600">
              Chưa ghé
            </p>
          </div>
        </div>
        <UProgress
          :value="(gameStore.visitedStations.length / gameStore.stations.length) * 100"
          color="green"
        />
      </div>
    </UCard>

    <!-- Metro-style Station Map -->
    <UCard>
      <div class="space-y-0">
        <div
          v-for="(station, index) in gameStore.stations"
          :key="station.id"
          class="relative flex items-center"
        >
          <!-- Station Line -->
          <div class="flex flex-col items-center mr-4">
            <!-- Station Circle -->
            <div
              class="w-4 h-4 rounded-full border-2 flex items-center justify-center relative z-10"
              :class="{
                'bg-green-500 border-green-500': station.visited && !station.current,
                'bg-blue-500 border-blue-500 animate-pulse': station.current,
                'bg-white border-gray-300': !station.visited && !station.current,
              }"
            >
              <div
                v-if="station.current"
                class="w-2 h-2 bg-white rounded-full animate-pulse"
              />
            </div>

            <!-- Connecting Line -->
            <div
              v-if="index < gameStore.stations.length - 1"
              class="w-0.5 h-8 -mt-1"
              :class="{
                'bg-green-500': station.visited,
                'bg-gray-300': !station.visited,
              }"
            />
          </div>

          <!-- Station Info -->
          <div class="flex-1 py-2">
            <div class="flex items-center justify-between">
              <div>
                <h3
                  class="font-medium"
                  :class="{
                    'text-green-700': station.visited && !station.current,
                    'text-blue-700 font-semibold': station.current,
                    'text-gray-500': !station.visited && !station.current,
                  }"
                >
                  {{ station.name }}
                </h3>
                <p class="text-xs text-gray-500">
                  <span v-if="station.visited && !station.current">Đã hoàn thành</span>
                  <span v-else-if="station.current" class="text-blue-600 font-medium">Vị trí hiện tại</span>
                  <span v-else>Chưa khám phá</span>
                </p>
              </div>

              <!-- Status Icon -->
              <div>
                <UIcon
                  v-if="station.visited && !station.current"
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 text-green-500"
                />
                <UIcon
                  v-else-if="station.current"
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-blue-500"
                />
                <UIcon
                  v-else
                  name="i-heroicons-clock"
                  class="w-5 h-5 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Current Station Info -->
    <UCard v-if="gameStore.currentStation" class="mt-4">
      <UAlert
        icon="i-heroicons-map-pin"
        color="blue"
        variant="soft"
        :title="`Bạn đang ở: ${gameStore.currentStation.name}`"
        description="Hoàn thành nhiệm vụ tại trạm này để tiếp tục hành trình!"
      />
    </UCard>
  </div>
</template>
