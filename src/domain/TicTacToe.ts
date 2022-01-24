import TicTacToeBoard from "./TicTacToeBoard";
import TicTacToeTurn from "./TicTacToeTurn";
import XTurn from "./XTurn";

export enum TicTacToeToken {
    X = 'X',
    O = 'O'
}

export enum TicTacToeState {
    X_PLAYS = 'X_PLAYS',
    O_PLAYS = 'O_PLAYS',
    X_WINS  = 'X_WINS'
}

export enum TicTacToePosition {
    UP_LEFT         = 'UP_LEFT',
    UP_CENTRE       = 'UP_CENTRE',
    UP_RIGHT        = 'UP_RIGHT',
    CENTRE_LEFT     = 'CENTRE_LEFT',
    CENTRE_CENTRE   = 'CENTRE_CENTRE',
    CENTRE_RIGHT    = 'CENTRE_RIGHT',
    DOWN_LEFT       = 'DOWN_LEFT',
    DOWN_CENTRE     = 'DOWN_CENTRE',
    DOWN_RIGHT      = 'DOWN_RIGHT',
}

export class TicTacToe {
    protected state: TicTacToeState = TicTacToeState.X_PLAYS;
    protected turn: TicTacToeTurn = new XTurn();
    protected board: TicTacToeBoard = new TicTacToeBoard();
    
    play(position: TicTacToePosition): TicTacToeState {
        const winner: TicTacToeState = this.board.play(position);
        if (Object.values(TicTacToeState).includes(winner)) return winner;
        this.turn = this.turn.switch();
        if (this.turn instanceof XTurn)  {
            return TicTacToeState.X_PLAYS;
        }
        return TicTacToeState.O_PLAYS;
    }

    getState() {
        return TicTacToeState.X_PLAYS;
    }
}