export default class TictacToe {

    playerTurn = "X";

    play(position: object, player: string): boolean {
        if (player !== this.playerTurn ) {
            throw new Error('Error');
        }
        this.playerTurn = "O";
        return true;

    }
}