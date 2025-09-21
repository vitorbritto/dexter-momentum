import {
  calculateTurns,
  calculateWinner,
  calculateStatus,
} from "../../helpers";
import type { BoardProps } from "./types";
import Square from "../Square";
import styles from "./styles";

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const player = xIsNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const status = calculateStatus(winner, turns, player);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  };
  return (
    <>
      <div style={{ marginBottom: "0.5rem" }}>{status}</div>
      <div style={styles}>
        {squares.map((square, index) => (
          <Square
            value={square}
            key={index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
