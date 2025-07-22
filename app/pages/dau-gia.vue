<template>
  <div class="pb-20">
    <!-- Sticky Timer Header -->
    <div class="sticky top-0 z-50 bg-red-500 text-white p-4 text-center">
      <div class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-clock" class="w-5 h-5" />
        <span class="font-bold text-lg">{{ formatTime(timeLeft) }}</span>
      </div>
      <p class="text-sm opacity-90">Thời gian còn lại</p>
    </div>

    <div class="p-4">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Đấu Giá</h1>
        <p class="text-gray-600">Đấu giá để sở hữu vật phẩm đặc biệt</p>
      </div>

      <!-- Auction Item -->
      <UCard class="mb-6">
        <div class="space-y-4">
          <!-- Item Image -->
          <div class="aspect-[1.6/1] rounded-lg overflow-hidden bg-gray-100">
            <img 
              :src="gameStore.auctionItem.image" 
              :alt="gameStore.auctionItem.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Item Info -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ gameStore.auctionItem.title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ gameStore.auctionItem.description }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- Current Bid Info -->
      <UCard class="mb-6 bg-yellow-50 border-yellow-200">
        <div class="text-center">
          <h4 class="text-lg font-semibold text-yellow-800 mb-2">Giá Hiện Tại</h4>
          <p class="text-3xl font-bold text-yellow-600">
            {{ currentHighestBid.toLocaleString('vi-VN') }} VND
          </p>
          <p class="text-sm text-yellow-700 mt-1">
            {{ currentHighestBid === 0 ? 'Chưa có ai đặt giá' : 'Giá cao nhất hiện tại' }}
          </p>
        </div>
      </UCard>

      <!-- Bidding Section -->
      <div v-if="!gameStore.hasJoinedAuction" class="space-y-4">
        <UCard>
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-800">Đặt Giá Của Bạn</h4>
            
            <UFormGroup label="Số tiền (VND)">
              <UInput 
                v-model="bidAmount"
                type="number" 
                placeholder="Nhập số tiền..."
                :min="currentHighestBid + 1000"
                step="1000"
                size="lg"
              />
            </UFormGroup>

            <div class="flex space-x-2">
              <UButton 
                @click="setBidAmount(currentHighestBid + 10000)"
                variant="outline"
                size="sm"
                class="flex-1"
              >
                +10,000
              </UButton>
              <UButton 
                @click="setBidAmount(currentHighestBid + 50000)"
                variant="outline"
                size="sm"
                class="flex-1"
              >
                +50,000
              </UButton>
              <UButton 
                @click="setBidAmount(currentHighestBid + 100000)"
                variant="outline"
                size="sm"
                class="flex-1"
              >
                +100,000
              </UButton>
            </div>

            <UButton 
              @click="placeBid"
              :disabled="!isValidBid || timeLeft <= 0"
              color="green"
              size="lg"
              block
            >
              <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5 mr-2" />
              Tham Gia Đấu Giá
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Joined Auction State -->
      <div v-else class="space-y-4">
        <UCard class="bg-green-50 border-green-200">
          <div class="text-center">
            <UIcon name="i-heroicons-check-circle" class="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h4 class="text-lg font-semibold text-green-800 mb-2">Đã Tham Gia Đấu Giá!</h4>
            <p class="text-green-700">
              Giá đặt của bạn: <span class="font-bold">{{ gameStore.userBid.toLocaleString('vi-VN') }} VND</span>
            </p>
            <p class="text-sm text-green-600 mt-2">
              Chờ đợi kết quả đấu giá...
            </p>
          </div>
        </UCard>

        <!-- Update Bid Option -->
        <UCard>
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-800">Cập Nhật Giá</h4>
            
            <UFormGroup label="Số tiền mới (VND)">
              <UInput 
                v-model="bidAmount"
                type="number" 
                placeholder="Nhập số tiền cao hơn..."
                :min="Math.max(gameStore.userBid + 1000, currentHighestBid + 1000)"
                step="1000"
                size="lg"
              />
            </UFormGroup>

            <UButton 
              @click="placeBid"
              :disabled="!isValidUpdateBid || timeLeft <= 0"
              color="blue"
              size="lg"
              block
            >
              Cập Nhật Giá
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Auction Ended -->
      <div v-if="timeLeft <= 0" class="mt-6">
        <UCard class="bg-red-50 border-red-200">
          <div class="text-center">
            <UIcon name="i-heroicons-clock" class="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h4 class="text-lg font-semibold text-red-800 mb-2">Đấu Giá Đã Kết Thúc</h4>
            <p class="text-red-700">
              Cảm ơn bạn đã tham gia!
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore();

const bidAmount = ref(0);
const timeLeft = ref(30);
const currentHighestBid = ref(0);

// Timer countdown
const timer = setInterval(() => {
  if (timeLeft.value > 0) {
    timeLeft.value--;
  } else {
    clearInterval(timer);
  }
}, 1000);

// Cleanup timer on component unmount
onUnmounted(() => {
  clearInterval(timer);
});

const isValidBid = computed(() => {
  return bidAmount.value > 0 && 
         Number.isInteger(Number(bidAmount.value)) && 
         bidAmount.value > currentHighestBid.value;
});

const isValidUpdateBid = computed(() => {
  return bidAmount.value > 0 && 
         Number.isInteger(Number(bidAmount.value)) && 
         bidAmount.value > Math.max(gameStore.userBid, currentHighestBid.value);
});

const setBidAmount = (amount) => {
  bidAmount.value = amount;
};

const placeBid = () => {
  if (isValidBid.value || isValidUpdateBid.value) {
    gameStore.placeBid(Number(bidAmount.value));
    currentHighestBid.value = Math.max(currentHighestBid.value, Number(bidAmount.value));
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
</script>