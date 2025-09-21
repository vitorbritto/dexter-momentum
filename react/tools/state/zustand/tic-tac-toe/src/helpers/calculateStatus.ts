export const calculateStatus = (
  winner: string | null,
  turns: number,
  player: string
) => {
  if (!winner && !turns) {
    return "Draw!";
  }

  if (winner) {
    return `Winner: ${winner}`;
  }

  return `Next player: ${player}`;
};
