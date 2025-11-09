export const getSubjectColor = (index) => {
  const colors = [
    'from-[#8AC6D1] to-[#A3BFFA]',
    'from-[#FF9A8B] to-[#FFD6A5]',
    'from-[#DFF6F0] to-[#8AC6D1]',
    'from-[#E8DFF5] to-[#A3BFFA]',
    'from-[#A3BFFA] to-[#E9F0FF]',
    'from-[#FFD6A5] to-[#FF9A8B]'
  ];
  return colors[index % colors.length];
};