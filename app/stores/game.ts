export const useGameStore = defineStore('game', () => {
  // User stats
  const coins = ref(1250);
  const skills = ref([
    {
      id: 1,
      title: 'Phân Tích Dữ Liệu',
      description: 'Khả năng phân tích và xử lý thông tin từ các nguồn dữ liệu khác nhau',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      used: false,
    },
    {
      id: 2,
      title: 'Tư Duy Logic',
      description: 'Khả năng suy luận logic và giải quyết vấn đề một cách có hệ thống',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      used: false,
    },
    {
      id: 3,
      title: 'Kỹ Năng Quan Sát',
      description: 'Khả năng quan sát chi tiết và nhận biết các mẫu hình ẩn',
      image: 'https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      used: true,
    },
  ]);

  const hints = ref([
    {
      id: 1,
      title: 'Manh Mối Đầu Tiên',
      description: 'Câu trả lời nằm trong những con số được tìm thấy ở trạm đầu tiên',
    },
    {
      id: 2,
      title: 'Kết Nối Lịch Sử',
      description: 'Hãy tìm hiểu về lịch sử của khu vực này, đặc biệt là những sự kiện quan trọng',
    },
    {
      id: 3,
      title: 'Ký Hiệu Bí Ẩn',
      description: 'Những ký hiệu trên tường có ý nghĩa đặc biệt, hãy kết hợp chúng theo thứ tự',
    },
  ]);

  const stations = ref([
    { id: 1, name: 'Trạm Khởi Đầu', visited: true, current: false },
    { id: 2, name: 'Trạm Trung Tâm', visited: true, current: false },
    { id: 3, name: 'Trạm Hiện Tại', visited: true, current: true },
    { id: 4, name: 'Trạm Tiếp Theo', visited: false, current: false },
    { id: 5, name: 'Trạm Cuối', visited: false, current: false },
  ]);

  const auctionItem = ref({
    title: 'Bản Đồ Cổ Bí Mật',
    description: 'Một bản đồ cổ chứa đựng những bí mật về kho báu được giấu kín trong khu vực. Được vẽ bằng mực đặc biệt và có những ký hiệu bí ẩn.',
    image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    currentBid: 0,
    timeLeft: 30,
  });

  const userBid = ref(0);
  const hasJoinedAuction = ref(false);

  // Actions
  const useSkill = (skillId: number) => {
    const skill = skills.value.find(s => s.id === skillId);
    if (skill && !skill.used) {
      skill.used = true;
    }
  };

  const placeBid = (amount: number) => {
    if (amount > 0 && Number.isInteger(amount)) {
      userBid.value = amount;
      hasJoinedAuction.value = true;
    }
  };

  const joinAuction = () => {
    hasJoinedAuction.value = true;
  };

  return {
    coins,
    skills,
    hints,
    stations,
    auctionItem,
    userBid,
    hasJoinedAuction,
    useSkill,
    placeBid,
    joinAuction,
  };
});