export const getDifficultyBadge = (difficulty) => {
  if (difficulty <= 3) {
    return { text: 'Easy', color: 'bg-green-100 text-green-700' };
  }
  if (difficulty <= 7) {
    return { text: 'Medium', color: 'bg-yellow-100 text-yellow-700' };
  }
  return { text: 'Hard', color: 'bg-red-100 text-red-700' };
};