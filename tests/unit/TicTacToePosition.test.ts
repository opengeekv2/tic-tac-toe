import { TicTacToePosition } from "../../src/domain/TicTacToe";

describe('TicTacToe should', () => {

    enum TestTicTacToePosition {
        UP_LEFT = 'UP_LEFT',
        UP_CENTRE = 'UP_CENTRE',
        UP_RIGHT = 'UP_RIGHT',
        CENTRE_LEFT = 'CENTRE_LEFT',
        CENTRE_CENTRE = 'CENTRE_CENTRE',
        CENTRE_RIGHT = 'CENTRE_RIGHT',
        DOWN_LEFT = 'DOWN_LEFT',
        DOWN_CENTRE = 'DOWN_CENTRE',
        DOWN_RIGHT = 'DOWN_RIGHT',
    }

    test('be equal to TestTicTacToePosition', () => {
        expect(TicTacToePosition).toStrictEqual(TestTicTacToePosition);
    });
});