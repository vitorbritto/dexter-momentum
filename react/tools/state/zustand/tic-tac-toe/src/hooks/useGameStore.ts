import { create } from "zustand";

type GameState = {
  xIsNext: boolean;
  history: string[][];
  currentMove: number;
  setHistory: (
    nextHistory: string[][] | ((prev: string[][]) => string[][])
  ) => void;
  setXIsNext: (nextXIsNext: boolean | ((prev: boolean) => boolean)) => void;
  setCurrentMove: (
    nextCurrentMove: number | ((prev: number) => number)
  ) => void;
};

export const useGameStore = create<GameState>((set) => ({
  history: [Array(9).fill(null)],
  currentMove: 0,
  xIsNext: true,
  setHistory: (nextHistory) => {
    set((state) => ({
      history:
        typeof nextHistory === "function"
          ? nextHistory(state.history)
          : nextHistory,
    }));
  },
  setXIsNext: (nextXIsNext) => {
    set((state) => ({
      xIsNext:
        typeof nextXIsNext === "function"
          ? nextXIsNext(state.xIsNext)
          : nextXIsNext,
    }));
  },
  setCurrentMove: (nextCurrentMove) => {
    set((state) => ({
      currentMove:
        typeof nextCurrentMove === "function"
          ? nextCurrentMove(state.currentMove)
          : nextCurrentMove,
    }));
  },
}));
