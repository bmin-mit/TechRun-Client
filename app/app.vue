<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtPage />
    
    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div class="flex justify-around items-center max-w-md mx-auto">
        <NuxtLink 
          to="/" 
          class="flex flex-col items-center p-2 text-xs"
          :class="$route.path === '/' ? 'text-blue-600' : 'text-gray-500'"
        >
          <UIcon name="i-heroicons-home" class="w-6 h-6 mb-1" />
          <span>Trang Chủ</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/nang-luc-so" 
          class="flex flex-col items-center p-2 text-xs"
          :class="$route.path === '/nang-luc-so' ? 'text-blue-600' : 'text-gray-500'"
        >
          <UIcon name="i-heroicons-star" class="w-6 h-6 mb-1" />
          <span>Năng Lực</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/manh-du-lieu" 
          class="flex flex-col items-center p-2 text-xs"
          :class="$route.path === '/manh-du-lieu' ? 'text-blue-600' : 'text-gray-500'"
        >
          <UIcon name="i-heroicons-puzzle-piece" class="w-6 h-6 mb-1" />
          <span>Manh Mối</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/tram" 
          class="flex flex-col items-center p-2 text-xs"
          :class="$route.path === '/tram' ? 'text-blue-600' : 'text-gray-500'"
        >
          <UIcon name="i-heroicons-map-pin" class="w-6 h-6 mb-1" />
          <span>Trạm</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/dau-gia" 
          class="flex flex-col items-center p-2 text-xs"
          :class="$route.path === '/dau-gia' ? 'text-blue-600' : 'text-gray-500'"
        >
          <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 mb-1" />
          <span>Đấu Giá</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>
