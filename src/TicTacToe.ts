export default class TictacToe {

    playerTurn = "X";

    play(position: object, player: string): boolean {
        if (player !== this.playerTurn ) {
            throw new Error("A player can't play twice");
        }
        if (player == 'O') {
            this.playerTurn = 'X';
            return true
        }
        this.playerTurn = "O";
        return true;

    }
}