import { useState } from "react";
import { Board, Player} from "@/types/fourinarow";
import { checkWinner } from "@/utils/fourInARowWinner";

const ROWS = 6;
const COLS = 7;

function createBoard(): Board {
  return Array.from(
    { length: ROWS },
    () => Array(COLS).fill("")
  );
}

export function useFourInARow() {

  const [board, setBoard] = useState<Board>(
      createBoard()
    );

  const [turn, setTurn] = useState<Player>("R");

  const [winner, setWinner] = useState<Player | "draw" | "">("");

  const [score, setScore] = useState({
      player1: 0,
      player2: 0,
    });


  function dropPiece(column: number) {

    if (winner) return;

    const newBoard =
      board.map((row) => [...row]);

    let placed = false;

    for (
      let row = ROWS - 1;
      row >= 0;
      row--
    ) {

      if (
        newBoard[row][column] === ""
      ) {

        newBoard[row][column] =
          turn;

        placed = true;

        break;

      }

    }


    if (!placed) {
      return;
    }


    const gameWinner =
      checkWinner(newBoard);


    setBoard(newBoard);


    if (gameWinner) {

      setWinner(gameWinner);

      if (gameWinner === "R") {

        setScore((old) => ({...old, player1: old.player1 + 1,}));

      }

      if (gameWinner === "Y") {

        setScore((old) => ({...old, player2:old.player2 + 1,}));

      }

      return;

    }

    setTurn(
      turn === "R"
        ? "Y"
        : "R"
    );

  }

  function resetBoard() {

    setBoard(
      createBoard()
    );

    setTurn("R");

    setWinner("");

  }

  function resetMatch() {

    resetBoard();

    setScore({

      player1: 0,
      player2: 0,

    });

  }

  return {

    board,
    turn,
    winner,
    score,
    dropPiece,
    resetBoard,
    resetMatch,

  };

}