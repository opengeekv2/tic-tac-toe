export enum TicTacToeState {
    X_PLAYS = 'X_PLAYS',
    O_PLAYS = 'O_PLAYS' 
}

export enum TicTacToePosition {
    UPPER_LEFT = '',
    UPPER_RIGHT = ''
}

export interface TicTacToeTurn {
    switch(): TicTacToeTurn
}

export class TicTacToeTurnHandler {
    protected state: TicTacToeState = TicTacToeState.X_PLAYS;

    play(position: TicTacToePosition) {
        if (this.state == TicTacToeState.X_PLAYS)  {
            this.state = TicTacToeState.O_PLAYS;
            return this.state;
        }
        this.state = TicTacToeState.X_PLAYS;
        return this.state;
    }

    getState() {
        return this.state;
    }
}

export class XTurn {
    switch(): TicTacToeTurn {
        return new OTurn();
    }
}

export class OTurn {
    switch(): TicTacToeTurn {
        return new XTurn();
    }
}

export const TicTacToeTurns = {
    X_TURN: new XTurn(),
    O_TURN: new OTurn()
};

export class TicTacToe {
    protected state: TicTacToeState = TicTacToeState.X_PLAYS;
    protected turn: TicTacToeTurn = new XTurn();
    
    play(position: TicTacToePosition) {
        this.turn = this.turn.switch();
        console.log(this.turn);
        console.log(this.turn instanceof XTurn);
        if (this.turn instanceof XTurn)  {
            return TicTacToeState.X_PLAYS;
        }
        return TicTacToeState.O_PLAYS;
    }

    getState() {
        return TicTacToeState.X_PLAYS;
    }
}