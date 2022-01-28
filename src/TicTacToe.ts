interface Position {
    x: number;
    y: number;
}

export class PlayedTwiceError extends Error {
    constructor(message: string) {
        super(`PlayedTwiceError: ${message}`);
    }
}

export default class TictacToe {

    playerTurn = "X";
    moves: Array<Position> = [];

    play(position: Position, player: string): boolean {
        if (player !== this.playerTurn ) {
            throw new PlayedTwiceError("A player can't play twice");
        }
        const samePosition = this.moves.find( pastMoves  => {
            return (pastMoves.x === position.x && pastMoves.y === position.y);
        });

        if (samePosition) {
            throw new Error("A player can't do the same move twice");
        }
        this.moves.push(position);
        if (player == 'O') {
            this.playerTurn = 'X';
            return true
        }
        this.playerTurn = "O";
        return true;

    }
}