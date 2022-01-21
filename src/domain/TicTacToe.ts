export enum TicTacToeState {
    X_PLAYS = 'X_PLAYS',
    O_PLAYS = 'O_PLAYS' 
}

export enum TicTacToePosition {
    UPPER_LEFT = '',
    UPPER_RIGHT = ''
}

export class TicTacToe {
    protected state: TicTacToeState = TicTacToeState.X_PLAYS;
    
    play(position: TicTacToePosition) {
        if (this.state === TicTacToeState.X_PLAYS)  {
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