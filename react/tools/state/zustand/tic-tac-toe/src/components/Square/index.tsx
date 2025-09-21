import style from "./styles";
import type { SquareProps } from "./types";

const Square = ({ value, onClick }: SquareProps) => (
  <button style={style} onClick={onClick}>
    {value}
  </button>
);

export default Square;
