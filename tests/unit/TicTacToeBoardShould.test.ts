import { TicTacToePosition } from "../../src/domain/TicTacToe";
import TicTacToeBoard from "../../src/domain/TicTacToeBoard";

describe('TicTacToe board should', () => {
    test.each(Object.values(TicTacToePosition))('throw an error when an already played position is immediately played', (position) => {
        const ticTacToeBoard: TicTacToeBoard = new TicTacToeBoard();
        ticTacToeBoard.play(position);

        const playInPlayedPosition = () => {
            ticTacToeBoard.play(position)
        }

        expect(playInPlayedPosition).toThrow(Error);
        expect(playInPlayedPosition).toThrow('This position is already played');
    });

    test.each(Object.values(TicTacToePosition))('throw an error when an already played position is played', (position) => {
        const ticTacToeBoard: TicTacToeBoard = new TicTacToeBoard();
        Object.values(TicTacToePosition).forEach((position) => {
            ticTacToeBoard.play(position);
        })

        const playInPlayedPosition = () => {
            ticTacToeBoard.play(position)
        }

        expect(playInPlayedPosition).toThrow(Error);
        expect(playInPlayedPosition).toThrow('This position is already played');
    });
});