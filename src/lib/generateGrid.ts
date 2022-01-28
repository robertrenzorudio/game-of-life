export const generateGrid = (n: number, m: number): number[][] => {
  return Array.from(Array(n), (_) => Array(m).fill(0));
};
