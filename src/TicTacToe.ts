export interface Position {
    x: number;
    y: number;
}

export interface Move {
    player: Player;
    position: Position;
}

export class Player {
    private name: string

    private constructor(name: string) {
        this.name = name;
    }

    static X() {
        return new Player('X')
    }

    static O() {
        return new Player('O')
    }

    equals(other: Player): boolean {
        return other.name === this.name;
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

export class GameOverError extends Error {
    constructor(message?: string) {
        super(`GameOverError: ${message}`);
    }
}

export default class TictacToe {

    playerTurn: Player = Player.X();
    moves: Array<Move> = [];

    private hasBeenPlayed(position: Position): boolean {
        return Boolean(this.moves.find( move  => {
            return (move.position.x === position.x && move.position.y === position.y);
        }));
    }

    private switchToNextPlayer(): void { if (this.playerTurn.equals(Player.O())) { this.playerTurn = Player.X();

            return;
        }

        this.playerTurn = Player.O();
    }

    play(position: Position, player: Player): boolean {
        if (!player.equals(this.playerTurn)) {
            throw new OutOfTurnError("A player can't play twice");
        }

        if (this.hasBeenPlayed(position)) {
            throw new SameMoveTwiceError("A player can't do the same move twice");
        }

        let hasPlayerXWon = Boolean(this.moves.filter(move => {
            return move.position.y === 0 && move.player.equals(Player.X());
        }).length === 3);

        if (hasPlayerXWon) {
            throw new GameOverError("Player X won");
        }

        hasPlayerXWon = Boolean(this.moves.filter(move => {
            return move.position.y === 1 && move.player.equals(Player.X());
        }).length === 3)

        if (hasPlayerXWon) {
            throw new GameOverError("Player X won");
        }

        this.moves.push({ position, player });

        this.switchToNextPlayer();

        return true;
    }

    getWinner(): Player {
        if (this.moves.length === 0)
            return null;

        return this.moves[this.moves.length-1].player;
    }
}
