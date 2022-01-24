import { TicTacToe, TicTacToePosition, TicTacToeState } from '../../src/domain/TicTacToe';


/*X always goes first
Players alternate placing X’s and O’s on the board
Players cannot play on a played position
A player with 3 X’s or 3 O’s in a row (vertically, horizontally or diagonally) wins the game.
If all 9 squares are filled and neither player achieves 3 in a row, the game is a draw.
Recommendation: try to implement the rules in order*/

describe('in a tic-tac-toe game', () => {
  
  test('x always goes first', () => {
    const ticTacToe: TicTacToe = new TicTacToe();

    expect(ticTacToe.getState()).toBe(TicTacToeState.X_PLAYS);
  });
  
  test('players alternate placing Xs and Os on the board', () => {
    const ticTacToe: TicTacToe = new TicTacToe();

    expect(ticTacToe.getState()).toBe(TicTacToeState.X_PLAYS);
    let nextState = ticTacToe.play(TicTacToePosition.UP_LEFT);
    expect(nextState).toBe(TicTacToeState.O_PLAYS);
    nextState = ticTacToe.play(TicTacToePosition.UP_RIGHT);
    expect(nextState).toBe(TicTacToeState.X_PLAYS);
  });

  test.each(Object.values(TicTacToePosition))('next player cannot play in a played position', (position: TicTacToePosition) => {
    const ticTacToe: TicTacToe = new TicTacToe();

    Object.values(TicTacToePosition).forEach(position => {
      ticTacToe.play(position);
    })

    const playInPlayedPosition = () => {
      let nextState = ticTacToe.play(position);
    };
    
    expect(playInPlayedPosition).toThrow(Error);
    expect(playInPlayedPosition).toThrow('This position is already played');
  });
});

describe('A player with 3 X’s or 3 O’s in a row (vertically, horizontally or diagonally) wins the game', () => {
  test('A player gets 3 X in the first vertical', () => {
    const ticTactToe: TicTacToe = new TicTacToe();
    ticTactToe.play(TicTacToePosition.UP_RIGHT);
    ticTactToe.play(TicTacToePosition.DOWN_RIGHT);
    ticTactToe.play(TicTacToePosition.UP_CENTRE);
    ticTactToe.play(TicTacToePosition.DOWN_CENTRE);
    const state = ticTactToe.play(TicTacToePosition.UP_LEFT);

    expect(state).toBe(TicTacToeState.X_WINS);
  });
});
