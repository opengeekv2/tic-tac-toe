interface Position {
    x: number;
    y: number;
}

export class OutOfTurnError extends Error {
    constructor(message: string) {
        super(`OutOfTurnError: ${message}`);
    }
}

export class SameMoveTwiceError extends Error {
    constructor(message: string) {
        super(`SameMoveTwiceError: ${message}`);
    }
}

export default class TictacToe {

    playerTurn = "X";
    moves: Array<Position> = [];

    private hasBeenPlayed(position: Position): boolean {
        return Boolean(this.moves.find( pastMoves  => {
            return (pastMoves.x === position.x && pastMoves.y === position.y);
        }));
    }

    play(position: Position, player: string): boolean {
        if (player !== this.playerTurn ) {
            throw new OutOfTurnError("A player can't play twice");
        }

        if (this.hasBeenPlayed(position)) {
            throw new SameMoveTwiceError("A player can't do the same move twice");
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