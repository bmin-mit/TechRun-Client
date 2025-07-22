<template>
  <div class="pb-20">
    <!-- Sticky Timer -->
    <div class="sticky top-0 z-50 bg-red-500 text-white p-3 text-center">
      <div class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-clock" class="w-5 h-5" />
        <span class="font-bold text-lg">{{ formatTime(timeLeft) }}</span>
      </div>
      <p class="text-xs opacity-90">Thời gian còn lại</p>
    </div>

    <div class="p-4">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Đấu Giá</h1>
        <p class="text-gray-600">Đấu giá để sở hữu vật phẩm hiếm</p>
      </div>

      <!-- Auction Item -->
      <UCard class="mb-6">
        <!-- Vertical Credit Card Image -->
        <div class="aspect-[2/3] mb-4 overflow-hidden rounded-lg mx-auto max-w-48">
          <img 
            :src="gameStore.auctionItem.image" 
            :alt="gameStore.auctionItem.title"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900 mb-2">{{ gameStore.auctionItem.title }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ gameStore.auctionItem.description }}</p>
          
          <!-- Current Bid -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <p class="text-sm text-gray-600 mb-1">Giá hiện tại</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ gameStore.auctionItem.currentBid > 0 ? gameStore.auctionItem.currentBid.toLocaleString() : 'Chưa có giá' }} 
              <span v-if="gameStore.auctionItem.currentBid > 0" class="text-sm font-normal">VND</span>
            </p>
          </div>
        </div>
      </UCard>

      <!-- Bidding Section -->
      <UCard>
        <div class="space-y-4">
          <h3 class="font-semibold text-gray-900">Đặt Giá Của Bạn</h3>
          
          <!-- Bid Input -->
          <UFormGroup label="Số tiền (VND)">
            <UInput 
              v-model="bidAmount"
              type="number"
              placeholder="Nhập số tiền..."
              :min="gameStore.auctionItem.currentBid + 1"
              :max="gameStore.coins"
            />
          </UFormGroup>

          <!-- Quick Bid Buttons -->
          <div class="grid grid-cols-3 gap-2">
            <UButton 
              @click="addToBid(10000)"
              variant="outline"
              size="sm"
              block
            >
              +10k
            </UButton>
            <UButton 
              @click="addToBid(50000)"
              variant="outline"
              size="sm"
              block
            >
              +50k
            </UButton>
            <UButton 
              @click="addToBid(100000)"
              variant="outline"
              size="sm"
              block
            >
              +100k
            </UButton>
          </div>

          <!-- Bid Button -->
          <UButton 
            @click="placeBid"
            :disabled="!canBid"
            size="lg"
            block
            color="primary"
          >
            {{ gameStore.auctionItem.userBid > 0 ? 'Cập Nhật Giá' : 'Tham Gia Đấu Giá' }}
          </UButton>

          <!-- User's Current Bid -->
          <div v-if="gameStore.auctionItem.userBid > 0" class="text-center">
            <UAlert 
              icon="i-heroicons-currency-dollar"
              color="green"
              variant="soft"
              :title="`Giá của bạn: ${gameStore.auctionItem.userBid.toLocaleString()} VND`"
              description="Bạn đang dẫn đầu cuộc đấu giá!"
            />
          </div>

          <!-- Balance Info -->
          <div class="text-center text-sm text-gray-600">
            <p>Số dư hiện tại: <span class="font-semibold">{{ gameStore.coins.toLocaleString() }} VND</span></p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const gameStore = useGameStore()
const bidAmount = ref('')
const timeLeft = ref(30)

// Timer countdown
const timer = setInterval(() => {
  if (timeLeft.value > 0) {
    timeLeft.value--
  } else {
    clearInterval(timer)
  }
}, 1000)

// Cleanup timer on unmount
onUnmounted(() => {
  clearInterval(timer)
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const addToBid = (amount) => {
  const currentBid = parseInt(bidAmount.value) || gameStore.auctionItem.currentBid
  bidAmount.value = (currentBid + amount).toString()
}

const canBid = computed(() => {
  const amount = parseInt(bidAmount.value)
  return amount > gameStore.auctionItem.currentBid && 
         amount <= gameStore.coins && 
         amount > 0 &&
         timeLeft.value > 0
})

const placeBid = () => {
  if (canBid.value) {
    const amount = parseInt(bidAmount.value)
    gameStore.placeBid(amount)
  }
}
</script>