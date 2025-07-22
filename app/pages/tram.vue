<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Bản Đồ Trạm</h1>
      <p class="text-gray-600">Theo dõi hành trình của bạn</p>
    </div>

    <!-- Metro-style Station Map -->
    <div class="relative">
      <!-- Main Line -->
      <div class="absolute left-8 top-0 bottom-0 w-1 bg-gray-300"></div>
      
      <!-- Stations -->
      <div class="space-y-8">
        <div 
          v-for="(station, index) in gameStore.stations" 
          :key="station.id"
          class="relative flex items-center"
        >
          <!-- Station Circle -->
          <div 
            class="relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300"
            :class="getStationClasses(station)"
          >
            <UIcon 
              :name="getStationIcon(station)" 
              class="w-6 h-6"
              :class="station.visited ? 'text-white' : 'text-gray-400'"
            />
            
            <!-- Blinking effect for current station -->
            <div 
              v-if="station.current"
              class="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"
            ></div>
          </div>

          <!-- Station Info -->
          <div class="ml-6 flex-1">
            <UCard 
              :class="station.visited ? 'bg-white' : 'bg-gray-50'"
              class="transition-all duration-300"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h3 
                    class="font-semibold"
                    :class="station.visited ? 'text-gray-800' : 'text-gray-500'"
                  >
                    {{ station.name }}
                  </h3>
                  <p 
                    class="text-sm"
                    :class="station.visited ? 'text-gray-600' : 'text-gray-400'"
                  >
                    {{ getStationStatus(station) }}
                  </p>
                </div>
                
                <!-- Station Badge -->
                <UBadge 
                  :color="getStationBadgeColor(station)"
                  :variant="station.visited ? 'solid' : 'outline'"
                >
                  {{ getStationBadgeText(station) }}
                </UBadge>
              </div>
            </UCard>
          </div>

          <!-- Connection Line to Next Station -->
          <div 
            v-if="index < gameStore.stations.length - 1"
            class="absolute left-8 top-16 w-1 h-8 bg-gray-300"
          ></div>
        </div>
      </div>
    </div>

    <!-- Progress Summary -->
    <div class="mt-8 p-4 bg-blue-50 rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-blue-700">Tiến độ khám phá</span>
        <span class="text-sm text-blue-600">{{ visitedStationsCount }}/{{ gameStore.stations.length }}</span>
      </div>
      <div class="w-full bg-blue-200 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${(visitedStationsCount / gameStore.stations.length) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore();

const visitedStationsCount = computed(() => {
  return gameStore.stations.filter(station => station.visited).length;
});

const getStationClasses = (station) => {
  if (station.current) {
    return 'bg-blue-500 border-blue-500 shadow-lg';
  } else if (station.visited) {
    return 'bg-green-500 border-green-500';
  } else {
    return 'bg-gray-100 border-gray-300';
  }
};

const getStationIcon = (station) => {
  if (station.current) {
    return 'i-heroicons-map-pin';
  } else if (station.visited) {
    return 'i-heroicons-check';
  } else {
    return 'i-heroicons-lock-closed';
  }
};

const getStationStatus = (station) => {
  if (station.current) {
    return 'Vị trí hiện tại';
  } else if (station.visited) {
    return 'Đã hoàn thành';
  } else {
    return 'Chưa mở khóa';
  }
};

const getStationBadgeColor = (station) => {
  if (station.current) {
    return 'blue';
  } else if (station.visited) {
    return 'green';
  } else {
    return 'gray';
  }
};

const getStationBadgeText = (station) => {
  if (station.current) {
    return 'Hiện tại';
  } else if (station.visited) {
    return 'Hoàn thành';
  } else {
    return 'Khóa';
  }
};
</script>