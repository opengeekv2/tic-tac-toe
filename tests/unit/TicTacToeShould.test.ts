import { TicTacToe, TicTacToePosition, TicTacToeState } from '../../src/domain/TicTacToe';


/*X always goes first
Players alternate placing X’s and O’s on the board
Players cannot play on a played position
A player with 3 X’s or 3 O’s in a row (vertically, horizontally or diagonally) wins the game.
If all 9 squares are filled and neither player achieves 3 in a row, the game is a draw.
Recommendation: try to implement the rules in order*/

describe('TicTacToe should', () => {
  
  test('start with X being the current player', () => {
    const ticTacToe: TicTacToe = new TicTacToe();

    expect(ticTacToe.getState()).toBe(TicTacToeState.X_PLAYS);
  });

  test('switch player to O when currentPlayer is X', () => {
    const ticTacToe: TicTacToe = new TicTacToe();

    const nextState = ticTacToe.play(TicTacToePosition.UPPER_LEFT);

    expect(nextState).toBe(TicTacToeState.O_PLAYS);
  });

  test('switch player to X when currentPlayer is O', () => {
    class StartsWithOTicTacToe extends TicTacToe {
      protected state: TicTacToeState = TicTacToeState.O_PLAYS;
    }

    const ticTacToe: TicTacToe = new StartsWithOTicTacToe();

    const nextState = ticTacToe.play(TicTacToePosition.UPPER_LEFT);

    expect(nextState).toBe(TicTacToeState.X_PLAYS);
  });

});
