export const match = (param) => {
  return /^\d+$/.test(param) && parseInt(param, 10) > 0;
};
