export default class TictacToe {
    play(position: object, player: string): boolean {
        if (player !== 'X') {
            throw new Error('Error');
        }
        return true;

    }
}