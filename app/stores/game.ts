export const useGameStore = defineStore('game', () => {
  // User stats
  const coins = ref(2450)
  const skillsCount = ref(8)
  const hintsCount = ref(3)
  
  // Skills (Năng Lực Số)
  const skills = ref([
    {
      id: 1,
      title: 'Tăng Tốc Độ',
      description: 'Tăng tốc độ di chuyển trong 10 phút',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: false
    },
    {
      id: 2,
      title: 'Nhìn Xa Hơn',
      description: 'Mở rộng tầm nhìn để phát hiện manh mối ẩn',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: true
    },
    {
      id: 3,
      title: 'Bảo Vệ',
      description: 'Miễn nhiễm với các hiệu ứng tiêu cực trong 5 phút',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: false
    },
    {
      id: 4,
      title: 'Thu Thập Nhanh',
      description: 'Tự động thu thập tất cả vật phẩm trong bán kính 50m',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: false
    },
    {
      id: 5,
      title: 'Thời Gian Thêm',
      description: 'Tăng thêm 15 phút thời gian chơi',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: true
    },
    {
      id: 6,
      title: 'Gợi Ý Thông Minh',
      description: 'Nhận gợi ý về vị trí trạm tiếp theo',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: false
    },
    {
      id: 7,
      title: 'Nhân Đôi Điểm',
      description: 'Nhân đôi điểm số trong 20 phút tiếp theo',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: false
    },
    {
      id: 8,
      title: 'Teleport',
      description: 'Dịch chuyển tức thời đến trạm đã ghé thăm',
      image: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
      used: false
    }
  ])
  
  // Hints (Mảnh Dữ Liệu)
  const hints = ref([
    {
      id: 1,
      title: 'Manh Mối Đầu Tiên',
      description: 'Nơi mặt trời mọc đầu tiên ở thành phố, tòa nhà cao nhất hướng Đông'
    },
    {
      id: 2,
      title: 'Dấu Hiệu Cổ Xưa',
      description: 'Tìm biểu tượng rồng trên cổng chính của ngôi chùa cổ nhất'
    },
    {
      id: 3,
      title: 'Con Số Bí Ẩn',
      description: 'Số tầng của tòa nhà trung tâm cộng với năm thành lập thành phố'
    }
  ])
  
  // Stations (Trạm)
  const stations = ref([
    { id: 1, name: 'Trạm Trung Tâm', visited: true, current: false },
    { id: 2, name: 'Trạm Bảo Tàng', visited: true, current: false },
    { id: 3, name: 'Trạm Công Viên', visited: true, current: true },
    { id: 4, name: 'Trạm Chợ Cũ', visited: false, current: false },
    { id: 5, name: 'Trạm Cầu Sông', visited: false, current: false },
    { id: 6, name: 'Trạm Đại Học', visited: false, current: false },
    { id: 7, name: 'Trạm Cuối', visited: false, current: false }
  ])
  
  // Auction (Đấu Giá)
  const auctionItem = ref({
    id: 1,
    title: 'Bùa May Mắn Vàng',
    description: 'Tăng 50% cơ hội tìm thấy vật phẩm hiếm trong 1 giờ. Chỉ có 1 chiếc duy nhất!',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=450',
    currentBid: 0,
    userBid: 0,
    timeLeft: 30
  })
  
  // Actions
  const useSkill = (skillId: number) => {
    const skill = skills.value.find(s => s.id === skillId)
    if (skill && !skill.used) {
      skill.used = true
      skillsCount.value--
    }
  }
  
  const placeBid = (amount: number) => {
    if (amount > auctionItem.value.currentBid && amount <= coins.value) {
      auctionItem.value.userBid = amount
      auctionItem.value.currentBid = amount
    }
  }
  
  // Computed
  const unusedSkills = computed(() => skills.value.filter(s => !s.used))
  const visitedStations = computed(() => stations.value.filter(s => s.visited))
  const currentStation = computed(() => stations.value.find(s => s.current))
  
  return {
    coins,
    skillsCount,
    hintsCount,
    skills,
    hints,
    stations,
    auctionItem,
    useSkill,
    placeBid,
    unusedSkills,
    visitedStations,
    currentStation
  }
})