import { TicTacToePosition, TicTacToeState, TicTacToeToken } from "./TicTacToe";

export default class TicTacToeBoard {
    private playedPositions: TicTacToePosition[] = [];
    play(position: TicTacToePosition, token: TicTacToeToken = TicTacToeToken.X): TicTacToeState | undefined {
        if (this.playedPositions.includes(position)) {
            throw new Error('This position is already played');   
        }
        this.playedPositions.push(position);
        return null;
    }
}