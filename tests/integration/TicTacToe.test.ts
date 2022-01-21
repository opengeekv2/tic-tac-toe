import { TicTacToe, TicTacToePosition, TicTacToeState } from '../../src/domain/TicTacToe';


/*X always goes first
Players alternate placing X’s and O’s on the board
Players cannot play on a played position
A player with 3 X’s or 3 O’s in a row (vertically, horizontally or diagonally) wins the game.
If all 9 squares are filled and neither player achieves 3 in a row, the game is a draw.
Recommendation: try to implement the rules in order*/

describe('in a tic-tac-toe game', () => {
  
  test('players alternate placing Xs and Os on the board', () => {
    const ticTacToe: TicTacToe = new TicTacToe();

    expect(ticTacToe.getState()).toBe(TicTacToeState.X_PLAYS);
    let nextState = ticTacToe.play(TicTacToePosition.UPPER_LEFT);
    expect(nextState).toBe(TicTacToeState.O_PLAYS);
    nextState = ticTacToe.play(TicTacToePosition.UPPER_RIGHT);
    expect(nextState).toBe(TicTacToeState.X_PLAYS);
  });

});
