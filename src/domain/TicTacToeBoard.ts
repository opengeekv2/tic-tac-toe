import { TicTacToePosition } from "./TicTacToe";

export default class TicTacToeBoard {
    private playedPositions: TicTacToePosition[] = [];
    play(position: TicTacToePosition) {
        if (this.playedPositions.includes(position)) {
            throw new Error('This position is already played');   
        }
        this.playedPositions.push(position);
    }
}