export const getRemainingTime = (createdAt: string): string | null => {
  const createdTime = new Date(createdAt).getTime();
  const now = new Date().getTime();
  const diffMs = 6 * 60 * 1000 - (now - createdTime); // 5 mins - elapsed

  if (diffMs <= 0) return null;

  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
