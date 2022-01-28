export const calcNeighbors = [
  (i: number, j: number) => {
    return {
      ni: i - 1,
      nj: j - 1,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i - 1,
      nj: j,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i - 1,
      nj: j + 1,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i,
      nj: j - 1,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i,
      nj: j + 1,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i + 1,
      nj: j - 1,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i + 1,
      nj: j,
    };
  },
  (i: number, j: number) => {
    return {
      ni: i + 1,
      nj: j + 1,
    };
  },
];
