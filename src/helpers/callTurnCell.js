export const cellCanTrun = (nullPosition) => {
  switch (nullPosition) {
    case 0:
      return [1, 3];
    case 1:
      return [0, 2, 4];
    case 2:
      return [1, 5];
    case 3:
      return [0, 4, 6];
    case 4:
      return [3, 1, 5, 7];
    case 5:
      return [2, 4, 8];
    case 6:
      return [3, 7];
    case 7:
      return [6, 4, 8];
    case 8:
      return [5, 7];
    default:
      return [];
  }
};
