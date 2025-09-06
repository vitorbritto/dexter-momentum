export const calculateTurns = (squares: string[]) => {
  return squares.filter((square) => !square).length;
};
