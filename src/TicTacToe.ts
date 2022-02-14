
export enum TictacToeState {
  O_PLAYS,
  X_PLAYS,
  O_WINS,
  X_WINS,
  TIE
}
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

    private switchToNextPlayer(): void {
        if (this.playerTurn.equals(Player.O())) { this.playerTurn = Player.X();
            return;
        }

        this.playerTurn = Player.O();
    }

    private playerHasWon(player: Player): boolean {
        const BOARD_SIZE = 3;
        for (let i = 0; i < BOARD_SIZE; i++) {
            let won = Boolean(this.moves.filter(move => {
                return move.position.y === i && move.player.equals(player)
            }).length === BOARD_SIZE)
            if (won) {
                return true;
            }
            won = Boolean(this.moves.filter(move => {
                return move.position.x === i && move.player.equals(player)
            }).length === BOARD_SIZE)
            if (won) {
                return true;
            }
        }
        return false;
    }

    private xHasWon() {
        return this.playerHasWon(Player.X());
    }

    private oHasWon() {
        return this.playerHasWon(Player.O());
    }

    private throwExceptionWhenXHasWon(): void {
        if (this.xHasWon()) {
            throw new GameOverError("Player X won");
        }
    }

    play(position: Position, player: Player): TictacToeState {
        if (!player.equals(this.playerTurn)) {
            throw new OutOfTurnError("A player can't play twice");
        }

        if (this.hasBeenPlayed(position)) {
            throw new SameMoveTwiceError("A player can't do the same move twice");
        }

        this.throwExceptionWhenXHasWon()

        this.moves.push({ position, player });

        this.switchToNextPlayer();

        const winner = this.getWinner();
        if ( null !== winner) {
            return winner;
        } else {
            return Player.O().equals(this.playerTurn) ? TictacToeState.O_PLAYS : TictacToeState.X_PLAYS;
        }

    }

    // TODO: to deprecate
    private getWinner(): TictacToeState | null {
        if (true === this.xHasWon()) {
            return TictacToeState.X_WINS;
        }
        if (true === this.oHasWon()) {
            return TictacToeState.O_WINS;
        }
        return null;
    }
}
