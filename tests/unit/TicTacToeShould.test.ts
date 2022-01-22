jest.mock('../../src/domain/TicTacToe');
import { TicTacToeTurn, TicTacToeTurns, XTurn, OTurn } from '../../src/domain/TicTacToe';
const { TicTacToe, TicTacToePosition, TicTacToeState } = jest.requireActual('../../src/domain/TicTacToe');


/*X always goes first
Players alternate placing X’s and O’s on the board
Players cannot play on a played position
A player with 3 X’s or 3 O’s in a row (vertically, horizontally or diagonally) wins the game.
If all 9 squares are filled and neither player achieves 3 in a row, the game is a draw.
Recommendation: try to implement the rules in order*/

describe('TicTacToe should', () => {
  
  test('start with X being the current player', () => {
    const xTurn : XTurn = new XTurn();

    class TestTicTacToe extends TicTacToe {
      protected turn: TicTacToeTurn = xTurn; 
    }

    const ticTacToe: TestTicTacToe = new TestTicTacToe();

    expect(ticTacToe.getState()).toBe(TicTacToeState.X_PLAYS);
  });

  test('switch player to O when currentPlayer is X', () => {
    const xTurn : XTurn = new XTurn();

    xTurn.switch = jest.fn(() => {
      return new OTurn();
    });

    class TestTicTacToe extends TicTacToe {
      protected turn: TicTacToeTurn = xTurn; 
    }

    const ticTacToe: TestTicTacToe = new TestTicTacToe();

    const nextState = ticTacToe.play(TicTacToePosition.UPPER_LEFT);

    expect(nextState).toBe(TicTacToeState.O_PLAYS);

    expect(xTurn.switch).toBeCalledTimes(1);
  });

  test('switch player to X when currentPlayer is O', () => {
    const oTurn : OTurn = new OTurn();

    oTurn.switch = jest.fn(() => {
      return new XTurn();
    });
    
    class StartsWithOTicTacToe extends TicTacToe {
      protected turn: TicTacToeTurn = oTurn;
    }

    const ticTacToe = new StartsWithOTicTacToe();

    const nextState = ticTacToe.play(TicTacToePosition.UPPER_LEFT);

    expect(nextState).toBe(TicTacToeState.X_PLAYS);

    expect(oTurn.switch).toBeCalledTimes(1);
  });

});
