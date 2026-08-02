import { Board, Player } from "@/types/fourinarow";

export function checkWinner(
    board: Board
): Player | "draw" | null {

    const rows = 6;
    const cols = 7;

    function checkDirection(
        row: number,
        col: number,
        rowDirection: number,
        colDirection: number,
    ): Player | null {

        const player =
            board[row][col];

        if (!player) {
            return null;
        }

        for (
            let i = 1;
            i < 4;
            i++
        ) {
            const newRow =
                row + rowDirection * i;

            const newCol =
                col + colDirection * i;

            if (
                newRow < 0 ||
                newRow >= rows ||
                newCol < 0 ||
                newCol >= cols
            ) {
                return null;
            }

            if (
                board[newRow][newCol] !== player
            ) {
                return null;
            }
        }

        return player;
    }

    for (
        let row = 0;
        row < rows;
        row++
    ) {
        for (
            let col = 0;
            col < cols;
            col++
        ) {
            const directions = [
                [0, 1],
                [1, 0],
                [1, 1],
                [1, -1],
            ];

            for (
                const [
                    rowDirection,
                    colDirection,
                ] of directions
            ) {
                const winner =
                    checkDirection(
                        row,
                        col,
                        rowDirection,
                        colDirection
                    );

                if (winner) {
                    return winner;
                }
            }
        }
    }

    const draw = 
        board.every(
            (row) =>
                row.every(
                    (cell) => cell !== ""
                )
        );

    if (draw) {
        return "draw";
    }

    return null;
}