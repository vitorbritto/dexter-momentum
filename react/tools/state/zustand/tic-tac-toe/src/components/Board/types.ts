export type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
};
