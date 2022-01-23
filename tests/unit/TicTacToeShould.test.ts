import OTurn from '../../src/domain/OTurn';
jest.mock('../../src/domain/OTurn');
import TicTacToeTurn from '../../src/domain/TicTacToeTurn';
import XTurn from '../../src/domain/XTurn';
jest.mock('../../src/domain/XTurn');
import { TicTacToe, TicTacToePosition, TicTacToeState } from '../../src/domain/TicTacToe';
import TicTacToeBoard from '../../src/domain/TicTacToeBoard';
jest.mock('../../src/domain/TicTacToeBoard');


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

    const nextState = ticTacToe.play(TicTacToePosition.UP_LEFT);

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

    const nextState = ticTacToe.play(TicTacToePosition.UP_LEFT);

    expect(nextState).toBe(TicTacToeState.X_PLAYS);

    expect(oTurn.switch).toBeCalledTimes(1);
  });

  test.each(Object.values(TicTacToePosition))('set moves on the board', (move: TicTacToePosition) => {
    const board: TicTacToeBoard = new TicTacToeBoard();

    board.play = jest.fn((position: TicTacToePosition) => {})

    class TestTicTacToe extends TicTacToe {
      protected board: TicTacToeBoard = board;
    }

    const ticTacToe = new TestTicTacToe();

    ticTacToe.play(move)

    expect(board.play).toBeCalledWith(move);
  });

  test.each(Object.values(TicTacToePosition))('throw board exceptions', (move: TicTacToePosition) => {
    const board: TicTacToeBoard = new TicTacToeBoard();

    board.play = jest.fn((position: TicTacToePosition) => {
      throw new Error('This position is already played');
    });

    class TestTicTacToe extends TicTacToe {
      protected board: TicTacToeBoard = board;
    }

    const ticTacToe = new TestTicTacToe();

    const callPlay = () => {
      ticTacToe.play(move)
    }
    
    expect(callPlay).toThrow(Error);
    expect(callPlay).toThrow('This position is already played');
  });

});
