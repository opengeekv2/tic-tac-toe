
export enum TictacToeState {
  O_PLAYS,
  X_PLAYS,
  O_WINS,
  X_WINS,
  TIE
}
export abstract class Position {
    row: number;
    column: number;
}

function equalPosition(aPosition: Position, other: Position): boolean {
    return aPosition.row === other.row && aPosition.column === other.column;
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

export default class TicTacToe {
    playerTurn: Player = Player.X();
    moves: Array<Move> = [];

    private hasBeenPlayed(position: Position): boolean {
        return Boolean(this.moves.find( move  => {
            return (equalPosition(move.position, position));
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
                return move.position.column === i && move.player.equals(player)
            }).length === BOARD_SIZE)
            if (won) {
                return true;
            }
            won = Boolean(this.moves.filter(move => {
                return move.position.row === i && move.player.equals(player)
            }).length === BOARD_SIZE)
            if (won) {
                return true;
            }
        }
        const diagonalLeftToRight: Array<Position> = [{row: 0, column: 0}, {row: 1, column: 1}, {row: 2, column: 2}];
        let won = Boolean(diagonalLeftToRight.every(position => {
            return this.moves.some((move) => {
                return equalPosition(position, move.position) && move.player.equals(player);
            });
        }));

        if (won) {
            return true;
        }
        const diagonalRightToLeft: Position[] = [{row: 0, column: 2}, {row: 1, column: 1}, {row: 2, column: 0}];
        won = Boolean(diagonalRightToLeft.every(position => {
            return this.moves.some((move) => {
                return equalPosition(position, move.position) && move.player.equals(player);
            });
        }));

        return won;

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
