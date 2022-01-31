interface Position {
    x: number;
    y: number;
}


export const Player =  {
    'X': 'X',
    'O': 'O'
}

export class PlayerClass {
    private name: string
    
    private constructor(name: string) {
        this.name = name;
    }

    static X() {
        return new PlayerClass('X')
    }
}

export class OutOfTurnError extends Error {
    constructor(message?: string) {
        super(`OutOfTurnError: ${message}`);
    }
}

export class SameMoveTwiceError extends Error {
    constructor(message?: string) {
        super(`SameMoveTwiceError: ${message}`);
    }
}

export class UnknownPlayerError extends Error {
    constructor(message?: string) {
        super(`UnknownPlayerError: ${message}`);
    }
}

export default class TictacToe {

    playerTurn: string = Player.X;
    moves: Array<Position> = [];

    private hasBeenPlayed(position: Position): boolean {
        return Boolean(this.moves.find( pastMoves  => {
            return (pastMoves.x === position.x && pastMoves.y === position.y);
        }));
    }

    private switchToNextPlayer(): void {
        if (this.playerTurn == Player.O) {
            this.playerTurn = Player.X;

            return;
        }

        this.playerTurn = Player.O;
    }

    private isValidPlayer(player: string|PlayerClass): boolean {
        return player === Player.O || player === Player.X;
    }

    play(position: Position, player: string|PlayerClass): boolean {
        if (typeof player == 'string' && !this.isValidPlayer(player)) {
            throw new UnknownPlayerError()
        }

        if (typeof player == 'string' && player !== this.playerTurn) {
            throw new OutOfTurnError("A player can't play twice");
        }

        if (this.hasBeenPlayed(position)) {
            throw new SameMoveTwiceError("A player can't do the same move twice");
        }
        this.moves.push(position);

        this.switchToNextPlayer();

        return true;
    }
}
