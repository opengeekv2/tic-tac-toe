import { TicTacToePosition, TicTacToeToken } from "../../src/domain/TicTacToe";
import TicTacToeBoard from "../../src/domain/TicTacToeBoard";

describe('TicTacToe board should', () => {
    test.each(Object.values(TicTacToePosition))('throw an error when an already played position is immediately played', (position) => {
        const ticTacToeBoard: TicTacToeBoard = new TicTacToeBoard();
        ticTacToeBoard.play(position, TicTacToeToken.X);

        const playInPlayedPosition = () => {
            ticTacToeBoard.play(position, TicTacToeToken.O)
        }

        expect(playInPlayedPosition).toThrow(Error);
        expect(playInPlayedPosition).toThrow('This position is already played');
    });

    test.each(Object.values(TicTacToePosition))('throw an error when an already played position is played', (position) => {
        const ticTacToeBoard: TicTacToeBoard = new TicTacToeBoard();
        Object.values(TicTacToePosition).forEach((position: TicTacToePosition) => {
            ticTacToeBoard.play(position, TicTacToeToken.X);
        })

        const playInPlayedPosition = () => {
            ticTacToeBoard.play(position, TicTacToeToken.X)
        }

        expect(playInPlayedPosition).toThrow(Error);
        expect(playInPlayedPosition).toThrow('This position is already played');
    });

    test('return X_WINS when X set upper row', () => {
        
    });
});